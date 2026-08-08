import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const fallbackScript = readFileSync(resolve(root, 'fallback.js'), 'utf8');
const astroPage = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
const layout = readFileSync(resolve(root, 'src/layouts/BaseLayout.astro'), 'utf8');
const header = readFileSync(resolve(root, 'src/components/SiteHeader.astro'), 'utf8');
const astroConfig = readFileSync(resolve(root, 'astro.config.mjs'), 'utf8');
const workflow = readFileSync(resolve(root, '.github/workflows/deploy.yml'), 'utf8');
const playwrightConfig = readFileSync(resolve(root, 'playwright.config.mjs'), 'utf8');
const browserTests = readFileSync(resolve(root, 'tests/pages.spec.mjs'), 'utf8');
const css = [
  'public/site.css',
  'public/styles/core.css',
  'public/styles/hero.css',
  'public/styles/projects.css',
  'public/styles/footer-responsive.css',
].map((path) => readFileSync(resolve(root, path), 'utf8')).join('\n');

const requiredFeaturedRepositories = [
  'live-mutex',
  'sumanjs',
  'flags-2-env',
  'r2g',
];

const requiredOrganizations = [
  'fiducia-cloud',
  'cliptown',
  'sonus-auris',
  'memebank',
  'daedalus-fab',
  'quaestor-ledger',
  'scintilla-run',
  '3fa-app',
  'zed-pkg',
  'akrion-sim',
  'declarative-migrations',
  'discrete-event-systems',
  'drone-mngr',
  'embedded-alerts',
  'fanwaave',
  'evento-globolo',
  'hypesiege',
  'streempilot',
  'file-tunnel',
  'opto-sync',
  'sagitta-stack',
  'usa-acc',
];

const featuredNames = new Set(projects.featuredRepositories.map((project) => project.name));
const organizationNames = new Set(projects.organizations.map((project) => project.name));
const expectedCards = requiredFeaturedRepositories.length + requiredOrganizations.length;
const actualCards = projects.featuredRepositories.length + projects.organizations.length;
const projectByName = new Map(
  [...projects.featuredRepositories, ...projects.organizations].map((project) => [project.name, project]),
);
const pageCopy = `${astroPage}\n${header}`.toLowerCase();
const browserTestRunsBeforePublish = workflow.indexOf('npm run test:e2e') < workflow.indexOf('npm run sync:pages');

const assertions = [
  [requiredFeaturedRepositories.every((name) => featuredNames.has(name)), 'all requested featured repositories are present'],
  [requiredOrganizations.every((name) => organizationNames.has(name)), 'all requested organizations, including usa-acc, are present'],
  [actualCards === expectedCards, `the catalog contains all ${expectedCards} requested cards`],
  [Boolean(packageJson.devDependencies?.astro), 'Astro is installed as the site framework'],
  [packageJson.scripts?.build?.includes('astro build'), 'the production build runs Astro'],
  [astroConfig.includes("output: 'static'"), 'Astro is configured for static output'],
  [workflow.includes('npm run validate') && workflow.includes('npm run build'), 'GitHub Actions validates and builds the Astro source'],
  [workflow.includes('npm run sync:pages'), 'GitHub Actions publishes the generated Astro output to Pages'],
  [astroPage.includes('featuredRepositories.map') && astroPage.includes('organizations.map'), 'Astro renders both project collections'],
  [astroPage.includes('id="project-filter"') && astroPage.includes('data-project-card'), 'Astro provides core-project search'],
  [!astroPage.includes('project-count') && !fallbackScript.includes('project-count'), 'visible project counters are absent from source and fallback'],
  [pageCopy.includes('core projects') && !pageCopy.includes('the wider constellation'), 'the homepage uses clean core-project framing'],
  [layout.includes('class="skip-link"'), 'Astro includes a keyboard skip link'],
  [header.includes('class="mobile-nav"') && header.includes('nav-menu'), 'the header has mobile navigation and dropdown menus'],
  [html.includes('https://the1mills.github.io'), 'the published Pages snapshot links to the1mills.github.io'],
  [html.includes('/img/img.png'), 'the published Pages snapshot uses the ORESoftware image'],
  [css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'), 'desktop grid is three columns'],
  [css.includes('overflow-x: hidden'), 'horizontal body overflow is guarded'],
  [css.includes('width: min(100%, 1928px)') && css.includes('object-position: center'), 'hero image is centered and constrained to its container'],
  [css.includes('--accent: #69b4ff'), 'the site uses the blue ORESoftware visual system'],
  [projectByName.get('fanwaave')?.kind === 'Social / marketing', 'fanwaave is visibly categorized as Social / marketing'],
  [projectByName.get('hypesiege')?.kind === 'Social / marketing', 'hypesiege is visibly categorized as Social / marketing'],
  [projectByName.get('akrion-sim')?.kind === 'Gaming / simulation', 'akrion-sim is visibly categorized as Gaming / simulation'],
  [packageJson.scripts?.['test:e2e'] === 'playwright test', 'the repository exposes a Playwright browser-test command'],
  [Boolean(packageJson.devDependencies?.['@playwright/test']), 'Playwright is installed for browser regression testing'],
  [workflow.includes('npx playwright install --with-deps chromium') && workflow.includes('npm run test:e2e'), 'GitHub Actions installs Chromium and runs browser tests'],
  [browserTestRunsBeforePublish, 'browser regression tests run before the Pages snapshot is published'],
  [playwrightConfig.includes('PAGES_BASE_URL'), 'the Playwright harness can target an independently deployed Pages URL'],
  [playwrightConfig.includes("name: 'desktop'") && playwrightConfig.includes("name: 'tablet'") && playwrightConfig.includes("name: 'mobile'"), 'browser tests cover desktop, tablet, and mobile viewports'],
  [browserTests.includes('scrollWidth') && browserTests.includes('gridTemplateColumns'), 'browser tests enforce overflow and responsive-grid invariants'],
  [browserTests.includes('#project-filter') && browserTests.includes('definitely-not-an-oresoftware-project'), 'browser tests exercise catalog filtering and the empty state'],
  [browserTests.includes('https://the1mills.github.io') && browserTests.includes('https://github.com/fiducia-cloud'), 'browser tests protect creator and organization link contracts'],
];

const failures = assertions.filter(([passed]) => !passed);
for (const [passed, message] of assertions) {
  console.log(`${passed ? '✓' : '✗'} ${message}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
