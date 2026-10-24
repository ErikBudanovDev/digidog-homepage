# Contact spam protection

All three form components (main EN/DE contact page, bottom contact section,
and both workflow pilot variants) submit through `/api/contact`.

The API accepts JSON up to 16 KiB, validates types/lengths/required fields and
email/header safety, rejects link-only messages, checks the hidden `contactFax`
honeypot, and escapes all visitor-controlled HTML before constructing email.
Names are not scored and ordinary descriptions containing links remain allowed.
No new dependencies, CAPTCHA, third-party requests, cookies, or PII logs.

The visitor-authored `message` is validated before any composition. Campaign
`website` and `country` are separate bounded fields, escaped and appended only
inside the server's operational email. They cannot satisfy the prose check.
The two campaign variants and the shared API must deploy together; an old cached
client may still send its historical composed format. Do not treat this simple
prose heuristic as protection against adaptive bots that provide plausible text.

When CONTACT_TRUST_PROXY=true, five attempts per validated, single X-Forwarded-For
IP per ten minutes are permitted on each process; extra attempts return 429 with
Retry-After. Validation failures consume attempts. Enable only after verifying
that the production ingress overwrites the header with an end-user address and
that an upstream proxy does not collapse different visitors to one address.
Missing, invalid, array or multi-address headers are not trusted. With the flag
false or identity unavailable, this best-effort limiter is skipped. There is NO
socket-peer or shared "unknown" fallback. Unknown identity must never pool
unrelated users. Untrusted clients must not be able to choose their limiter key.

This is per-instance, best-effort throttling, NOT a global rate limit. Entries
expire after ten minutes; process restarts and serverless replicas have separate
counters. No IP is logged or persisted. No shared-store or ingress rule is added.

Read-only October 12 verification: current production is deployed through Vercel
(PR #6 merge 088e487); official request-header documentation says Vercel overwrites
X-Forwarded-For and does not forward external IPs when behind a proxy. The project
domain-settings URL redirected to login, so actual upstream topology and the
production CONTACT_TRUST_PROXY value remain unverified. Do not enable trust or
roll out this PR as verified IP protection until the existing project session can
confirm direct ingress or the owner chooses a separately reviewed alternative.
Source: https://vercel.com/docs/headers/request-headers

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
Deploy the API and forms together only after the ingress gate is resolved. All
current tests are synthetic with mocked SMTP; do not send live enquiries for QA.
