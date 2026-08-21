import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const root = resolve(import.meta.dirname, '..');
const projects = JSON.parse(readFileSync(resolve(root, 'src/data/projects.json'), 'utf8'));
const manifesto = JSON.parse(readFileSync(resolve(root, 'src/data/22-factor-app.json'), 'utf8'));
const packageJson = JSON.parse(readFileSync(resolve(root, 'package.json'), 'utf8'));
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const fallbackScript = readFileSync(resolve(root, 'fallback.js'), 'utf8');
const astroPage = readFileSync(resolve(root, 'src/pages/index.astro'), 'utf8');
const manifestoPage = readFileSync(resolve(root, 'src/pages/22-factor-app.astro'), 'utf8');
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
  'public/styles/manifesto.css',
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

const requiredExtensionFactors = new Map([
  ['encrypted-configuration', 'Encrypted Configuration'],
  ['bootstrap-secrets', 'Bootstrap Secrets'],
  ['oci-artifacts', 'OCI Artifacts'],
  ['isolation-boundaries', 'Isolation Boundaries'],
  ['immutable-infrastructure', 'Immutable Infrastructure'],
  ['recoverable-connections', 'Recoverable Connections'],
  ['tag-based-releases', 'Tag-Based Releases'],
  ['human-authority', 'Human Authority'],
  ['code-review', 'Code Review'],
  ['history-integration', 'History Integration'],
]);

const featuredNames = new Set(projects.featuredRepositories.map((project) => project.name));
const organizationNames = new Set(projects.organizations.map((project) => project.name));
const expectedCards = requiredFeaturedRepositories.length + requiredOrganizations.length;
const actualCards = projects.featuredRepositories.length + projects.organizations.length;
const projectByName = new Map(
  [...projects.featuredRepositories, ...projects.organizations].map((project) => [project.name, project]),
);
const pageCopy = `${astroPage}\n${header}`.toLowerCase();
const manifestoCopy = `${JSON.stringify(manifesto)}\n${manifestoPage}`;
const browserTestRunsBeforePublish = workflow.indexOf('npm run test:e2e') < workflow.indexOf('npm run sync:pages');
const foundationFactors = manifesto.factors.filter((factor) => factor.generation === 'foundation');
const extensionFactors = manifesto.factors.filter((factor) => factor.generation === 'extension');
const factorNumbers = manifesto.factors.map((factor) => factor.number);
const factorSlugs = manifesto.factors.map((factor) => factor.slug);
const factorRomans = manifesto.factors.map((factor) => factor.roman);
const extensionBySlug = new Map(extensionFactors.map((factor) => [factor.slug, factor.name]));
const exactSequence = factorNumbers.every((number, index) => number === index + 1);
const unique = (values) => new Set(values).size === values.length;
const releasePublishCondition = "github.event_name == 'push' && startsWith(github.ref, 'refs/tags/site-v')";

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
  [css.includes('grid-template-columns: repeat(3, minmax(0, 1fr))'), 'desktop grids include a three-column layout'],
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

  [manifesto.title === 'The 22-Factor App', 'the manifesto has the requested 22-factor title'],
  [manifesto.factors.length === 22, 'the manifesto contains exactly 22 factors'],
  [foundationFactors.length === 12 && extensionFactors.length === 10, 'the manifesto preserves twelve foundations and adds ten extensions'],
  [exactSequence && unique(factorNumbers) && unique(factorSlugs) && unique(factorRomans), 'factor numbers, Roman numerals, and anchors are ordered and unique'],
  [[...requiredExtensionFactors].every(([slug, name]) => extensionBySlug.get(slug) === name), 'all ten requested modern factors are present'],
  [manifesto.factors.every((factor) => factor.maxim && factor.summary && factor.practices.length >= 3), 'every factor has a maxim, rationale, and operational contract'],
  [manifesto.sources.length >= 10 && manifesto.sources.some((source) => source.href === 'https://12factor.net/'), 'the manifesto attributes the original method and primary standards'],
  [manifestoPage.includes('canonicalPath="/22-factor-app/"') && manifestoPage.includes('factors.map'), 'Astro publishes a canonical, data-driven 22-factor route'],
  [manifestoPage.includes('An extension, not an official replacement'), 'the page clearly distinguishes the proposal from the official Twelve-Factor project'],
  [manifestoCopy.includes('env/enc/dev.env.enc') && manifestoCopy.includes('env/dec/dev.env'), 'the encrypted configuration contract uses env/enc and disposable env/dec plaintext'],
  [manifestoCopy.includes('Fiducia Cloud') && manifestoCopy.includes('one or two secrets'), 'the bootstrap contract limits Fiducia Cloud to one or two external secrets'],
  [manifestoCopy.includes('Open Container Initiative') && manifestoCopy.includes('Docker daemon'), 'the packaging factor requires OCI without a Docker dependency'],
  [manifestoCopy.includes('WebSocket') && manifestoCopy.includes('randomized exponential backoff'), 'the stateful-connection factor covers draining, resumption, and reconnect backoff'],
  [manifestoCopy.includes('protected Git tags') && manifestoCopy.includes('Rebase private work; merge shared history.'), 'the release and history factors codify tag deploys and merge-versus-rebase policy'],
  [manifestoCopy.includes('independent approver') && manifestoCopy.includes('AI review'), 'the human and code-review factors preserve accountable human authority'],
  [header.includes('href="/22-factor-app/"') && astroPage.includes('href="/22-factor-app/"'), 'the manifesto is reachable from both global navigation and the homepage'],
  [css.includes("@import url('/styles/manifesto.css')") && css.includes('--manifesto-extension'), 'the manifesto has a responsive visual system'],
  [workflow.includes("tags: ['site-v*']") && workflow.includes(releasePublishCondition), 'the site tests branches but publishes only from site-v release tags'],
  [workflow.includes('git cat-file -t "${GITHUB_REF_NAME}"') && workflow.includes('origin/main'), 'the release job requires an annotated tag on the current main commit'],
  [workflow.includes('pages-dist-${{ github.sha }}') && workflow.includes('needs: build'), 'the publish job consumes the exact build that passed browser tests'],
  [workflow.includes('git add --') && !workflow.includes('git add -A'), 'the publication workflow stages only explicit generated paths'],
  [workflow.includes('22-factor-app') && !workflow.includes("github.ref == 'refs/heads/main'"), 'the generated route is published without branch-triggered deployment'],
  [browserTests.includes("page.goto('/22-factor-app/'") && browserTests.includes('manifesto-factor--extension'), 'browser tests cover the 22-factor route and modern extension cards'],
];

const failures = assertions.filter(([passed]) => !passed);
for (const [passed, message] of assertions) {
  console.log(`${passed ? '✓' : '✗'} ${message}`);
}

if (failures.length > 0) {
  process.exitCode = 1;
}
