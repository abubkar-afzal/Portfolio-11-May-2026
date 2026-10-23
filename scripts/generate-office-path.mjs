// scripts/generate-office-path.mjs
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname } from 'node:path';

const CONFIG = {
  N_PROJECTS: 6,
  Z_START: 10,
  SPACING: 4.5,
  AMPLITUDE: 2,
  EYE_HEIGHT: 1.6,
  APPROACH: 1.2,
  PASS: 0.4,
  OUTRO_LENGTH: 3,
  OUTPUT: 'public/paths/office_path.json',
};

function generate(n) {
  const {
    Z_START,
    SPACING,
    AMPLITUDE,
    EYE_HEIGHT,
    APPROACH,
    PASS,
    OUTRO_LENGTH,
  } = CONFIG;

  const pts = [
    [0, EYE_HEIGHT, Z_START],
    [0, EYE_HEIGHT, Z_START - 1.5],
  ];

  for (let i = 0; i < n; i++) {
    const zCenter = Z_START - 2.5 - i * SPACING;
    const side = i % 2 === 0 ? -1 : 1;
    pts.push([side * AMPLITUDE * 0.6, EYE_HEIGHT, zCenter + APPROACH]);
    pts.push([side * AMPLITUDE, EYE_HEIGHT, zCenter + 0.4]);
    pts.push([side * AMPLITUDE * 0.9, EYE_HEIGHT, zCenter - PASS]);
  }

  const zEnd = Z_START - 2.5 - (n - 1) * SPACING - PASS;
  pts.push([0, EYE_HEIGHT, zEnd - 1.5]);
  pts.push([0, EYE_HEIGHT, zEnd - 1.5 - OUTRO_LENGTH]);
  return pts;
}

mkdirSync(dirname(CONFIG.OUTPUT), { recursive: true });
const path = generate(CONFIG.N_PROJECTS);
writeFileSync(CONFIG.OUTPUT, JSON.stringify(path, null, 2));
console.log(`✅ Wrote ${path.length} points → ${CONFIG.OUTPUT}`);