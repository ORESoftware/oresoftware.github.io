import { cpSync, existsSync, readdirSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const dist = resolve(root, 'dist');

if (!existsSync(dist)) {
  throw new Error('dist/ does not exist. Run `npm run build` first.');
}

for (const entry of readdirSync(dist)) {
  const source = resolve(dist, entry);
  const target = resolve(root, entry);

  if (entry === '_astro' && existsSync(target)) {
    rmSync(target, { recursive: true, force: true });
  }

  cpSync(source, target, { recursive: true, force: true });
}

console.log('Synced Astro dist/ output to the GitHub Pages branch root.');
