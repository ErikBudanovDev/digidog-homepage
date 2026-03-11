#!/usr/bin/env node
/**
 * Try to match remaining assets by checking if the Figma image refs
 * directly match the asset hashes, or by trying different hash algorithms.
 */
const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_KEY = 'tObgUXop2ku5pHoDlglbIc';
const TOKEN = process.env.FIGMA_TOKEN;
const OUTPUT_DIR = path.resolve(__dirname, '../public/figma-assets');

const UNMATCHED = [
  '58f2cbf574c1863d80d69d3d0c78e56a09d857bc',
  'd2107e94ba7d2a4f4a9f6cfdbc6e9b05fd5e8aaa',
  'f3344c5d874bdaed8597c2a2a7697db100cfd76c',
  '4aa21ed2e847271510ccf7d90dc12d67d518010f',
  '860b1f96f437e65d2e83efa384e45c4ac65fc981',
  '3bd5043c343cc118bf1353e2acfbb7852f23e18c',
  'a1e43a0ca271ca27ec555aa2b403a94e7865b5b9',
  'd6e8abf341447412a4167b69730c8988829f7af0',
  'e64fabfbb0ba316f86fd5b115ed2ccaa77c94550',
];

function figmaGet(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1${endpoint}`;
    https.get(url, { headers: { 'X-Figma-Token': TOKEN } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Figma API ${res.statusCode}: ${data.slice(0, 300)}`));
          return;
        }
        try { resolve(JSON.parse(data)); } catch (e) { reject(e); }
      });
    }).on('error', reject);
  });
}

function downloadBuffer(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadBuffer(res.headers.location).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) { reject(new Error(`HTTP ${res.statusCode}`)); return; }
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  if (!TOKEN) { console.error('FIGMA_TOKEN required'); process.exit(1); }

  const unmatchedSet = new Set(UNMATCHED);

  // Step 1: Get all image fills
  console.log('Fetching image fills from Figma API...');
  const resp = await figmaGet(`/files/${FILE_KEY}/images`);
  const imageRefs = resp?.meta?.images || {};

  console.log(`Image refs from API: ${Object.keys(imageRefs).length}`);

  // Step 2: Check if any image ref keys directly match unmatched hashes
  console.log('\nChecking direct ref matches...');
  for (const [ref, url] of Object.entries(imageRefs)) {
    if (unmatchedSet.has(ref)) {
      console.log(`  Direct match: ${ref}`);
      const buf = await downloadBuffer(url);
      fs.writeFileSync(path.join(OUTPUT_DIR, `${ref}.png`), buf);
      unmatchedSet.delete(ref);
    }
  }

  // Step 3: Download ALL remaining and try multiple hash algorithms
  if (unmatchedSet.size > 0) {
    console.log(`\nTrying multiple hash algorithms for ${Object.keys(imageRefs).length} images...`);
    let idx = 0;
    for (const [ref, url] of Object.entries(imageRefs)) {
      idx++;
      try {
        const buf = await downloadBuffer(url);
        // Try various hash algorithms
        const sha1 = crypto.createHash('sha1').update(buf).digest('hex');
        const md5 = crypto.createHash('md5').update(buf).digest('hex');
        const sha256 = crypto.createHash('sha256').update(buf).digest('hex').slice(0, 40);

        for (const hash of [sha1, md5, sha256, ref]) {
          if (unmatchedSet.has(hash)) {
            console.log(`  ✓ Matched ${hash} via ${hash === sha1 ? 'sha1' : hash === md5 ? 'md5' : hash === ref ? 'ref' : 'sha256'}`);
            fs.writeFileSync(path.join(OUTPUT_DIR, `${hash}.png`), buf);
            unmatchedSet.delete(hash);
          }
        }
        process.stdout.write(`  Checked ${idx}/${Object.keys(imageRefs).length}, remaining: ${unmatchedSet.size}   \r`);
        if (unmatchedSet.size === 0) break;
      } catch (e) { /* skip */ }
    }
  }

  console.log(`\n\nRemaining unmatched: ${unmatchedSet.size}`);
  if (unmatchedSet.size > 0) {
    // Print the ref keys for debugging
    console.log('\nAll image refs from API (for debugging):');
    for (const ref of Object.keys(imageRefs)) {
      console.log(`  ${ref}`);
    }
    console.log('\nStill unmatched hashes:');
    for (const h of unmatchedSet) console.log(`  ${h}`);
  }
}

main().catch(console.error);
