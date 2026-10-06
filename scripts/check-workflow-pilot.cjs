const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, globals) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, ...globals });
  return exports;
}
(async () => {
  const source = fs.readFileSync('src/components/campaign/WorkflowPilotPage.tsx', 'utf8');
  const handler = source.match(/const handleSubmit = async \(e: React.FormEvent<HTMLFormElement>\) => \{([\s\S]*?)\n  \};/)[1];
  let count = 0;
  for (const variant of ['a', 'b']) for (const outcome of ['success', 'http-error', 'network-error']) {
    const events = [], layer = [];
    let resolveRequest, submitted = false, error = '', request;
    const pending = new Promise(resolve => { resolveRequest = resolve; });
    const analytics = load('src/lib/analytics.ts', { window: { gtag: (...args) => events.push(args), dataLayer: layer } });
    const contact = load('src/lib/contact.ts', { fetch: async (url, options) => {
      request = { url, body: JSON.parse(options.body) }; await pending;
      if (outcome === 'network-error') throw Error('offline');
      return { ok: outcome === 'success', json: async () => ({ error: 'Mock failure' }) };
    } });
    const fields = { name: 'PRIVATE_NAME', email: 'private@example.invalid', company: 'PRIVATE_COMPANY', website: 'https://private.invalid', country: 'Canada', message: 'PRIVATE_MESSAGE' };
    const run = vm.runInNewContext('(async e => {' + handler + '})', {
      ...analytics, ...contact, variant, formLocation: `workflow_pilot_${variant}`, sending: false,
      FormData: class { get(k) { return fields[k]; } }, setSending() {}, setError(v) { error = v; }, setSubmitted(v) { submitted = v; }
    });
    const execution = run({ preventDefault() {}, currentTarget: {} });
    assert.equal(events.length, 0); assert.equal(layer.length, 0);
    resolveRequest(); await execution;
    assert.equal(request.url, '/api/contact'); assert.equal(request.body.source, `Workflow pilot ${variant.toUpperCase()}`);
    assert.equal(request.body.email, fields.email); assert(request.body.message.includes(fields.message));
    assert.equal(submitted, outcome === 'success'); assert.equal(Boolean(error), outcome !== 'success');
    assert.deepEqual(events.map(e => e[1]), outcome === 'success' ? ['contact_form_submit', 'generate_lead'] : []);
    const serialized = JSON.stringify([events, layer]);
    for (const value of Object.values(fields)) assert(!serialized.includes(value), 'No enquiry data in analytics');
    if (submitted) assert.equal(events[1][2].form_location, `workflow_pilot_${variant}`);
    count++;
  }
  console.log(`PASS: ${count} campaign variant success/HTTP/network cases. Success-only events, no enquiry data in analytics, existing contact destination.`);
})().catch(e => { console.error(e); process.exitCode = 1; });
