import { expect, test } from '@playwright/test';

const expectedColumns = {
  desktop: 3,
  tablet: 2,
  mobile: 1,
};

const requiredLinks = [
  'https://github.com/ORESoftware/live-mutex',
  'https://github.com/ORESoftware/sumanjs',
  'https://github.com/ORESoftware/flags-2-env',
  'https://github.com/ORESoftware/r2g',
  'https://github.com/fiducia-cloud',
  'https://github.com/cliptown',
  'https://github.com/sonus-auris',
  'https://github.com/memebank',
  'https://github.com/daedalus-fab',
  'https://github.com/quaestor-ledger',
  'https://github.com/scintilla-run',
  'https://github.com/3FA-app',
  'https://github.com/zed-pkg',
  'https://github.com/akrion-sim',
  'https://github.com/declarative-migrations',
  'https://github.com/discrete-event-systems',
  'https://github.com/drone-mngr',
  'https://github.com/embedded-alerts',
  'https://github.com/fanwaave',
  'https://github.com/evento-globolo',
  'https://github.com/hypesiege',
  'https://github.com/StreemPilot',
  'https://github.com/file-tunnel',
  'https://github.com/opto-sync',
  'https://github.com/sagitta-stack',
  'https://github.com/usa-acc',
  'https://the1mills.github.io',
  '/22-factor-app/',
];

const expectedCardCount = 26;
const expectedOrganizationCount = 22;

async function openHome(page) {
  const response = await page.goto('/', { waitUntil: 'domcontentloaded' });
  expect(response, 'the home page should return an HTTP response').not.toBeNull();
  expect(response?.ok(), `unexpected home-page status: ${response?.status()}`).toBeTruthy();
  await expect(page.locator('main#main-content')).toBeVisible();
}

async function renderedColumnCount(grid) {
  return grid.evaluate((element) => {
    const columns = getComputedStyle(element).gridTemplateColumns.trim();
    return columns === 'none' ? 0 : columns.split(/\s+/).filter(Boolean).length;
  });
}

test.beforeEach(async ({ page }) => {
  await openHome(page);
});

test('keeps the banner centered, the page overflow-free, and the grid responsive', async ({ page }, testInfo) => {
  await expect(page.locator('.project-card')).toHaveCount(expectedCardCount);
  await expect(page.locator('[data-project-card="organization"]')).toHaveCount(expectedOrganizationCount);

  const expected = expectedColumns[testInfo.project.name];
  expect(expected, `unknown Playwright viewport project: ${testInfo.project.name}`).toBeTruthy();

  for (const grid of await page.locator('.project-grid').all()) {
    expect(await renderedColumnCount(grid)).toBe(expected);
  }

  const overflow = await page.evaluate(() => {
    const viewport = window.innerWidth;
    const offenders = [...document.querySelectorAll('body *')]
      .filter((element) => {
        const rect = element.getBoundingClientRect();
        return rect.left < -1 || rect.right > viewport + 1;
      })
      .slice(0, 10)
      .map((element) => ({
        className: element.className,
        tagName: element.tagName,
      }));

    return {
      viewport,
      documentWidth: document.documentElement.scrollWidth,
      bodyWidth: document.body.scrollWidth,
      offenders,
    };
  });

  expect(overflow.documentWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1);
  expect(overflow.bodyWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1);
  expect(overflow.offenders, JSON.stringify(overflow)).toEqual([]);

  const logo = page.locator('.hero-logo');
  const logoShell = page.locator('.hero-logo-shell');
  await expect(logo).toBeVisible();
  await expect(logoShell).toBeVisible();

  const logoBox = await logo.boundingBox();
  const shellBox = await logoShell.boundingBox();
  const viewport = page.viewportSize();

  expect(logoBox).not.toBeNull();
  expect(shellBox).not.toBeNull();
  expect(viewport).not.toBeNull();

  if (logoBox && shellBox && viewport) {
    expect(logoBox.x).toBeGreaterThanOrEqual(-1);
    expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(viewport.width + 1);
    expect(logoBox.x).toBeGreaterThanOrEqual(shellBox.x - 1);
    expect(logoBox.x + logoBox.width).toBeLessThanOrEqual(shellBox.x + shellBox.width + 1);

    const logoCenter = logoBox.x + logoBox.width / 2;
    const shellCenter = shellBox.x + shellBox.width / 2;
    expect(Math.abs(logoCenter - shellCenter)).toBeLessThanOrEqual(2);
  }
});

test('filters the organization catalog and exposes a clear empty state', async ({ page }) => {
  const filter = page.locator('#project-filter');
  const cards = page.locator('[data-project-card="organization"]');
  const visibleCards = page.locator('[data-project-card="organization"]:visible');
  const noResults = page.locator('#no-results');

  await expect(filter).toBeVisible();
  await expect(cards).toHaveCount(expectedOrganizationCount);

  await filter.fill('fiducia');
  await expect(visibleCards).toHaveCount(1);
  await expect(visibleCards.locator('h3')).toHaveText('fiducia-cloud');
  await expect(noResults).toBeHidden();

  await filter.fill('definitely-not-an-oresoftware-project');
  await expect(visibleCards).toHaveCount(0);
  await expect(noResults).toBeVisible();

  await filter.clear();
  await expect(visibleCards).toHaveCount(expectedOrganizationCount);
  await expect(noResults).toBeHidden();
});

test('keeps required destinations and navigation reachable', async ({ page }, testInfo) => {
  for (const href of requiredLinks) {
    expect(await page.locator(`a[href="${href}"]`).count(), `missing link: ${href}`).toBeGreaterThan(0);
  }

  const skipLink = page.locator('.skip-link');
  await skipLink.focus();
  await expect(skipLink).toBeFocused();
  await expect(skipLink).toHaveAttribute('href', '#main-content');

  if (testInfo.project.name === 'desktop') {
    const primaryNav = page.locator('.primary-nav');
    await expect(primaryNav).toBeVisible();

    const menus = primaryNav.locator('details.nav-menu');
    await expect(menus).toHaveCount(2);

    for (const menu of await menus.all()) {
      await menu.locator('summary').click();
      await expect(menu).toHaveAttribute('open', '');
      await expect(menu.locator('.nav-menu__panel')).toBeVisible();
      await menu.locator('summary').click();
      await expect(menu).not.toHaveAttribute('open', '');
    }
  } else {
    const mobileNav = page.locator('.mobile-nav');
    await expect(mobileNav).toBeVisible();
    await mobileNav.locator('summary').click();
    await expect(mobileNav).toHaveAttribute('open', '');
    await expect(mobileNav.locator('.mobile-nav__panel')).toBeVisible();
  }
});

test('preserves basic accessible document contracts', async ({ page }) => {
  await expect(page.locator('html')).toHaveAttribute('lang', 'en');
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('main#main-content')).toHaveCount(1);
  await expect(page.locator('img[alt="ORESoftware"]')).toBeVisible();
  await expect(page.locator('nav[aria-label="Primary navigation"], nav[aria-label="Mobile navigation"]')).not.toHaveCount(0);

  const defects = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    const imagesWithoutAlt = [...document.querySelectorAll('img')]
      .filter((image) => !image.hasAttribute('alt'))
      .map((image) => image.getAttribute('src'));
    const unsafeBlankTargets = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((anchor) => !anchor.rel.split(/\s+/).includes('noreferrer'))
      .map((anchor) => anchor.getAttribute('href'));

    return {
      duplicateIds: [...new Set(duplicateIds)],
      imagesWithoutAlt,
      unsafeBlankTargets,
    };
  });

  expect(defects).toEqual({
    duplicateIds: [],
    imagesWithoutAlt: [],
    unsafeBlankTargets: [],
  });
});

test('publishes all twenty-two factors with the encrypted-config and delivery contracts', async ({ page }) => {
  const response = await page.goto('/22-factor-app/', { waitUntil: 'domcontentloaded' });
  expect(response, 'the 22-factor route should return an HTTP response').not.toBeNull();
  expect(response?.ok(), `unexpected manifesto status: ${response?.status()}`).toBeTruthy();

  await expect(page.locator('h1')).toHaveText('The 22-Factor App');
  await expect(page.locator('.manifesto-factor')).toHaveCount(22);
  await expect(page.locator('.manifesto-factor--extension')).toHaveCount(10);
  await expect(page.locator('.manifesto-index__item')).toHaveCount(22);

  for (const id of [
    'encrypted-configuration',
    'bootstrap-secrets',
    'oci-artifacts',
    'isolation-boundaries',
    'immutable-infrastructure',
    'recoverable-connections',
    'tag-based-releases',
    'human-authority',
    'code-review',
    'history-integration',
  ]) {
    await expect(page.locator(`#${id}`), `missing factor anchor: ${id}`).toHaveCount(1);
  }

  const configurationText = await page.locator('.manifesto-config__example code').textContent();
  expect(configurationText).toContain('enc/');
  expect(configurationText).toContain('dev.env.enc');
  expect(configurationText).toContain('dec/');
  expect(configurationText).toContain('.env → env/dec/dev.env');

  const bootstrapText = await page.locator('#bootstrap-secrets').textContent();
  expect(bootstrapText).toContain('Fiducia Cloud');
  expect(bootstrapText).toContain('one or two secrets');

  const ociText = await page.locator('#oci-artifacts').textContent();
  expect(ociText).toContain('Package to OCI standards, not to a Docker dependency.');

  const historyText = await page.locator('#history-integration').textContent();
  expect(historyText).toContain('Rebase private work; merge shared history.');
  await expect(page.locator('#independent-heading')).toHaveText('An extension, not an official replacement');

  const overflow = await page.evaluate(() => ({
    viewport: window.innerWidth,
    documentWidth: document.documentElement.scrollWidth,
    bodyWidth: document.body.scrollWidth,
  }));

  expect(overflow.documentWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1);
  expect(overflow.bodyWidth, JSON.stringify(overflow)).toBeLessThanOrEqual(overflow.viewport + 1);

  const defects = await page.evaluate(() => {
    const ids = [...document.querySelectorAll('[id]')].map((element) => element.id);
    const duplicateIds = ids.filter((id, index) => ids.indexOf(id) !== index);
    const unsafeBlankTargets = [...document.querySelectorAll('a[target="_blank"]')]
      .filter((anchor) => !anchor.rel.split(/\s+/).includes('noreferrer'))
      .map((anchor) => anchor.getAttribute('href'));

    return {
      duplicateIds: [...new Set(duplicateIds)],
      unsafeBlankTargets,
    };
  });

  expect(defects).toEqual({
    duplicateIds: [],
    unsafeBlankTargets: [],
  });
});
