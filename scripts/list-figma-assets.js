#!/usr/bin/env node

/**
 * Lists all figma:asset imports found in the codebase
 * Run: node scripts/list-figma-assets.js
 */

const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '../../src');
const assets = new Set();

function scanDirectory(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      scanDirectory(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const matches = content.matchAll(/figma:asset\/([a-f0-9]+\.\w+)/g);
      
      for (const match of matches) {
        assets.add(match[1]);
      }
    }
  }
}

console.log('Scanning for figma:asset imports...\n');
scanDirectory(srcDir);

console.log(`Found ${assets.size} unique Figma assets:\n`);
Array.from(assets).sort().forEach(asset => {
  console.log(`  - ${asset}`);
});

console.log('\nTo download these assets, you need to:');
console.log('1. Open your Figma file');
console.log('2. Export these assets manually, or');
console.log('3. Use the Figma API to download them programmatically');
console.log('\nPlace downloaded assets in: nextjs-app/public/figma-assets/');
