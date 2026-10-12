const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const ts = require('typescript');
function load(file, globals) {
  const exports = {};
  vm.runInNewContext(ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText, { exports, ...globals });
  return exports;
}
const attribution = load('src/lib/enquiry-attribution.ts', { URLSearchParams });
const clean = value => JSON.parse(JSON.stringify(value));
assert.deepEqual(clean(attribution.readEnquiryAttribution('/campaigns/workflow-pilot-b', '?utm_source=linkedin&utm_medium=social&utm_campaign=workflow_pilot')), { variant: 'b', source: 'linkedin', medium: 'social', campaign: 'workflow_pilot' });
assert.deepEqual(clean(attribution.readEnquiryAttribution('/campaigns/workflow-pilot-a', '?utm_source=private%40example.invalid&utm_medium=PRIVATE_NAME&utm_campaign=PRIVATE_COMPANY&email=PRIVATE_EMAIL')), { variant: 'a' });
assert.equal(attribution.readEnquiryAttribution('/contact', '?utm_source=linkedin'), undefined);
for (const bad of [null, [], 'a', { variant: 'PRIVATE_NAME' }]) assert.equal(attribution.sanitizeEnquiryAttribution(bad), undefined);
console.log('PASS: fixed attribution labels, personal/unknown values dropped, invalid variants and noncampaign paths rejected. No network or storage.');
