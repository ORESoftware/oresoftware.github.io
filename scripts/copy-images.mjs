import { cpSync, existsSync, mkdirSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const source = resolve(root, 'img');
const target = resolve(root, 'dist', 'img');

if (!existsSync(source)) {
  throw new Error('The source img/ directory is missing.');
}

mkdirSync(target, { recursive: true });
cpSync(source, target, { recursive: true, force: true });
console.log('Copied the existing ORESoftware images into dist/img/.');
