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
const POSTAL = process.env.POSTAL || ""; // optional postal address line in the footer
const SIG_TITLE = process.env.SIG_TITLE || "Founder, DigiDog";
const SIG_SITE = process.env.SIG_SITE || "https://digidog.org";
const DAILY_CAP = Number(process.env.DAILY_CAP || 10);
const TEST_ALLOW = (process.env.TEST_ALLOW || "").toLowerCase().split(",").map((s) => s.trim()).filter(Boolean);
const HOME = process.env.HOME_URL || "https://digidog.org";
const VIEW_KEY = process.env.VIEW_KEY || "";

fs.mkdirSync(DATA, { recursive: true });
const file = (n) => path.join(DATA, n + ".jsonl");
const load = (n) => (fs.existsSync(file(n)) ? fs.readFileSync(file(n), "utf8").split("\n").filter(Boolean).map((l) => JSON.parse(l)) : []);
const append = (n, o) => fs.appendFileSync(file(n), JSON.stringify(o) + "\n");

const messages = load("messages"); // {id, lead_id, to, subject, step, country, test, ts, unsub, links:{tok:url}}
const events = load("events"); // {ts, type, id, to, lead_id, url?, ua?, auto?}
const suppress = load("suppress"); // {email, reason, ts}
const state = load("state"); // {mode, ts}
// leads: upsert log, last row per id wins
const leads = new Map();
for (const l of load("leads")) leads.set(l.id, { ...(leads.get(l.id) || {}), ...l });
const LEAD_FIELDS = ["niche", "company", "country", "person", "role", "channel", "contact", "website", "finding", "case", "status", "next_step", "draft_subject", "draft_text", "notes"];
function upsertLead(input) {
  const contact = String(input.contact || "").trim().toLowerCase();
  let cur = input.id ? leads.get(input.id) : contact ? [...leads.values()].find((l) => l.contact === contact) : null;
  const isNew = !cur;
  if (isNew) cur = { id: "L" + crypto.randomBytes(5).toString("hex"), created: new Date().toISOString(), status: "new" };
  const patch = { id: cur.id, updated: new Date().toISOString() };
  for (const f of LEAD_FIELDS) if (input[f] !== undefined) patch[f] = f === "contact" ? contact : String(input[f]).slice(0, 4000);
  if (isNew) { patch.created = cur.created; if (!patch.status) patch.status = "new"; }
  const next = { ...cur, ...patch };
  leads.set(next.id, next); append("leads", isNew ? next : patch);
  return { lead: next, created: isNew };
}
const setLead = (id, patch) => { if (id && leads.has(id)) upsertLead({ id, ...patch }); };

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
  // A trailing sign-off line ("Erik", "Best, Erik") is dropped: the signature block replaces it.
  const paras = text.split(/\n{2,}/).map((p) => p.trim()).filter(Boolean);
  if (paras.length > 1 && /^((best|regards|best regards|kind regards|thanks|cheers|viele grüße|beste grüße|mit freundlichen grüßen)[,!]?\s*)?erik( budanov)?\.?$/i.test(paras[paras.length - 1].replace(/\n/g, " "))) paras.pop();
  const links = {};
  const wrap = (url) => { const t = tok(6); links[t] = url; return `${BASE}/r/${t}`; };
  const linkRe = /\[([^\]]+)\]\((https?:\/\/[^\s)]+)\)|(https?:\/\/[^\s<>)]+)/g;
  const unsubUrl = `${BASE}/u/${m.unsub}`;
  const cache = new Map();
  const tracked = (url) => { if (!cache.has(url)) cache.set(url, wrap(url)); return cache.get(url); };
  const siteLabel = SIG_SITE.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const textOut = paras.join("\n\n").replace(linkRe, (_, label, url, bare) => (label ? `${label}: ${tracked(url)}` : tracked(bare))) +
    `\n\n${FROM_NAME}\n${SIG_TITLE}\n${SIG_SITE}`;
  const P = 'margin:0 0 16px;font-size:16px;line-height:1.6;color:#1d2330';
  const htmlBody = paras.map((p) => {
    let out = "", last = 0;
    p.replace(linkRe, (match, label, url, bare, idx) => {
      out += esc(p.slice(last, idx)) + `<a href="${esc(tracked(url || bare))}" style="color:#0057ff;text-decoration:underline">${esc(label || (bare || "").replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a>`;
      last = idx + match.length; return match;
    });
    out += esc(p.slice(last));
    return `<p style="${P}">${out.replace(/\n/g, "<br>")}</p>`;
  }).join("\n");
  const sigHtml = `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="margin:26px 0 0"><tr>
<td style="width:3px;background:#0057ff;border-radius:2px;font-size:0;line-height:0">&nbsp;</td>
<td style="padding:2px 0 2px 14px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
<div style="font-size:16px;line-height:1.35;font-weight:600;color:#1d2330">${esc(FROM_NAME)}</div>
<div style="font-size:14px;line-height:1.45;color:#5b6474">${esc(SIG_TITLE)}</div>
<div style="font-size:14px;line-height:1.45"><a href="${esc(SIG_SITE)}" style="color:#0057ff;text-decoration:none">${esc(siteLabel)}</a></div>
</td></tr></table>`;
  const footerText = `\n\n--\n${POSTAL ? POSTAL + "\n" : ""}If you'd rather not hear from me, unsubscribe here: ${unsubUrl}`;
  const footerHtml = `<p style="margin:28px 0 0;padding-top:14px;border-top:1px solid #e8ebf0;font-size:12px;line-height:1.5;color:#9aa1ad">${POSTAL ? esc(POSTAL) + "<br>" : ""}Not relevant? <a href="${unsubUrl}" style="color:#9aa1ad;text-decoration:underline">Unsubscribe</a> and I won't write again.</p>`;
  const pixel = trackOpen ? `<img src="${BASE}/o/${m.id}.gif" width="1" height="1" alt="" style="display:none">` : "";
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light"></head>
<body style="margin:0;padding:0;background:#ffffff">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="padding:8px 4px">
<div style="max-width:560px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif">
${htmlBody}
${sigHtml}
${footerHtml}
</div></td></tr></table>${pixel}</body></html>`;
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
        if (addSuppress(m.to, "unsubscribe")) { logEvent("unsub", m, { ua }); setLead(m.lead_id, { status: "stop", next_step: "" }); }
        return page(res, 200, "Unsubscribed", `<h1>You're unsubscribed</h1><p><b>${esc(m.to)}</b> will not get any more emails from DigiDog.</p>${POSTAL ? `<p><small>${esc(POSTAL)}</small></p>` : ""}`);
      }
      return page(res, 200, "Unsubscribe", `<h1>Unsubscribe</h1><p>Stop all emails from DigiDog to <b>${esc(m.to)}</b>?</p><form method="post"><button type="submit">Yes, unsubscribe me</button></form>${POSTAL ? `<p style="margin-top:14px"><small>${esc(POSTAL)}</small></p>` : ""}`);
    }


    // board (read-only view, secret key in path)
    mm = p.match(/^\/board\/([\w-]+)(\/leads\.csv)?$/);
    if (mm) {
      if (!VIEW_KEY || mm[1] !== VIEW_KEY) { res.writeHead(404); return res.end("not found"); }
      const stats = new Map();
      for (const e of events) { if (e.auto || !e.lead_id) continue; const s0 = stats.get(e.lead_id) || { open: 0, click: 0 }; if (e.type === "open") s0.open++; if (e.type === "click") s0.click++; stats.set(e.lead_id, s0); }
      const rows = [...leads.values()].sort((a, b) => (a.created < b.created ? 1 : -1));
      if (mm[2]) {
        const cols = ["created", "niche", "company", "country", "person", "role", "channel", "contact", "finding", "case", "status", "next_step", "notes"];
        const csv = [cols.join(","), ...rows.map((l) => cols.map((c) => '"' + String(l[c] || "").replace(/"/g, '""') + '"').join(","))].join("\n");
        res.writeHead(200, { "content-type": "text/csv; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex" }); return res.end(csv);
      }
      const wk = (ts) => { const d = new Date(ts); const day = (d.getUTCDay() + 6) % 7; d.setUTCDate(d.getUTCDate() - day); return d.toISOString().slice(0, 10); };
      const weeks = new Map(); const W = (k) => { if (!weeks.has(k)) weeks.set(k, { leads: 0, li_sent: 0, emails: 0, opens: new Set(), clicks: new Set(), unsub: 0, replied: 0, calls: 0 }); return weeks.get(k); };
      for (const l of rows) { const w = W(wk(l.created)); w.leads++; if (l.channel === "linkedin" && !["new", "draft"].includes(l.status)) w.li_sent++; if (["replied", "call"].includes(l.status)) w.replied++; if (l.status === "call") w.calls++; }
      for (const e of events) { if (e.test) continue; const m0 = byId.get(e.id); if (m0 && m0.test) continue; const w = W(wk(e.ts)); if (e.type === "sent") w.emails++; if (e.type === "open" && !e.auto) w.opens.add(e.id); if (e.type === "click" && !e.auto) w.clicks.add(e.id); if (e.type === "unsub") w.unsub++; }
      const badge = (st) => `<span class="b b-${esc(st || "new")}">${esc(st || "new")}</span>`;
      const leadHtml = rows.map((l) => { const s0 = stats.get(l.id) || { open: 0, click: 0 }; const c = String(l.contact || ""); const link = c.startsWith("http") ? `<a href="${esc(c)}" rel="noreferrer" target="_blank">profile</a>` : esc(c);
        return `<article data-s="${esc(l.status || "new")}" data-c="${esc(l.channel || "")}"><header><b>${esc(l.company || "—")}</b>${badge(l.status)}</header><p class="who">${esc(l.person || "")}${l.role ? " · " + esc(l.role) : ""} · ${esc(l.country || "")} · ${esc(l.channel || "")} · ${link}</p><p>${esc(l.finding || "")}</p>${l.draft_text ? `<details><summary>Message${l.draft_subject ? ": " + esc(l.draft_subject) : ""}</summary><pre>${esc(l.draft_text)}</pre></details>` : ""}<p class="meta">${esc(l.niche || "")} · ${esc((l.created || "").slice(0, 10))}${l.next_step ? " · next: " + esc(l.next_step) : ""}${s0.open || s0.click ? ` · opens ${s0.open} · clicks ${s0.click}` : ""}${l.notes ? " · " + esc(l.notes) : ""}</p></article>`; }).join("");
      const weekHtml = [...weeks.entries()].sort((a, b) => (a[0] < b[0] ? 1 : -1)).map(([k, w]) => `<tr><td>${k}</td><td>${w.leads}</td><td>${w.li_sent}</td><td>${w.emails}</td><td>${w.opens.size}</td><td>${w.clicks.size}</td><td>${w.replied}</td><td>${w.calls}</td><td>${w.unsub}</td></tr>`).join("");
      const statuses = ["new", "draft", "sent", "accepted", "replied", "call", "no", "stop"];
      res.writeHead(200, { "content-type": "text/html; charset=utf-8", "cache-control": "no-store", "x-robots-tag": "noindex, nofollow", "referrer-policy": "no-referrer" });
      return res.end(`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>DigiDog Outreach</title><style>
body{margin:0;font-family:system-ui,-apple-system,Segoe UI,Arial,sans-serif;background:#f5f7fb;color:#1d2330}main{max-width:980px;margin:0 auto;padding:20px 16px 60px}h1{font-size:22px;margin:6px 0 4px}h2{font-size:17px;margin:26px 0 10px}.sub{color:#6b7280;font-size:14px;margin:0 0 14px}
.f{display:flex;flex-wrap:wrap;gap:6px;margin:10px 0 14px}.f button{font:inherit;font-size:13px;padding:6px 11px;border-radius:999px;border:1px solid #d8dde6;background:#fff;cursor:pointer}.f button.on{background:#0057ff;border-color:#0057ff;color:#fff}
article{background:#fff;border-radius:12px;padding:14px 16px;margin:0 0 10px;box-shadow:0 1px 3px rgba(20,30,60,.06)}article header{display:flex;justify-content:space-between;gap:10px;align-items:center}article p{margin:6px 0 0;font-size:14.5px;line-height:1.5}.who,.meta{color:#6b7280;font-size:13px!important;overflow-wrap:anywhere}pre{white-space:pre-wrap;font:inherit;font-size:14px;background:#f5f7fb;border-radius:8px;padding:10px;margin:8px 0 0}summary{cursor:pointer;font-size:14px;color:#0057ff;margin-top:6px}
.b{font-size:12px;padding:3px 9px;border-radius:999px;background:#e5e7eb;white-space:nowrap}.b-sent{background:#dbeafe}.b-accepted{background:#e0e7ff}.b-replied,.b-call{background:#d1fae5}.b-no,.b-stop{background:#fee2e2}.b-draft{background:#fef3c7}
.tw{overflow-x:auto;background:#fff;border-radius:12px}table{border-collapse:collapse;width:100%;font-size:14px;min-width:620px}th,td{padding:9px 10px;text-align:right;border-bottom:1px solid #eef0f4;white-space:nowrap}th:first-child,td:first-child{text-align:left}th{font-size:12px;color:#6b7280;font-weight:600}
</style></head><body><main><h1>DigiDog Outreach</h1><p class="sub">Mode: <b>${esc(mode)}</b> · emails today ${sentToday()}/${DAILY_CAP} · leads ${rows.length} · stop list ${suppress.length} · <a href="/board/${VIEW_KEY}/leads.csv">CSV</a></p>
<h2>By week</h2><div class="tw"><table><thead><tr><th>Week of</th><th>Leads</th><th>LinkedIn sent</th><th>Emails</th><th>Opened</th><th>Clicked</th><th>Replied</th><th>Calls</th><th>Unsub</th></tr></thead><tbody>${weekHtml || '<tr><td colspan="9" style="text-align:left">No data yet</td></tr>'}</tbody></table></div>
<h2>Leads</h2><div class="f" id="f"><button class="on" data-v="">all</button>${statuses.map((x) => `<button data-v="${x}">${x}</button>`).join("")}</div><div id="l">${leadHtml || "<p>No leads yet.</p>"}</div>
<h2>Stop list</h2><div class="tw"><table style="min-width:0"><tbody>${suppress.map((x) => `<tr><td>${esc(x.email)}</td><td>${esc(x.reason)}</td><td>${esc(x.ts.slice(0, 10))}</td></tr>`).join("") || '<tr><td style="text-align:left">Empty</td></tr>'}</tbody></table></div>
<script>document.getElementById("f").addEventListener("click",function(e){var b=e.target.closest("button");if(!b)return;this.querySelectorAll("button").forEach(function(x){x.classList.toggle("on",x===b)});var v=b.dataset.v;document.querySelectorAll("#l article").forEach(function(a){a.style.display=!v||a.dataset.s===v?"":"none"})});</script></main></body></html>`);
    }
    // ---- API (Bearer) ----
    if (p.startsWith("/api/")) {
      if (!authed(req)) return json(res, 401, { error: "unauthorized" });
      if (p === "/api/status") return json(res, 200, { mode, daily_cap: DAILY_CAP, sent_today: sentToday(), messages: messages.length, suppressed: suppress.length, test_allow: TEST_ALLOW.length });
      if (p === "/api/events") { const since = url.searchParams.get("since") || ""; return json(res, 200, { events: events.filter((e) => e.ts > since).slice(-2000) }); }
      if (p === "/api/messages") { const since = url.searchParams.get("since") || ""; return json(res, 200, { messages: messages.filter((m) => m.ts > since).map(({ links, unsub, ...m }) => m).slice(-2000) }); }
      if (p === "/api/suppressions" && req.method === "GET") return json(res, 200, { suppress });
      const body = req.method === "POST" ? JSON.parse((await readBody(req)) || "{}") : {};
      if (p === "/api/leads" && req.method === "GET") {
        const q = url.searchParams; let out = [...leads.values()];
        for (const k of ["status", "channel", "niche", "country"]) if (q.get(k)) out = out.filter((l) => l[k] === q.get(k));
        return json(res, 200, { leads: out.sort((a, b) => (a.created < b.created ? 1 : -1)).slice(0, Number(q.get("limit") || 500)) });
      }
      if (p === "/api/leads" && req.method === "POST") {
        const rows = Array.isArray(body) ? body : Array.isArray(body.leads) ? body.leads : [body];
        const out = rows.slice(0, 200).map((r) => { if (r.contact && isSuppressed(String(r.contact).includes("@") ? String(r.contact) : "x@x.invalid")) return { skipped: "stop list", contact: r.contact }; const { lead, created } = upsertLead(r); return { id: lead.id, created, status: lead.status }; });
        return json(res, 200, { results: out });
      }
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
        if (!test) setLead(m.lead_id, { status: "sent", next_step: "" });
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
