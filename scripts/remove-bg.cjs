const fs = require('fs');
const jpeg = require('jpeg-js');
const { PNG } = require('pngjs');

console.log('Reading public/HD.jpg...');
const jpegData = fs.readFileSync('public/HD.jpg');
const raw = jpeg.decode(jpegData, { useTArray: true });
const { width, height, data } = raw;

// Visited mask for flood fill: 0 = unvisited, 1 = background, 2 = foreground
const mask = new Uint8Array(width * height);

// Function to check if a pixel is clearly background (near-white / neutral white)
function isWhite(x, y) {
  const idx = (y * width + x) * 4;
  const r = data[idx];
  const g = data[idx + 1];
  const b = data[idx + 2];
  
  // White/light studio background check:
  // Must be high brightness and low color saturation
  const minVal = Math.min(r, g, b);
  const maxVal = Math.max(r, g, b);
  const diff = maxVal - minVal;

  // Very bright neutral white
  if (minVal >= 210 && diff <= 30) return true;
  if (minVal >= 235) return true;
  
  return false;
}

console.log('Running flood fill from perimeter...');
const queue = new Int32Array(width * height);
let qHead = 0;
let qTail = 0;

function push(x, y) {
  const idx = y * width + x;
  if (mask[idx] === 0) {
    mask[idx] = 1; // mark as background
    queue[qTail++] = idx;
  }
}

// Seed all perimeter pixels that are white
for (let x = 0; x < width; x++) {
  if (isWhite(x, 0)) push(x, 0);
  if (isWhite(x, height - 1)) push(x, height - 1);
}
for (let y = 0; y < height; y++) {
  if (isWhite(0, y)) push(0, y);
  if (isWhite(width - 1, y)) push(width - 1, y);
}

// BFS Flood Fill
while (qHead < qTail) {
  const curr = queue[qHead++];
  const cx = curr % width;
  const cy = Math.floor(curr / width);

  // Check 4 neighbors
  if (cx > 0) {
    const nx = cx - 1, ny = cy;
    const nidx = ny * width + nx;
    if (mask[nidx] === 0 && isWhite(nx, ny)) {
      mask[nidx] = 1;
      queue[qTail++] = nidx;
    }
  }
  if (cx < width - 1) {
    const nx = cx + 1, ny = cy;
    const nidx = ny * width + nx;
    if (mask[nidx] === 0 && isWhite(nx, ny)) {
      mask[nidx] = 1;
      queue[qTail++] = nidx;
    }
  }
  if (cy > 0) {
    const nx = cx, ny = cy - 1;
    const nidx = ny * width + nx;
    if (mask[nidx] === 0 && isWhite(nx, ny)) {
      mask[nidx] = 1;
      queue[qTail++] = nidx;
    }
  }
  if (cy < height - 1) {
    const nx = cx, ny = cy + 1;
    const nidx = ny * width + nx;
    if (mask[nidx] === 0 && isWhite(nx, ny)) {
      mask[nidx] = 1;
      queue[qTail++] = nidx;
    }
  }
}

console.log(`Flood fill completed. Background pixels identified: ${qTail}`);

// Now create the PNG with feathered alpha border to eliminate white halo
const png = new PNG({ width, height });

for (let y = 0; y < height; y++) {
  for (let x = 0; x < width; x++) {
    const pidx = y * width + x;
    const sidx = pidx * 4;
    const didx = pidx * 4;

    const r = data[sidx];
    const g = data[sidx + 1];
    const b = data[sidx + 2];

    if (mask[pidx] === 1) {
      // 100% background
      png.data[didx] = 0;
      png.data[didx + 1] = 0;
      png.data[didx + 2] = 0;
      png.data[didx + 3] = 0;
    } else {
      // Foreground pixel
      // Check if neighboring background within 2px for smooth anti-aliased edge
      let bgCount = 0;
      let totalNeighbors = 0;
      for (let dy = -2; dy <= 2; dy++) {
        for (let dx = -2; dx <= 2; dx++) {
          const nx = x + dx;
          const ny = y + dy;
          if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
            totalNeighbors++;
            if (mask[ny * width + nx] === 1) {
              bgCount++;
            }
          }
        }
      }

      if (bgCount > 0) {
        // Edge pixel - smooth alpha feathering
        const brightness = (r + g + b) / 3;
        // If it's near white on the edge, blend alpha
        let alpha = 255;
        if (brightness > 200) {
          alpha = Math.max(0, Math.min(255, Math.round(255 - ((brightness - 190) / 65) * 255)));
        }
        
        // Decontaminate white fringe
        const factor = alpha / 255;
        png.data[didx] = Math.round(r * factor);
        png.data[didx + 1] = Math.round(g * factor);
        png.data[didx + 2] = Math.round(b * factor);
        png.data[didx + 3] = alpha;
      } else {
        // Solid interior foreground
        png.data[didx] = r;
        png.data[didx + 1] = g;
        png.data[didx + 2] = b;
        png.data[didx + 3] = 255;
      }
    }
  }
}

console.log('Writing transparent cutout to public/foto-depan.png and public/Foto Depan.png...');
const buffer = PNG.sync.write(png);
fs.writeFileSync('public/foto-depan.png', buffer);
fs.writeFileSync('public/Foto Depan.png', buffer);
console.log(`Saved transparent HD portrait (${(buffer.length / 1024 / 1024).toFixed(2)} MB)`);
