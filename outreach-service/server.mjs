// DigiDog outreach service: send via local Postfix, click/open tracking, unsubscribe + stop list.
// Zero dependencies. Storage: append-only JSONL files in DATA_DIR.
import http from "node:http";
import net from "node:net";
import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";

const PORT = Number(process.env.PORT || 3795);
const DATA = process.env.DATA_DIR || "/data";
const TOKEN = process.env.OUTREACH_TOKEN || "";
const BASE = (process.env.BASE_URL || "https://digidog-services.com").replace(/\/$/, "");
const SMTP_HOST = process.env.SMTP_HOST || "172.17.0.1";
const SMTP_PORT = Number(process.env.SMTP_PORT || 25);
const FROM_NAME = process.env.FROM_NAME || "Erik Budanov";
const FROM_ADDR = process.env.FROM_ADDR || "erik@digidog-services.com";
const POSTAL = process.env.POSTAL || "DIGIDOG, LLC, 30 N Gould St, Ste N, Sheridan, WY 82801, USA";
const DAILY_CAP = Number(process.env.DAILY_CAP || 10);
const TEST_ALLOW = (process.env.TEST_ALLOW || "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
const HOME = process.env.HOME_URL || "https://digidog.org";

fs.mkdirSync(DATA, { recursive: true });
const file = (n) => path.join(DATA, n + ".jsonl");
const load = (n) => (fs.existsSync(file(n)) ? fs.readFileSync(file(n), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
const append = (n, o) => fs.appendFileSync(file(n), JSON.stringify(o) + "\n");

const messages = load("messages"); // {id, lead_id, to, subject, step, country, test, ts, unsub, links:{tok:url}}
const events = load("events"); // {ts, type, id, to, lead_id, url?, ua?, auto?}
const suppress = load("suppress"); // {email, reason, ts}
const state = load("state"); // {mode, ts}
let mode = state.length ? state[state.length - 1].mode : process.env.MODE || "test";

const byId = new Map(messages.map((m) => [m.id, m]));
const byUnsub = new Map(messages.map((m) => [m.unsub, m]));
const byLink = new Map();
for (const m of messages) for (const [t, u] of Object.entries(m.links || {})) byLink.set(t, { m, url: u });

const tok = (n = 9) => crypto.randomBytes(n).toString("base64url");
const now = () => new Date().toISOString();
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const isSuppressed = (email) => {
  const e = email.toLowerCase();
  const d = e.split("@")[1];
  return suppress.some((s) => s.email === e || s.email === "@" + d);
};
function logEvent(type, m, extra = {}) {
  const ev = { ts: now(), type, id: m.id, to: m.to, lead_id: m.lead_id || null, ...extra };
  events.push(ev);
  append("events", ev);
  return ev;
}
function addSuppress(email, reason) {
  const e = email.toLowerCase().trim();
  if (suppress.some((s) => s.email === e)) return false;
  const row = { email: e, reason, ts: now() };
  suppress.push(row);
  append("suppress", row);
  return true;
}

// ---------- SMTP (plain, to local Postfix) ----------
function smtpSend({ from, to, data }) {
  return new Promise((resolve, reject) => {
    const sock = net.createConnection(SMTP_PORT, SMTP_HOST);
    sock.setTimeout(20000, () => { sock.destroy(); reject(new Error("smtp timeout")); });
    const steps = [`EHLO ${new URL(BASE).hostname}`, `MAIL FROM:<${from}>`, `RCPT TO:<${to}>`, "DATA", data.replace(/\r?\n/g, "\r\n").replace(/^\./gm, "..") + "\r\n.", "QUIT"];
    let i = -1, buf = "";
    sock.on("data", (chunk) => {
      buf += chunk.toString();
      if (!buf.endsWith("\n")) return;
      const lines = buf.trim().split(/\r?\n/);
      const lastLine = lines[lines.length - 1];
      if (!/^\d{3} /.test(lastLine)) return; // multi-line reply not finished
      const code = Number(lastLine.slice(0, 3));
      const reply = buf.trim(); buf = "";
      if (code >= 400) { sock.destroy(); return reject(new Error("smtp " + reply.slice(0, 200))); }
      i++;
      if (i >= steps.length) { sock.end(); return resolve(reply); }
      sock.write(steps[i] + "\r\n");
    });
    sock.on("error", reject);
    sock.on("close", () => (i >= steps.length - 1 ? resolve("closed") : reject(new Error("smtp closed early at step " + i))));
  });
}
const b64 = (s) => Buffer.from(s, "utf8").toString("base64").replace(/(.{76})/g, "$1\n");
const encWord = (s) => (/^[\x20-\x7e]*$/.test(s) ? s : "=?UTF-8?B?" + Buffer.from(s, "utf8").toString("base64") + "?=");

function buildEmail(m, text, trackOpen) {
  // body text: paragraphs separated by blank lines; links as [label](url) or bare https://...
  const links = {};
  const wrap = (url) => { const t = tok(6); links[t] = url; return `${BASE}/r/${t}`; };
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>)]+)/g;
  const unsubUrl = `${BASE}/u/${m.unsub}`;
  const cache = new Map();
  const tracked = (url) => { if (!cache.has(url)) cache.set(url, wrap(url)); return cache.get(url); };
  const textOut = text.replace(linkRe, (_, label, url, bare) => (label ? `${label}: ${tracked(url)}` : tracked(bare)));
  const htmlBody = text.split(/\n{2,}/).map((p) => {
    let out = "", last = 0;
    p.replace(linkRe, (match, label, url, bare, idx) => {
      out += esc(p.slice(last, idx)) + `<a href="${esc(tracked(url || bare))}">${esc(label || (bare || "").replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a>`;
      last = idx + match.length; return match;
    });
    out += esc(p.slice(last));
    return `<p style="margin:0 0 14px">${out.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  const footerText = `\n\n--\n${POSTAL}\nIf you'd rather not hear from me, unsubscribe here: ${unsubUrl}`;
  const footerHtml = `<p style="margin:22px 0 0;font-size:12px;color:#8a8f98">${esc(POSTAL)}<br>If you'd rather not hear from me, <a href="${unsubUrl}" style="color:#8a8f98">unsubscribe here</a>.</p>`;
  const pixel = trackOpen ? `<img src="${BASE}/o/${m.id}.gif" width="1" height="1" alt="" style="display:none">` : "";
  const html = `<!doctype html><html><body style="font-family:Arial,Helvetica,sans-serif;font-size:15px;line-height:1.5;color:#1d2330">${htmlBody}${footerHtml}${pixel}</body></html>`;
  const boundary = "b_" + tok(12);
  const headers = [
    `From: ${encWord(FROM_NAME)} <${FROM_ADDR}>`,
    `To: ${m.name ? encWord(m.name) + " " : ""}<${m.to}>`,
    `Reply-To: ${FROM_ADDR}`,
    `Subject: ${encWord(m.subject)}`,
    `Date: ${new Date().toUTCString().replace("GMT", "+0000")}`,
    `Message-ID: <${m.id}.${Date.now()}@${FROM_ADDR.split("@")[1]}>`,
    `List-Unsubscribe: <${unsubUrl}>, <mailto:${FROM_ADDR}?subject=unsubscribe>`,
    "List-Unsubscribe-Post: List-Unsubscribe=One-Click",
    "MIME-Version: 1.0",
    `Content-Type: multipart/alternative; boundary="${boundary}"`,
  ];
  const data = headers.join("\n") + "\n\n" +
    `--${boundary}\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: base64\n\n${b64(textOut + footerText)}\n` +
    `--${boundary}\nContent-Type: text/html; charset=UTF-8\nContent-Transfer-Encoding: base64\n\n${b64(html)}\n--${boundary}--\n`;
  return { data, links };
}

// ---------- HTTP ----------
const json = (res, code, obj) => { res.writeHead(code, { "content-type": "application/json", "cache-control": "no-store" }); res.end(JSON.stringify(obj)); };
const page = (res, code, title, body) => {
  res.writeHead(code, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" });
  res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${esc(title)}</title><style>body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;background:#f5f7fb;color:#1d2330}main{max-width:460px;margin:12vh auto;padding:28px 24px;background:#fff;border-radius:14px;box-shadow:0 6px 24px rgba(20,30,60,.08)}h1{font-size:22px;margin:0 0 10px}p{line-height:1.55;margin:0 0 14px;color:#4a5263}button{font:inherit;font-weight:600;padding:12px 18px;border:0;border-radius:10px;background:#0057ff;color:#fff;cursor:pointer;width:100%}a{color:#0057ff}small{color:#8a8f98}@media(max-width:520px){main{margin:6vh 16px}}</style></head><body><main>${body}</main></body></html>`);
};
const readBody = (req) => new Promise((resolve) => { let b = ""; req.on("data", (c) => { b += c; if (b.length > 200000) req.destroy(); }); req.on("end", () => resolve(b)); });
const authed = (req) => TOKEN && req.headers.authorization === "Bearer " + TOKEN;
const GIF = Buffer.from("R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", "base64");
const sentToday = () => { const d = now().slice(0, 10); return messages.filter((m) => !m.test && m.ts.slice(0, 10) === d).length; };
const isAuto = (m, ua = "") => Date.now() - Date.parse(m.ts) < 45000 || /bot|scan|proofpoint|barracuda|mimecast|preview|headless|python|curl|go-http/i.test(ua);

const server = http.createServer(async (req, res) => {
  try {
    const url = new URL(req.url, BASE);
    const p = url.pathname;
    const ua = String(req.headers["user-agent"] || "").slice(0, 160);

    if (p === "/healthz") return json(res, 200, { ok: true });
    if (p === "/" || p === "") { res.writeHead(302, { location: HOME }); return res.end(); }

    // click
    let mm = p.match(/^\/r\/([\w-]+)$/);
    if (mm) {
      const hit = byLink.get(mm[1]);
      if (!hit) { res.writeHead(302, { location: HOME }); return res.end(); }
      if (req.method === "GET") logEvent("click", hit.m, { url: hit.url, ua, auto: isAuto(hit.m, ua) || undefined });
      res.writeHead(302, { location: hit.url, "cache-control": "no-store" }); return res.end();
    }
    // open pixel
    mm = p.match(/^\/o\/([\w-]+)\.gif$/);
    if (mm) {
      const m = byId.get(mm[1]);
      if (m) logEvent("open", m, { ua, auto: isAuto(m, ua) || undefined });
      res.writeHead(200, { "content-type": "image/gif", "cache-control": "no-store, max-age=0", "content-length": GIF.length }); return res.end(GIF);
    }
    // unsubscribe
    mm = p.match(/^\/u\/([\w-]+)$/);
    if (mm) {
      const m = byUnsub.get(mm[1]);
      if (!m) return page(res, 404, "Link not found", `<h1>Link not found</h1><p>This link is not valid any more. To stop emails, reply "no" to the message and you will be removed.</p>`);
      if (req.method === "POST") {
        if (addSuppress(m.to, "unsubscribe")) logEvent("unsub", m, { ua });
        return page(res, 200, "Unsubscribed", `<h1>You're unsubscribed</h1><p><b>${esc(m.to)}</b> will not get any more emails from DigiDog.</p><p><small>${esc(POSTAL)}</small></p>`);
      }
      return page(res, 200, "Unsubscribe", `<h1>Unsubscribe</h1><p>Stop all emails from DigiDog to <b>${esc(m.to)}</b>?</p><form method="post"><button type="submit">Yes, unsubscribe me</button></form><p style="margin-top:14px"><small>${esc(POSTAL)}</small></p>`);
    }

    // ---- API (Bearer) ----
    if (p.startsWith("/api/")) {
      if (!authed(req)) return json(res, 401, { error: "unauthorized" });
      if (p === "/api/status") return json(res, 200, { mode, daily_cap: DAILY_CAP, sent_today: sentToday(), messages: messages.length, suppressed: suppress.length, test_allow: TEST_ALLOW.length });
      if (p === "/api/events") { const since = url.searchParams.get("since") || ""; return json(res, 200, { events: events.filter((e) => e.ts > since).slice(-2000) }); }
      if (p === "/api/messages") { const since = url.searchParams.get("since") || ""; return json(res, 200, { messages: messages.filter((m) => m.ts > since).map(({ links, unsub, ...m }) => m).slice(-2000) }); }
      if (p === "/api/suppressions" && req.method === "GET") return json(res, 200, { suppress });
      const body = req.method === "POST" ? JSON.parse((await readBody(req)) || "{}") : {};
      if (p === "/api/suppress" && req.method === "POST") {
        if (!/^@?[^@\s]*@?[^@\s]+\.[^@\s]+$/.test(body.email || "")) return json(res, 400, { error: "email required" });
        return json(res, 200, { added: addSuppress(body.email, body.reason || "manual") });
      }
      if (p === "/api/mode" && req.method === "POST") {
        if (!["test", "live"].includes(body.mode)) return json(res, 400, { error: "mode must be test or live" });
        mode = body.mode; append("state", { mode, ts: now() }); return json(res, 200, { mode });
      }
      if (p === "/api/send" && req.method === "POST") {
        const to = String(body.to || "").toLowerCase().trim();
        const subject = String(body.subject || "").replace(/[\r\n]+/g, " ").trim();
        const text = String(body.text || "").trim();
        if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(to) || !subject || !text) return json(res, 400, { error: "to, subject and text are required" });
        const test = TEST_ALLOW.includes(to);
        if (mode === "test" && !test) return json(res, 403, { error: "test mode: only test addresses can receive mail" });
        if (isSuppressed(to)) return json(res, 409, { error: "address is on the stop list" });
        const step = Number(body.step || 0);
        if (!test && messages.some((m) => m.to === to && m.step === step)) return json(res, 409, { error: "this step was already sent to this address" });
        if (!test && sentToday() >= DAILY_CAP) return json(res, 429, { error: `daily cap of ${DAILY_CAP} reached` });
        const m = { id: tok(9), lead_id: body.lead_id || null, to, name: body.name || "", subject: (test && mode === "test" ? "[TEST] " : "") + subject, step, country: body.country || "", test, ts: now(), unsub: tok(12), links: {} };
        const { data, links } = buildEmail(m, text, body.track_open !== false);
        m.links = links;
        await smtpSend({ from: FROM_ADDR, to, data });
        messages.push(m); append("messages", m);
        byId.set(m.id, m); byUnsub.set(m.unsub, m);
        for (const [t, u] of Object.entries(links)) byLink.set(t, { m, url: u });
        logEvent("sent", m, { step, test: test || undefined });
        return json(res, 200, { id: m.id, to, test, links: Object.keys(links).length, sent_today: sentToday() });
      }
      return json(res, 404, { error: "not found" });
    }
    res.writeHead(302, { location: HOME }); res.end();
  } catch (e) {
    json(res, 500, { error: String(e.message || e).slice(0, 300) });
  }
});
server.listen(PORT, () => console.log(`outreach service on :${PORT}, mode=${mode}, cap=${DAILY_CAP}`));
