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
| `scripts/validate-site.mjs` | Structural checks for required catalog and layout behavior. |
| `scripts/sync-pages.mjs` | Copies generated `dist/` output to the branch root used by Pages. |
| `.github/workflows/deploy.yml` | Validates, builds, and publishes the Astro output. |

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

## Required validation

Run both commands before publishing a catalog or layout change:

```bash
npm run validate
npm run build
```

The validator checks the required catalog entries, the three-column desktop rule, creator links, banner constraints, and overflow guards. The production build confirms that Astro can generate the static site.

## Deployment

Pull requests run validation and a production Astro build. After a change reaches `main`, the workflow:

1. installs dependencies;
2. runs structural validation;
3. builds Astro into `dist/`;
4. syncs the generated files to the repository root;
5. commits the generated Pages snapshot with `[skip ci]`;
6. allows GitHub Pages to serve the updated root snapshot.

The checked-in snapshot keeps the current `main:/` Pages configuration operational. Astro source remains authoritative; generated root files should not be hand-edited.

## Catalog update checklist

1. Edit `src/data/projects.json`.
2. Confirm the GitHub destination exists and uses the intended capitalization.
3. Keep descriptions factual, brief, and distinct.
4. Keep tags useful for filtering and scanning.
5. Run validation and the production build.
6. Open a pull request and wait for checks.
7. Merge only after checks pass.
8. Confirm the live Pages publication.
9. Update the repository tracking issue and the matching Linear GitHub-owner project.
