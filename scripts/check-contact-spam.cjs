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
const guard = load('src/lib/contact-guard.ts');
const attribution = load('src/lib/enquiry-attribution.ts');
let sent = 0, mail;
const api = load('src/pages/api/contact.ts', {
  process: { env: {} }, console: { log() {}, error() {} },
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
    assert.equal(status, i < 5 ? 200 : 429);
    if (i === 5) { assert(headers['Retry-After']); assert.equal(sent, before); }
  }
  let status;
  await api.default({ method: 'POST', headers: { 'content-type': 'text/plain' } }, { status(v) { status = v; return this; }, json() {} });
  assert.equal(status, 415);
  console.log('PASS: 16 payload cases, safe HTML, expiry/isolation, API rate limiting, spoofed forwarding headers and content type; no live submissions.');
})().catch(error => { console.error(error); process.exitCode = 1; });
