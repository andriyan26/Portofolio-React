const fs = require('fs');
const { PNG } = require('pngjs');

const img = PNG.sync.read(fs.readFileSync('public/foto-depan.png'));
const out = new PNG({ width: img.width, height: img.height });

// Background color: dark slate #0c0e14
const bgR = 12, bgG = 14, bgB = 20;

for (let i = 0; i < img.data.length; i += 4) {
  const r = img.data[i];
  const g = img.data[i + 1];
  const b = img.data[i + 2];
  const a = img.data[i + 3] / 255;

  out.data[i] = Math.round(r * a + bgR * (1 - a));
  out.data[i + 1] = Math.round(g * a + bgG * (1 - a));
  out.data[i + 2] = Math.round(b * a + bgB * (1 - a));
  out.data[i + 3] = 255;
}

fs.writeFileSync('public/test_dark.png', PNG.sync.write(out));
console.log('Saved test_dark.png');
