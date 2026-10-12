const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
const attributionExports = {};
vm.runInNewContext(ts.transpileModule(fs.readFileSync('src/lib/enquiry-attribution.ts', 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports: attributionExports, URLSearchParams });
const compiled = ts.transpileModule(fs.readFileSync('src/pages/api/contact.ts', 'utf8'), {
  compilerOptions: { module: ts.ModuleKind.CommonJS, esModuleInterop: true }
}).outputText;
(async () => {
  for (const outcome of ['success', 'smtp-error', 'missing-fields', 'wrong-method']) {
    const logs = [], exports = {};
    let mail, status, response;
    vm.runInNewContext(compiled, {
      exports, process: { env: { EMAIL_HOST: 'PRIVATE_HOST', EMAIL_USER: 'PRIVATE_USER', EMAIL_PASS: 'PRIVATE_PASS', EMAIL_RECEIVER: 'PRIVATE_RECEIVER' } },
      console: { log: (...args) => logs.push(args), error: (...args) => logs.push(args) },
      require: name => {
        if (name === 'node:crypto') return { randomUUID: () => '00000000-0000-4000-8000-000000000001' };
        if (name === '../../lib/enquiry-attribution') return attributionExports;
        assert.equal(name, 'nodemailer');
        return { createTransport: () => ({ sendMail: async payload => {
          mail = payload;
          if (outcome === 'smtp-error') throw Error('PRIVATE_EMAIL PRIVATE_MESSAGE PRIVATE_PASS');
        } }) };
      }
    });
    const body = { name: 'PRIVATE_NAME', email: 'PRIVATE_EMAIL', phone: 'PRIVATE_PHONE', company: 'PRIVATE_COMPANY', service: 'PRIVATE_SERVICE', source: 'PRIVATE_SOURCE', message: 'PRIVATE_MESSAGE' };
    body.attribution = { variant: 'a', source: 'PRIVATE_EMAIL', medium: 'email', campaign: 'workflow_pilot', extra: 'PRIVATE_MESSAGE' };
    if (outcome === 'missing-fields') delete body.email;
    await exports.default({ method: outcome === 'wrong-method' ? 'GET' : 'POST', body }, {
      status(code) { status = code; return this; }, json(value) { response = value; }
    });
    assert.equal(status, { success: 200, 'smtp-error': 500, 'missing-fields': 400, 'wrong-method': 405 }[outcome]);
    assert(!JSON.stringify(logs).includes('PRIVATE_'), 'No contact/config/raw-error details in application logs');
    if (outcome === 'success') {
      assert.equal(response.success, true);
      assert.equal(response.enquiryId, "00000000-0000-4000-8000-000000000001");
      assert(mail.html.includes("Variant: a; source: unknown; medium: email; campaign: workflow_pilot"));
      assert.equal(mail.replyTo, body.email);
      assert(mail.html.includes(body.message));
      assert(mail.html.includes(body.source));
    }
    if (outcome !== 'success') assert.equal(response.enquiryId, undefined);
    if (outcome === 'missing-fields' || outcome === 'wrong-method') assert.equal(mail, undefined);
  }
  console.log('PASS: 4 synthetic API cases; contact/config/raw SMTP error data absent from logs; operational email preserved. No network calls.');
})().catch(error => { console.error(error); process.exitCode = 1; });
