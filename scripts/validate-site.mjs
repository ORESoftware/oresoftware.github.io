import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const fallbackScript = readFileSync(resolve(root, 'fallback.js'), 'utf8');
const astroPage = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
const layout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const header = readFileSync(resolve(root, 'src/components/SiteHeader.astro'), 'utf8');
const css = [
  'site.css',
  'styles/core.css',
  'styles/hero.css',
  'styles/projects.css',
  'styles/footer-responsive.css',
].map((path) => readFileSync(resolve(root, path), 'utf8')).join('\n');
const expectedCards = projects.featuredRepositories.length + projects.organizations.length;

const assertions = [
  [projects.organizations.some((project) => project.name === 'usa-acc'), 'usa-acc is present in project data'],
  [expectedCards === 26, 'the catalog contains all 26 requested cards'],
  [astroPage.includes('featuredRepositories.map') && astroPage.includes('organizations.map'), 'Astro renders both project collections'],
  [astroPage.includes('id="project-filter"') && astroPage.includes('data-project-card'), 'Astro provides organization search'],
  [layout.includes('class="skip-link"'), 'Astro includes a keyboard skip link'],
  [header.includes('class="mobile-nav"'), 'the header has mobile navigation'],
  [html.includes('src="/fallback.js"'), 'the legacy Pages fallback loads its module'],
  [fallbackScript.includes("fetch('/src/data/projects.json')"), 'the legacy Pages fallback uses the shared project catalog'],
  [html.includes('id="project-filter"') && fallbackScript.includes("querySelector('#project-filter')"), 'the legacy Pages fallback preserves organization search'],
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
