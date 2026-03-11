#!/usr/bin/env node
/**
 * Downloads remaining unmatched Figma assets by searching the file JSON
 * for image references and trying to match them to asset hashes.
 *
 * Usage:
 *   FIGMA_TOKEN=your_token node scripts/download-remaining-assets.js
 */

const https = require('https');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const FILE_KEY = 'tObgUXop2ku5pHoDlglbIc';
const TOKEN = process.env.FIGMA_TOKEN;
const OUTPUT_DIR = path.resolve(__dirname, '../public/figma-assets');

// The 9 unmatched asset hashes
const UNMATCHED = {
  '58f2cbf574c1863d80d69d3d0c78e56a09d857bc.png': 'digiDogLogo',
  'd2107e94ba7d2a4f4a9f6cfdbc6e9b05fd5e8aaa.png': 'beOriginalToursImage',
  'f3344c5d874bdaed8597c2a2a7697db100cfd76c.png': 'cibariaItalianaImage',
  '4aa21ed2e847271510ccf7d90dc12d67d518010f.png': 'cibariaItalianaBolognaImage',
  '860b1f96f437e65d2e83efa384e45c4ac65fc981.png': 'cibariaItalianaServicesImage',
  '3bd5043c343cc118bf1353e2acfbb7852f23e18c.png': 'cibariaItalianaMarioImage',
  'a1e43a0ca271ca27ec555aa2b403a94e7865b5b9.png': 'monteOfelioBarImage',
  'd6e8abf341447412a4167b69730c8988829f7af0.png': 'monteOfelioNewsImage',
  'e64fabfbb0ba316f86fd5b115ed2ccaa77c94550.png': 'monteOfelioLocationImage',
};

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
        try { resolve(JSON.parse(data)); }
        catch (e) { reject(e); }
      });
      res.on('error', reject);
    }).on('error', reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : require('http');
    mod.get(url, (res) => {
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      if (res.statusCode !== 200) {
        reject(new Error(`HTTP ${res.statusCode}`));
        return;
      }
      const stream = fs.createWriteStream(destPath);
      res.pipe(stream);
      stream.on('finish', () => { stream.close(); resolve(); });
      stream.on('error', reject);
    }).on('error', reject);
  });
}

// Recursively find all node IDs with image fills in the Figma file
function findImageNodes(node, results = []) {
  // Check for image fills
  if (node.fills) {
    for (const fill of node.fills) {
      if (fill.type === 'IMAGE' && fill.imageRef) {
        results.push({ nodeId: node.id, name: node.name, imageRef: fill.imageRef });
      }
    }
  }
  // Check children
  if (node.children) {
    for (const child of node.children) findImageNodes(child, results);
  }
  return results;
}

async function main() {
  if (!TOKEN) {
    console.error('FIGMA_TOKEN required');
    process.exit(1);
  }

  const unmatchedHashes = new Set(Object.keys(UNMATCHED).map(k => k.replace(/\.\w+$/, '')));
  console.log(`Trying to download ${unmatchedHashes.size} remaining assets...\n`);

  // Approach 1: Get file structure and find image nodes, then export them
  console.log('Fetching file structure from Figma API...');
  let fileData;
  try {
    fileData = await figmaGet(`/files/${FILE_KEY}?geometry=paths`);
  } catch (e) {
    console.error(`Failed: ${e.message}`);
    process.exit(1);
  }

  // Find all image nodes
  const imageNodes = findImageNodes(fileData.document);
  console.log(`Found ${imageNodes.length} nodes with image fills.\n`);

  // Get image fill URLs (these are the imageRef -> URL mapping)
  // The imageRef might be the hash we're looking for
  const imageRefs = new Set(imageNodes.map(n => n.imageRef));
  console.log(`Unique image refs: ${imageRefs.size}`);
  console.log('Image refs:', [...imageRefs].join(', '));

  // Check if any imageRef matches our unmatched hashes
  for (const ref of imageRefs) {
    if (unmatchedHashes.has(ref)) {
      console.log(`\nDirect match found: ${ref}`);
    }
  }

  // Approach 2: Export all unique image-containing nodes and hash-match
  // Get all unique node IDs that have images
  const nodeIds = [...new Set(imageNodes.map(n => n.nodeId))];

  console.log(`\nExporting ${nodeIds.length} image nodes as PNG...`);

  // Figma API limits to 50 IDs per request
  let matched = 0;
  for (let i = 0; i < nodeIds.length; i += 50) {
    const batch = nodeIds.slice(i, i + 50);
    const idsParam = batch.join(',');

    let exportResult;
    try {
      exportResult = await figmaGet(`/images/${FILE_KEY}?ids=${encodeURIComponent(idsParam)}&format=png&scale=2`);
    } catch (e) {
      console.warn(`Export batch failed: ${e.message}`);
      continue;
    }

    const images = exportResult?.images || {};
    for (const [nodeId, url] of Object.entries(images)) {
      if (!url) continue;

      const tempFile = path.join(OUTPUT_DIR, `.temp_${nodeId.replace(':', '_')}.png`);
      try {
        await downloadFile(url, tempFile);
        const content = fs.readFileSync(tempFile);
        const sha1 = crypto.createHash('sha1').update(content).digest('hex');

        if (unmatchedHashes.has(sha1)) {
          const filename = sha1 + '.png';
          const varName = UNMATCHED[filename];
          fs.renameSync(tempFile, path.join(OUTPUT_DIR, filename));
          console.log(`✓ ${varName} -> ${filename}`);
          unmatchedHashes.delete(sha1);
          matched++;
        } else {
          fs.unlinkSync(tempFile);
        }
      } catch (e) {
        if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
      }
    }

    process.stdout.write(`  Processed batch ${Math.min(i + 50, nodeIds.length)}/${nodeIds.length}\r`);
  }

  console.log(`\n\nNewly matched: ${matched}`);
  if (unmatchedHashes.size > 0) {
    console.log(`Still unmatched (${unmatchedHashes.size}):`);
    for (const h of unmatchedHashes) {
      console.log(`  ✗ ${UNMATCHED[h + '.png']} -> ${h}.png`);
    }
  } else {
    console.log('All assets downloaded!');
  }
}

main().catch(console.error);
