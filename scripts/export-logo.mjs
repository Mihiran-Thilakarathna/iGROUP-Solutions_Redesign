// Render brand/*.svg to high-resolution PNGs: node scripts/export-logo.mjs [dir] [width]
import { Resvg } from '@resvg/resvg-js';
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

const dir = process.argv[2] ?? 'brand';
const width = Number(process.argv[3] ?? 2400);

for (const file of readdirSync(dir).filter(f => f.endsWith('.svg'))) {
  const png = new Resvg(readFileSync(join(dir, file)), { fitTo: { mode: 'width', value: width } }).render().asPng();
  const out = join(dir, file.replace(/\.svg$/, `-${width}w.png`));
  writeFileSync(out, png);
  console.log('wrote', out);
}
