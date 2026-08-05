import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const page = await readFile(new URL('../src/pages/index.astro', import.meta.url), 'utf8');
const projects = await readFile(new URL('../src/data/projects.ts', import.meta.url), 'utf8');
const styles = await readFile(new URL('../src/styles/global.css', import.meta.url), 'utf8');
const workflow = await readFile(new URL('../.github/workflows/build-pages.yml', import.meta.url), 'utf8');
const packageJson = JSON.parse(await readFile(new URL('../package.json', import.meta.url), 'utf8'));
const visibleSource = `${page}\n${projects}`.toLowerCase();

test('the site is implemented in Astro', () => {
  assert.match(page, /^---[\s\S]*from '\.\.\/data\/projects';/);
  assert.equal(typeof packageJson.dependencies.astro, 'string');
  assert.match(page, /Built with Astro/);
});

test('requested project taxonomy is present', () => {
  assert.match(projects, /name: 'fanwaave', label: 'Social \/ marketing'/);
  assert.match(projects, /name: 'hypesiege', label: 'Social \/ marketing'/);
  assert.match(projects, /name: 'akrion-sim', label: 'Gaming \/ simulation'/);
});

test('odd count copy and incubating labels are absent', () => {
  assert.doesNotMatch(visibleSource, /twenty-one directions|21 directions|incubating/);
});

test('the visual system is blue rather than orange or yellow', () => {
  assert.match(styles, /--blue:/);
  assert.doesNotMatch(styles.toLowerCase(), /orange|yellow/);
});

test('the artwork is constrained and centered without horizontal overflow', () => {
  assert.match(styles, /\.visual-frame img[\s\S]*max-width: 100%[\s\S]*margin-inline: auto/);
  assert.match(styles, /overflow-x: hidden/);
  assert.match(styles.replaceAll(' ', ''), /repeat\(3,minmax\(0,1fr\)\)/);
});

test('GitHub Pages publishes generated Astro output without Jekyll or Hugo', () => {
  assert.match(workflow, /npm run build/);
  assert.match(workflow, /dist\/index\.html/);
  assert.match(workflow, /dist\/\.nojekyll/);
  assert.match(workflow, /git push origin HEAD:main/);
  assert.doesNotMatch(workflow.toLowerCase(), /jekyll-build-pages|hugo/);
});
