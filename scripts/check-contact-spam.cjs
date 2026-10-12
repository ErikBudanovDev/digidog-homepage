// Run: node scripts/check-contact-spam.cjs. No SMTP or network traffic.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, globals = {}) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true }
  }).outputText, { exports, ...globals });
  return exports;
}
const guard = load('src/lib/contact-guard.ts', { require });
const attribution = load('src/lib/enquiry-attribution.ts');
let sent = 0, mail;
const env = {};
const api = load('src/pages/api/contact.ts', {
  process: { env }, console: { log() {}, error() {} },
  require: name => {
    if (name === '../../lib/contact-guard') return guard;
    if (name === '../../lib/enquiry-attribution') return attribution;
    if (name === 'node:crypto') return require(name);
    if (name === 'nodemailer') return { createTransport: () => ({ sendMail: async value => { sent++; mail = value; } }) };
    throw Error(name);
  }
});
const valid = { name: 'Էրիկ Müller', email: 'erik@example.invalid', message: 'Please redesign https://example.org', contactFax: '' };
(async () => {
  const cases = [
    [valid, 200], [{ ...valid, message: 'https://unknown.example/path' }, 400],
    [{ ...valid, message: 'www.unknown.example' }, 400],
    [{ ...valid, message: '(https://unknown.example) !' }, 400],
    [{ ...valid, contactFax: 'bot' }, 400], [{ ...valid, contactFax: [] }, 400],
    [null, 400], [[], 400], [{ ...valid, name: {} }, 400],
    [{ ...valid, email: 'invalid' }, 400], [{ ...valid, message: ' ' }, 400],
    [{ ...valid, name: 'Injected\r\nBcc: x@example.org' }, 400],
    [{ ...valid, message: 'x'.repeat(5001) }, 400], [{ ...valid, company: [] }, 400],
    [{ ...valid, message: 'こんにちは' }, 200],
    [{ ...valid, message: '<img src=x onerror=alert(1)> please help', company: '<b>Company</b>' }, 200],
  ];
  for (const [i, [body, expected]] of cases.entries()) {
    let status, response; const before = sent;
    await api.default({ method: 'POST', body, headers: { 'content-type': 'application/json' }, socket: { remoteAddress: `case-${i}` } }, {
      setHeader() {}, status(value) { status = value; return this; }, json(value) { response = value; }
    });
    assert.equal(status, expected, `case ${i}`);
    assert.equal(sent - before, expected === 200 ? 1 : 0, 'Rejected request never reaches SMTP');
    if (expected !== 200) assert(!response.enquiryId);
  }
  assert(mail.html.includes('&lt;img') && !mail.html.includes('<img src=x'));
  assert(mail.html.includes('&lt;b&gt;Company&lt;/b&gt;'));
  for (let i = 0; i < 5; i++) assert.equal(guard.contactRateLimit('limit', 1000), 0);
  assert.equal(guard.contactRateLimit('limit', 1000), 600);
  assert.equal(guard.contactRateLimit('limit', 601000), 0);
  assert.equal(guard.contactRateLimit('another', 1000), 0);
  for (let i = 0; i < 6; i++) {
    let status; const headers = {}, before = sent;
    await api.default({ method: 'POST', body: valid, headers: { 'content-type': 'application/json', 'x-forwarded-for': `spoof-${i}` }, socket: { remoteAddress: 'same-peer' } }, {
      setHeader(k,v) { headers[k] = v; }, status(v) { status = v; return this; }, json() {}
    });
    assert.equal(status, 200, 'Unverified proxy peers must not pool visitors');
  }
  for (const header of [undefined, ['192.0.2.1'], '192.0.2.1, 192.0.2.2', 'spoof', '']) assert.equal(guard.contactRateLimitKey(header, true), undefined);
  assert.equal(guard.contactRateLimitKey('192.0.2.1', false), undefined);
  assert.equal(guard.contactRateLimitKey('::ffff:192.0.2.1', true), '192.0.2.1');
  env.CONTACT_TRUST_PROXY = 'true';
  for (let i = 0; i < 6; i++) {
    let status; const headers = {}, before = sent;
    await api.default({ method: 'POST', body: valid, headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.20' }, socket: { remoteAddress: 'shared-proxy' } }, {
      setHeader(k,v) { headers[k] = v; }, status(v) { status = v; return this; }, json() {}
    });
    assert.equal(status, i < 5 ? 200 : 429);
    if (i === 5) { assert(headers['Retry-After']); assert.equal(sent, before); }
  }
  let distinctStatus;
  await api.default({ method: 'POST', body: valid, headers: { 'content-type': 'application/json', 'x-forwarded-for': '192.0.2.21' }, socket: { remoteAddress: 'shared-proxy' } }, { setHeader() {}, status(v) { distinctStatus = v; return this; }, json() {} });
  assert.equal(distinctStatus, 200, 'Verified clients behind one peer have separate quotas');
  env.CONTACT_TRUST_PROXY = 'false';
  const campaignSource = fs.readFileSync('src/components/campaign/WorkflowPilotPage.tsx', 'utf8');
  const handler = campaignSource.match(/const handleSubmit = async \(e: React.FormEvent<HTMLFormElement>\) => \{([\s\S]*?)\n  \};/)[1];
  let campaignCases = 0;
  for (const variant of ['a','b']) for (const message of ['https://example.invalid', 'Please review https://example.invalid', 'こんにちは']) {
    let payload, status; const before = sent;
    const run = vm.runInNewContext('(async e => {' + ts.transpileModule(handler, { compilerOptions: { target: ts.ScriptTarget.ES2020 } }).outputText + '})', {
      variant, sending: false, window: { location: { pathname: `/campaigns/workflow-pilot-${variant}`, search: '' } }, ...load('src/lib/enquiry-attribution.ts', { URLSearchParams }),
      FormData: class { get(k) { return ({ name: valid.name, email: valid.email, company: 'Example', website: 'https://company.invalid', country: 'Canada', message, contactFax: '' })[k]; } },
      setSending() {}, setError() {}, setSubmitted() {},
      submitContactForm: async body => { payload = body; let response; await api.default({ method: 'POST', body, headers: { 'content-type': 'application/json' }, socket: { remoteAddress: 'shared-proxy' } }, { setHeader() {}, status(v) { status = v; return this; }, json(v) { response = v; } }); return { success: status === 200, ...response }; }
    });
    await run({ preventDefault() {}, currentTarget: {} });
    assert.equal(payload.message, message, 'Actual form must not prefix authored message');
    assert.equal(payload.website, 'https://company.invalid'); assert.equal(payload.country, 'Canada');
    assert.equal(status, message.startsWith('https:') ? 400 : 200);
    assert.equal(sent - before, status === 200 ? 1 : 0);
    if (status === 200) assert(mail.html.includes('Company website: https://company.invalid') && mail.html.includes('Based in: Canada'));
    campaignCases++;
  }
  let status;
  await api.default({ method: 'POST', headers: { 'content-type': 'text/plain' } }, { status(v) { status = v; return this; }, json() {} });
  assert.equal(status, 415);
  console.log(`PASS: 16 payload cases, ${campaignCases} actual campaign payload regressions, HTML safety, trusted/untrusted/missing IP behavior, limiter expiry/isolation and content type; no live submissions.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
