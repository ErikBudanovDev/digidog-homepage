# Contact spam protection

All three form components (main EN/DE contact page, bottom contact section,
and both workflow pilot variants) submit through `/api/contact`.

The API accepts JSON up to 16 KiB, validates types/lengths/required fields and
email/header safety, rejects link-only messages, checks the hidden `contactFax`
honeypot, and escapes all visitor-controlled HTML before constructing email.
Names are not scored and ordinary descriptions containing links remain allowed.
No new dependencies, CAPTCHA, third-party requests, cookies, or PII logs.

Five POST attempts per peer IP per ten minutes are permitted; additional attempts
return 429 with Retry-After. Validation failures consume attempts. Set
CONTACT_TRUST_PROXY=true only if the deployment ingress overwrites
X-Forwarded-For with a trustworthy client IP (leftmost entry). With no proxy,
keep false. Verify this before rollout: behind a proxy, the default can group
visitors by proxy IP. Do not enable it on a publicly reachable untrusted backend.

The limiter is process-local and resets on restart. For multiple workers/replicas
or serverless hosting, enforce the same limit at ingress or in a shared store.
Honeypots catch simple autofill bots, not adaptive bots that deliberately leave
this field empty. If spam with real prose persists, add server-verified Turnstile
or an equivalent managed challenge; it requires deployment credentials and a
privacy review. This change does not claim to prove a visitor is human.

Run after npm ci:

    node scripts/check-contact-spam.cjs
    node scripts/check-contact-privacy.cjs
    node scripts/check-contact-analytics.cjs
    npx tsc --noEmit
    npm run build

Tests use synthetic requests and mocked SMTP; they send no actual enquiries.
Deploy the API and forms together. Test one legitimate enquiry after rollout,
a link-only rejection and the 429 response using synthetic data.
