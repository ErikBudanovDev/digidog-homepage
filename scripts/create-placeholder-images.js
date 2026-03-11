#!/usr/bin/env node

/**
 * Creates placeholder images for Figma assets
 * Run: node scripts/create-placeholder-images.js
 */

const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '../public/figma-assets');

// Ensure directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

// List of all Figma asset hashes from the codebase
const assets = [
  '0199d49b0d1554a54651091d4af9e44dbe0459cd.png',
  '051286c7b524bfc7c657ed29eb4420ae0c99272c.png',
  '078b70a771f804e92b4698a48f21b197eb8533b2.png',
  '1ebd5f724dd0e36f61d36898a311a05f4a075dc1.png',
  '3bd5043c343cc118bf1353e2acfbb7852f23e18c.png',
  '3ddf1a828262e42cebdf9dd204d93f3c3c999f84.png',
  '4aa21ed2e847271510ccf7d90dc12d67d518010f.png',
  '5380ec0feaae16c02acb62ca3aa85f3a7e221d4e.png',
  '589d7ede857bb322804c09ab8d1168c3bfa85b4f.png',
  '58f2cbf574c1863d80d69d3d0c78e56a09d857bc.png', // DigiDog logo
  '59fe701eb8226508e3a213da6b6769564706529b.png',
  '60943bf61b864756cf066b33b037f361c78d9440.png',
  '662435b77afb9fc5df300b8a814a4e93a31c97ee.png',
  '712b2980920c120e34026f29e7dadf0371827e56.png',
  '71762655f43cebfa5f3e7b2c416bb82a40a595e3.png',
  '76288603c24adaec16e4fc5488214e59f71af005.png',
  '8355901d8310aa8386a87aa2f57c48af458d57b5.png',
  '860b1f96f437e65d2e83efa384e45c4ac65fc981.png',
  '9ce21b38a3baa786545cbb4554d30781457be416.png',
  'a08c81e899bda71db4ea7b1a2882824b0064bf80.png',
  'a1e43a0ca271ca27ec555aa2b403a94e7865b5b9.png',
  'a2f594d236ef884b789dbcc942e670e16a1f1fca.png',
  'a50f2cfda54fb48eb76d673506f31ea9764e156c.png',
  'aceaf579e31eebab925faabe40f3b9f4e46272d5.png',
  'b383767b5b7dc243e08ca2992180e6e4a1c117ae.png',
  'b400b8a31dbc12a663236ebdf525198dd6022f95.png',
  'bee0d66198ba8ce39053a625ec23a26b92575f01.png',
  'c117ba0d114ddd4b6f7e4c70e3701d65dc9258d9.png',
  'c28a01d5ca35b1e207da7537c250359543a3aa75.png',
  'd2107e94ba7d2a4f4a9f6cfdbc6e9b05fd5e8aaa.png',
  'd6bb65eaf8c1ef470fbf5ba285c0a0dc7dfd85a5.png',
  'd6e8abf341447412a4167b69730c8988829f7af0.png',
  'd849760fd1f5b6f771197fd106f62a4c614281cb.png',
  'e64fabfbb0ba316f86fd5b115ed2ccaa77c94550.png',
  'ebd194b188260fe197aaf1d96b5b4f12cd875dbf.png', // Dog logo
  'f3344c5d874bdaed8597c2a2a7697db100cfd76c.png',
  'f7a8d04658541304c4fc27c4c302b2ecbe7efaef.png',
];

// Create a simple SVG placeholder that will be saved as PNG
// This creates a gray rectangle with "Image Placeholder" text
const createPlaceholderSVG = (width = 800, height = 600) => `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#e5e7eb"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="24" fill="#9ca3af" text-anchor="middle" dominant-baseline="middle">
    Figma Asset Placeholder
  </text>
  <text x="50%" y="60%" font-family="Arial, sans-serif" font-size="14" fill="#6b7280" text-anchor="middle" dominant-baseline="middle">
    Replace with actual image from Figma
  </text>
</svg>
`.trim();

console.log(`Creating ${assets.length} placeholder images in ${publicDir}...\n`);

let created = 0;
for (const asset of assets) {
  const filePath = path.join(publicDir, asset);
  
  // Only create if doesn't exist
  if (!fs.existsSync(filePath)) {
    // For now, create an SVG file (browsers will render it)
    const svgPath = filePath.replace('.png', '.svg');
    fs.writeFileSync(svgPath, createPlaceholderSVG());
    
    // Also create a symlink from .png to .svg so both work
    try {
      if (fs.existsSync(filePath)) fs.unlinkSync(filePath);
      fs.symlinkSync(path.basename(svgPath), filePath);
    } catch (e) {
      // If symlink fails, just copy the SVG as PNG
      fs.writeFileSync(filePath, createPlaceholderSVG());
    }
    
    created++;
  }
}

console.log(`✓ Created ${created} placeholder images`);
console.log(`✓ Skipped ${assets.length - created} existing files`);
console.log('\nTo replace with real images:');
console.log('1. Export images from Figma');
console.log('2. Place them in: nextjs-app/public/figma-assets/');
console.log('3. Use the exact hash filenames listed above');
