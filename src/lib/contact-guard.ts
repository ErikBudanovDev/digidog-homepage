import { isIP } from "node:net";

// One shared guard for every contact form; no external services or visitor tracking.
const limits: Record<string, number> = {
  name: 120, email: 254, phone: 80, company: 200,
  service: 120, budget: 120, message: 5000, source: 120, website: 2048, country: 120,
};

export function validateContact(body: unknown) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return { error: "Invalid request" };
  const input = body as Record<string, unknown>;
  if (input.contactFax !== undefined && (typeof input.contactFax !== "string" || input.contactFax.trim())) {
    return { error: "Could not send your enquiry. Please contact us by email." };
  }
  const data: Record<string, string> = {};
  for (const [field, max] of Object.entries(limits)) {
    const value = input[field];
    if (value === undefined && !["name", "email", "message"].includes(field)) continue;
    if (typeof value !== "string" || value.length > max || /[\u0000-\u0008\u000b\u000c\u000e-\u001f\u007f]/.test(value)) {
      return { error: `Please check the ${field} field` };
    }
    data[field] = value.trim();
  }
  if (!data.name || !data.email || !data.message) return { error: "Name, email, and message are required" };
  if (/[\r\n]/.test(data.name + data.email + (data.service || "")) || !/^[^\s@<>"'(),:;]+@[^\s@<>"'(),:;]+\.[^\s@<>"'(),:;]+$/.test(data.email)) {
    return { error: "Please enter a valid name and email address" };
  }
  // Reject only link-only messages; normal prose containing project/reference URLs is welcome.
  const withoutLinks = data.message.replace(/(?:https?:\/\/|www\.)[^\s<>]+/gi, "");
  if (!/[\p{L}\p{N}]/u.test(withoutLinks)) return { error: "Please add a short description of your project, not just a link." };
  return { data };
}

export function escapeContactHtml(value: string) {
  return value.replace(/[&<>"']/g, character => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]!);
}

// ponytail: per-process limiter; use an ingress/shared-store limit for multiple replicas.
// Bound memory and expire entries; keep IPs in memory only, never log/persist them.
const attempts = new Map<string, { count: number; expires: number }>();
export function contactRateLimit(key: string, now = Date.now()): number {
  for (const [ip, entry] of attempts) if (entry.expires <= now) attempts.delete(ip);
  let entry = attempts.get(key);
  if (!entry) {
    if (attempts.size >= 10000) return 60;
    entry = { count: 0, expires: now + 10 * 60 * 1000 };
    attempts.set(key, entry);
  }
  if (++entry.count > 5) return Math.ceil((entry.expires - now) / 1000);
  return 0;
}

// No socket/unknown fallback: proxy peers can represent unrelated visitors.
// Enable only after verifying this header is overwritten by the deployed ingress.
export function contactRateLimitKey(header: string | string[] | undefined, trustProxy: boolean): string | undefined {
  if (!trustProxy || typeof header !== "string") return;
  const ip = header.trim();
  if (!isIP(ip)) return;
  return ip.startsWith("::ffff:") && isIP(ip.slice(7)) === 4 ? ip.slice(7) : ip.toLowerCase();
}
