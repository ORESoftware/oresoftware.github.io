import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const astroPage = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
const layout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const header = readFileSync(resolve(root, 'src/components/SiteHeader.astro'), 'utf8');
const footer = readFileSync(resolve(root, 'src/components/SiteFooter.astro'), 'utf8');
const css = [
  'site.css',
  'styles/core.css',
  'styles/hero.css',
  'styles/projects.css',
  'styles/footer-responsive.css',
].map((path) => readFileSync(resolve(root, path), 'utf8')).join('\n');
const expectedCards = projects.featuredRepositories.length + projects.organizations.length;
const organization = (name) => projects.organizations.find((project) => project.name === name);
const visibleSource = `${astroPage}\n${header}\n${footer}`.toLowerCase();
const paletteSource = css.toLowerCase();

const assertions = [
  [typeof packageJson.devDependencies?.astro === 'string', 'Astro is the site framework'],
  [projects.organizations.some((project) => project.name === 'usa-acc'), 'usa-acc remains present in project data'],
  [expectedCards === 26, 'the catalog contains all requested repository and project cards'],
  [organization('fanwaave')?.kind === 'Social / marketing', 'fanwaave is categorized as Social / marketing'],
  [organization('hypesiege')?.kind === 'Social / marketing', 'hypesiege is categorized as Social / marketing'],
  [organization('akrion-sim')?.kind === 'Gaming / simulation', 'akrion-sim is categorized as Gaming / simulation'],
  [astroPage.includes('featuredRepositories.map') && astroPage.includes('organizations.map'), 'Astro renders both project collections'],
  [astroPage.includes('id="project-filter"') && astroPage.includes('data-project-card'), 'Astro provides core-project search'],
  [layout.includes('class="skip-link"'), 'Astro includes a keyboard skip link'],
  [header.includes('class="mobile-nav"'), 'the header has mobile navigation'],
  [html.includes('/img/img.png'), 'the checked-in Pages snapshot uses the ORESoftware image'],
  [html.includes('https://the1mills.github.io'), 'the checked-in Pages snapshot links the1mills.github.io'],
  [visibleSource.includes('core projects'), 'the interface uses Core projects language'],
  [!visibleSource.includes('hero__stats') && !visibleSource.includes('project-count'), 'visible numeric project counters are removed'],
  [!visibleSource.includes('21 directions') && !visibleSource.includes('twenty-one directions'), 'odd directions-count framing is absent'],
  [css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'), 'desktop project grid is three columns'],
  [css.includes('overflow-x: hidden'), 'horizontal body overflow is guarded'],
  [css.includes('width: min(100%, 1928px)'), 'hero image is constrained and centered'],
  [css.includes('--accent: #4f8cff'), 'the primary theme accent is blue'],
  [!paletteSource.includes('#78e7c7') && !paletteSource.includes('#9ff4dc') && !paletteSource.includes('#63ceb5'), 'the previous mint accent palette is removed'],
  [!paletteSource.includes('orange') && !paletteSource.includes('yellow'), 'orange and yellow theme tokens are absent'],
];

const failures = assertions.filter(([passed]) => !passed);
for (const [passed, message] of assertions) {
  console.log(`${passed ? '✓' : '✗'} ${message}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
