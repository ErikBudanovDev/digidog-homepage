#!/usr/bin/env node
/**
 * Creates valid PNG placeholder images for Figma assets
 */
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const publicDir = path.resolve(__dirname, '../public/figma-assets');

// CRC32 lookup table
const crcTable = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const typeBuf = Buffer.from(type, 'ascii');
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([len, typeBuf, data, crcBuf]);
}

function createPNG(w, h, r, g, b) {
  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(w, 0);
  ihdrData.writeUInt32BE(h, 4);
  ihdrData[8] = 8;  // bit depth
  ihdrData[9] = 2;  // color type RGB
  const ihdr = createChunk('IHDR', ihdrData);

  const rowLen = 1 + w * 3;
  const raw = Buffer.alloc(rowLen * h);
  for (let y = 0; y < h; y++) {
    raw[y * rowLen] = 0; // filter: none
    for (let x = 0; x < w; x++) {
      const off = y * rowLen + 1 + x * 3;
      raw[off] = r; raw[off + 1] = g; raw[off + 2] = b;
    }
  }
  const idat = createChunk('IDAT', zlib.deflateSync(raw));
  const iend = createChunk('IEND', Buffer.alloc(0));
  return Buffer.concat([sig, ihdr, idat, iend]);
}

// Create a light gray 400x300 placeholder PNG
const placeholder = createPNG(400, 300, 220, 220, 228);

// Clean up old symlinks/svgs and write actual PNGs
if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });

const files = fs.readdirSync(publicDir);

// Remove all old files
for (const f of files) {
  fs.unlinkSync(path.join(publicDir, f));
}

// Get all asset hashes from src
const srcDir = path.resolve(__dirname, '../../src');
const assets = new Set();
function scan(dir) {
  for (const f of fs.readdirSync(dir)) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) { scan(full); continue; }
    if (f.endsWith('.tsx') || f.endsWith('.ts')) {
      const content = fs.readFileSync(full, 'utf-8');
      for (const m of content.matchAll(/figma:asset\/([a-f0-9]+\.\w+)/g)) assets.add(m[1]);
    }
  }
}
scan(srcDir);

// Write actual PNG files
for (const asset of assets) {
  fs.writeFileSync(path.join(publicDir, asset), placeholder);
}

console.log(`✓ Created ${assets.size} valid PNG placeholders in public/figma-assets/`);
