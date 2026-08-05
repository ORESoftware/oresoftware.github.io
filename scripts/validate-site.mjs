import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const css = readFileSync(resolve(root, 'site.css'), 'utf8');
const expectedCards = projects.featuredRepositories.length + projects.organizations.length;
const renderedCards = (html.match(/class="project-card"/g) ?? []).length;

const assertions = [
  [projects.organizations.some((project) => project.name === 'usa-acc'), 'usa-acc is present in project data'],
  [renderedCards === expectedCards, `rendered ${expectedCards} project cards`],
  [html.includes('https://the1mills.github.io'), 'the1mills.github.io is linked'],
  [html.includes('/img/img.png'), 'the existing ORESoftware image is used'],
  [css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'), 'desktop grid is three columns'],
  [css.includes('overflow-x: hidden'), 'horizontal body overflow is guarded'],
  [css.includes('width: min(100%, 1928px)'), 'hero image is constrained to its container'],
];

const failures = assertions.filter(([passed]) => !passed);
for (const [passed, message] of assertions) {
  console.log(`${passed ? '✓' : '✗'} ${message}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
