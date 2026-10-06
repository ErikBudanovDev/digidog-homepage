// Run: node scripts/check-contact-analytics.cjs. No network requests or submissions.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, globals) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 }
  }).outputText, { exports, ...globals });
  return exports;
}
(async () => {
  let checks = 0;
  for (const [file, location, ads] of [
    ['src/components/ContactFormSection.tsx', 'bottom_contact_form', false],
    ['src/components/pages/ContactPage.tsx', 'contact_page', true]
  ]) {
    const source = fs.readFileSync(file, 'utf8');
    const handler = source.match(/const handleSubmit = async \(e: React.FormEvent\) => \{([\s\S]*?)\n  \};/)[1];
    for (const outcome of ['success', 'http-error', 'network-error']) {
      const events = [], layer = [];
      let resolveRequest, submitted = false, error = '', request;
      const pending = new Promise(resolve => { resolveRequest = resolve; });
      const analytics = load('src/lib/analytics.ts', { window: {
        gtag: (...args) => events.push(args), dataLayer: layer
      } });
      const contact = load('src/lib/contact.ts', { fetch: async (url, options) => {
        request = { url, body: JSON.parse(options.body) };
        await pending;
        if (outcome === 'network-error') throw new Error('mock offline');
        return { ok: outcome === 'success', json: async () => ({ error: 'mock failure' }) };
      } });
      const run = vm.runInNewContext('(async (e) => {' + handler + '\n})', {
        ...analytics, ...contact,
        formData: { name: 'SYNTHETIC_NAME', email: 'synthetic@example.invalid', message: 'Test only', service: 'software' },
        setSending: () => {}, setError: value => { error = value; },
        setSubmitted: value => { submitted = value; }, pt: { contactForm: { error: 'Error' } }
      });
      const execution = run({ preventDefault() {} });
      assert.equal(events.length, 0, 'No lead before response');
      assert.equal(layer.length, 0, 'No dataLayer lead before response');
      resolveRequest(); await execution;
      assert.equal(request.url, '/api/contact');
      assert.equal(request.body.email, 'synthetic@example.invalid', 'Preserve enquiry payload');
      const expected = outcome === 'success' ? ['contact_form_submit', 'generate_lead', ...(ads ? ['conversion_event_contact_1'] : [])] : [];
      assert.deepEqual(events.map(e => e[1]), expected);
      assert.deepEqual(layer.map(e => e.event), outcome === 'success' ? ['contact_form_submit', 'generate_lead'] : []);
      for (const [, , params] of events) {
        assert(!('contact_name' in params || 'contact_email' in params || 'value' in params || 'currency' in params));
      }
      const serialized = JSON.stringify([events, layer]);
      assert(!serialized.includes('SYNTHETIC_NAME') && !serialized.includes('synthetic@example.invalid'));
      assert.equal(submitted, outcome === 'success');
      assert.equal(Boolean(error), outcome !== 'success');
      if (outcome === 'success') assert.equal(events[1][2].form_location, location);
      checks++;
    }
  }
  console.log(`PASS: ${checks} form success/HTTP failure/network failure cases; no pre-response leads, analytics PII or fake value; enquiry payload preserved.`);
})().catch(error => { console.error(error); process.exitCode = 1; });
