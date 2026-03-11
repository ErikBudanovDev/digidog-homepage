#!/usr/bin/env node
/**
 * Downloads Figma assets for the project.
 *
 * Usage:
 *   FIGMA_TOKEN=your_personal_access_token node scripts/download-figma-assets.js
 *
 * To get a Personal Access Token:
 *   1. Go to https://www.figma.com/settings
 *   2. Scroll to "Personal access tokens"
 *   3. Click "Generate new token"
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_KEY = 'tObgUXop2ku5pHoDlglbIc';
const TOKEN = process.env.FIGMA_TOKEN;
const OUTPUT_DIR = path.resolve(__dirname, '../public/figma-assets');

if (!TOKEN) {
  console.error('Error: FIGMA_TOKEN environment variable is required.');
  console.error('Usage: FIGMA_TOKEN=your_token node scripts/download-figma-assets.js');
  console.error('\nGet a token at: https://www.figma.com/settings (Personal access tokens)');
  process.exit(1);
}

// Collect all asset hashes from the source code
function findAssetHashes() {
  const srcDir = path.resolve(__dirname, '../../src');
  const assets = new Map(); // hash -> variable name (for logging)

  function scan(dir) {
    for (const f of fs.readdirSync(dir)) {
      const full = path.join(dir, f);
      if (fs.statSync(full).isDirectory()) { scan(full); continue; }
      if (!f.endsWith('.tsx') && !f.endsWith('.ts')) continue;
      const content = fs.readFileSync(full, 'utf-8');
      // Match: import varName from "figma:asset/hash.ext"
      for (const m of content.matchAll(/import\s+(\w+)\s+from\s+["']figma:asset\/([a-f0-9]+\.\w+)["']/g)) {
        assets.set(m[2], m[1]);
      }
    }
  }
  scan(srcDir);
  return assets;
}

// Fetch JSON from Figma API
function figmaGet(endpoint) {
  return new Promise((resolve, reject) => {
    const url = `https://api.figma.com/v1${endpoint}`;
    https.get(url, { headers: { 'X-Figma-Token': TOKEN } }, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode !== 200) {
          reject(new Error(`Figma API ${res.statusCode}: ${data.slice(0, 200)}`));
          return;
        }
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(new Error(`Failed to parse response: ${e.message}`)); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

// Download a file from URL
function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`Download failed: HTTP ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

async function main() {
  console.log('Scanning source code for figma:asset imports...');
  const assets = findAssetHashes();
  console.log(`Found ${assets.size} unique assets.\n`);

  if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });

  // Step 1: Get file images from Figma API (image fills)
  console.log('Fetching image fills from Figma API...');
  let fileImages;
  try {
    fileImages = await figmaGet(`/files/${FILE_KEY}/images`);
  } catch (e) {
    console.error(`Failed to fetch file images: ${e.message}`);
    console.error('Make sure your FIGMA_TOKEN is valid and you have access to this file.');
    process.exit(1);
  }

  const imageRefs = fileImages?.meta?.images || {};
  console.log(`Found ${Object.keys(imageRefs).length} image fills in Figma file.\n`);

  // Step 2: Download all image fills and compute SHA1 to match with asset hashes
  const tempDir = path.join(OUTPUT_DIR, '.temp');
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true });

  const hashMap = new Map(); // SHA1 hash -> download URL

  console.log('Downloading and hashing image fills...');
  let idx = 0;
  for (const [ref, url] of Object.entries(imageRefs)) {
    idx++;
    const tempFile = path.join(tempDir, `img_${idx}.png`);
    try {
      await downloadFile(url, tempFile);
      const content = fs.readFileSync(tempFile);
      const sha1 = crypto.createHash('sha1').update(content).digest('hex');
      hashMap.set(sha1, { url, tempFile, ref });
      process.stdout.write(`  Downloaded ${idx}/${Object.keys(imageRefs).length} (SHA1: ${sha1.slice(0, 12)}...)\r`);
    } catch (e) {
      console.warn(`  Warning: Failed to download image ${ref}: ${e.message}`);
    }
  }
  console.log('\n');

  // Step 3: Match asset hashes to downloaded images
  let matched = 0;
  let unmatched = 0;
  for (const [hashFile, varName] of assets.entries()) {
    const hashOnly = hashFile.replace(/\.\w+$/, '');
    const entry = hashMap.get(hashOnly);
    const destFile = path.join(OUTPUT_DIR, hashFile);

    if (entry) {
      fs.copyFileSync(entry.tempFile, destFile);
      console.log(`✓ ${varName} -> ${hashFile}`);
      matched++;
    } else {
      console.log(`✗ ${varName} -> ${hashFile} (no match found)`);
      unmatched++;
    }
  }

  // Cleanup temp directory
  for (const f of fs.readdirSync(tempDir)) fs.unlinkSync(path.join(tempDir, f));
  fs.rmdirSync(tempDir);

  console.log(`\nDone! Matched: ${matched}, Unmatched: ${unmatched}`);
  if (unmatched > 0) {
    console.log('\nUnmatched assets may be vector exports or component screenshots.');
    console.log('You may need to export these manually from Figma.');
  }
}

main().catch(console.error);
