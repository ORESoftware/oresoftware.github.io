# Astro architecture and operations

This repository is the source and publication target for the ORESoftware GitHub Pages site at <https://oresoftware.github.io>.

## Non-negotiable platform choice

The application is built with **Astro**. Jekyll and Hugo are not part of the source, build, or deployment path.

The root `.nojekyll` file exists only to stop GitHub Pages from applying Jekyll processing to Astro's generated output.

## Source layout

| Path | Responsibility |
| --- | --- |
| `src/pages/index.astro` | Composes the public landing page. |
| `src/components/` | Reusable project cards, header navigation, and footer. |
| `src/layouts/` | Shared document shell and metadata. |
| `src/data/projects.json` | Single source of truth for featured repositories and organization cards. |
| `public/` | Static assets copied into the Astro build. |
| `styles/` | Split CSS modules imported by `site.css`. |
| `playwright.config.mjs` | Defines local and remote browser-test targets plus desktop, tablet, and mobile viewports. |
| `tests/pages.spec.mjs` | Browser regressions for overflow, banner centering, responsive grids, filtering, navigation, links, and document semantics. |
| `scripts/validate-site.mjs` | Structural checks for required catalog, layout, publication, and browser-test behavior. |
| `scripts/sync-pages.mjs` | Copies generated `dist/` output to the branch root used by Pages. |
| `.github/workflows/deploy.yml` | Validates, builds, browser-tests, and publishes the Astro output. |

## Catalog model

Cards must be edited in `src/data/projects.json`; do not duplicate card markup in the page.

Each entry has:

- `name`: repository or organization slug;
- `href`: canonical GitHub URL;
- `kind`: `Repository` or `Organization`;
- `description`: one brief project sneak peek;
- `tags`: two scan-friendly technology or purpose tags.

`usa-acc` is part of the required organization baseline and must remain in the rendered catalog unless the project is intentionally retired.

## Presentation invariants

- Desktop cards render in a three-column, 3-by-X grid.
- Tablet cards render in two columns.
- Narrow screens render one card per row.
- The ORESoftware banner is centered inside a width-constrained container.
- No element may create left-right page scrolling.
- Header navigation provides project, popular-repository, organization, GitHub, and creator access.
- The footer links to `the1mills.github.io` and identifies it as the creator site behind ORESoftware.
- Keyboard users receive a skip link and visible focus treatment.
- Reduced-motion preferences are respected.

## Local development

```bash
npm install
npm run dev
```

Install the Chromium browser used by the regression suite once per environment:

```bash
npx playwright install chromium
```

## Required validation

Run all three commands before publishing a catalog or layout change:

```bash
npm run validate
npm run build
npm run test:e2e
```

The structural validator checks the required catalog entries, the three-column desktop rule, creator links, banner constraints, overflow guards, and browser-test wiring. The production build confirms that Astro can generate the static site. Playwright then opens the built site at desktop, tablet, and mobile widths and verifies behavior in a real Chromium browser.

To run the same browser suite against an already deployed site, set `PAGES_BASE_URL` instead of starting the local Astro preview server:

```bash
PAGES_BASE_URL=https://oresoftware.github.io npm run test:e2e
```

## Deployment

Pull requests run validation, a production Astro build, and the browser regression suite. After a change reaches `main`, the workflow:

1. installs dependencies;
2. runs structural validation;
3. builds Astro into `dist/`;
4. installs the pinned Chromium runtime;
5. runs the desktop, tablet, and mobile browser suite;
6. syncs the generated files to the repository root only after those checks pass;
7. commits the generated Pages snapshot with `[skip ci]`;
8. allows GitHub Pages to serve the updated root snapshot.

The checked-in snapshot keeps the current `main:/` Pages configuration operational. Astro source remains authoritative; generated root files should not be hand-edited.

## Independent production monitoring

The source-repository workflow protects changes before publication. A separate workflow in `embedded-alerts-test/accessibility-e2e` provides an independent production lane from a `*-test` organization:

- it checks out the browser harness from this repository;
- it sets `PAGES_BASE_URL=https://oresoftware.github.io`;
- it runs the same responsive and accessibility-oriented contracts against the deployed site;
- it supports manual dispatch and a scheduled cadence;
- it uploads Playwright traces, screenshots, videos, and the HTML report when a check fails.

Keeping the independent lane outside the production repository catches publication drift and verifies that the public URL—not merely the local build—continues to satisfy the site contracts.

## Catalog update checklist

1. Edit `src/data/projects.json`.
2. Confirm the GitHub destination exists and uses the intended capitalization.
3. Keep descriptions factual, brief, and distinct.
4. Keep tags useful for filtering and scanning.
5. Run structural validation, the production build, and browser tests.
6. Open a pull request and wait for checks.
7. Merge only after checks pass.
8. Confirm the live Pages publication and the next independent production check.
9. Update the repository tracking issue and the matching Linear GitHub-owner project.
