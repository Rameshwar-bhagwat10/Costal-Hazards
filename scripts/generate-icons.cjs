// Script to generate PWA icons
// Run with: node scripts/generate-icons.js
// Requires: sharp (npm install sharp --save-dev)

const fs = require('fs');
const path = require('path');

// Icon sizes needed for PWA
const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create a simple SVG icon
const createSVGIcon = (size) => {
  const padding = size * 0.15;
  const innerSize = size - (padding * 2);
  
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#2563EB"/>
      <stop offset="100%" style="stop-color:#1D4ED8"/>
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#bg)"/>
  <g transform="translate(${padding}, ${padding})">
    <path 
      d="M${innerSize * 0.5} ${innerSize * 0.15}
         L${innerSize * 0.85} ${innerSize * 0.5}
         L${innerSize * 0.7} ${innerSize * 0.5}
         L${innerSize * 0.7} ${innerSize * 0.85}
         L${innerSize * 0.3} ${innerSize * 0.85}
         L${innerSize * 0.3} ${innerSize * 0.5}
         L${innerSize * 0.15} ${innerSize * 0.5}
         Z"
      fill="white"
      opacity="0.9"
    />
    <circle cx="${innerSize * 0.5}" cy="${innerSize * 0.55}" r="${innerSize * 0.12}" fill="#2563EB"/>
  </g>
</svg>`;
};

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons (can be converted to PNG using sharp or online tools)
sizes.forEach(size => {
  const svg = createSVGIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  fs.writeFileSync(path.join(iconsDir, filename), svg);
  console.log(`Generated: ${filename}`);
});

// Generate badge icon (smaller, simpler)
const badgeSVG = `<svg width="72" height="72" viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg">
  <circle cx="36" cy="36" r="36" fill="#2563EB"/>
  <path d="M36 18 L54 36 L46 36 L46 54 L26 54 L26 36 L18 36 Z" fill="white"/>
</svg>`;
fs.writeFileSync(path.join(iconsDir, 'badge-72x72.svg'), badgeSVG);
console.log('Generated: badge-72x72.svg');

// Generate shortcut icons
const shortcutIcons = {
  'shortcut-report': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="20" fill="#DC2626"/>
    <path d="M48 24 V72 M24 48 H72" stroke="white" stroke-width="8" stroke-linecap="round"/>
  </svg>`,
  'shortcut-map': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="20" fill="#16A34A"/>
    <path d="M32 24 L32 72 L48 60 L64 72 L64 24 L48 36 Z" fill="white"/>
  </svg>`,
  'shortcut-feed': `<svg width="96" height="96" viewBox="0 0 96 96" xmlns="http://www.w3.org/2000/svg">
    <rect width="96" height="96" rx="20" fill="#F59E0B"/>
    <rect x="24" y="24" width="48" height="12" rx="4" fill="white"/>
    <rect x="24" y="42" width="48" height="12" rx="4" fill="white"/>
    <rect x="24" y="60" width="48" height="12" rx="4" fill="white"/>
  </svg>`
};

Object.entries(shortcutIcons).forEach(([name, svg]) => {
  fs.writeFileSync(path.join(iconsDir, `${name}.svg`), svg);
  console.log(`Generated: ${name}.svg`);
});

console.log('\\nIcon generation complete!');
console.log('Note: For production, convert SVGs to PNGs using sharp or an online tool.');
