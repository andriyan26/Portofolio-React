const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

console.log('Reading public/HD.jpg...');
const jpegData = fs.readFileSync('public/HD.jpg');
const rawImageData = jpeg.decode(jpegData, { useTArray: true });

const { width, height, data } = rawImageData;
console.log(`Image decoded: ${width}x${height}`);

// Inspect corner pixels
function getPixel(x, y) {
  const idx = (y * width + x) * 4;
  return {
    r: data[idx],
    g: data[idx + 1],
    b: data[idx + 2],
    a: data[idx + 3],
  };
}

console.log('Top-Left (0,0):', getPixel(0, 0));
console.log('Top-Right (width-1, 0):', getPixel(width - 1, 0));
console.log('Mid-Top (width/2, 0):', getPixel(Math.floor(width / 2), 0));
