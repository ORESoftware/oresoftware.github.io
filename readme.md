# ORESoftware GitHub Pages

The public ORESoftware project showcase, built with [Astro](https://astro.build/) and published at [oresoftware.github.io](https://oresoftware.github.io).

The site intentionally does **not** use Jekyll or Hugo. `.nojekyll` prevents GitHub Pages from applying Jekyll processing to Astro's generated output.

## Development

```bash
npm install
npm run dev
```

## Validation and production build

```bash
npm run validate
npm run build
```

GitHub Actions validates the shared project catalog, builds the Astro source into `dist/`, and syncs that generated output to the repository root used by the current `main:/` GitHub Pages configuration. The checked-in root snapshot keeps Pages available during builds.

Project cards are defined once in `src/data/projects.json` and rendered by Astro. Add or edit projects there rather than duplicating card markup. The root fallback also reads that same catalog until the next generated Astro snapshot is published.

## Documentation

- [Astro architecture and operations](docs/architecture.md)
- [GitHub-owner project tracking](docs/project-tracking.md)
- [Ongoing catalog and organization tracking issue](https://github.com/ORESoftware/oresoftware.github.io/issues/6)

Use the **Add or update a project card** issue form for new repositories or organizations. Every material catalog or architecture change should be linked to the canonical Linear project for its GitHub owner.

## Current catalog baseline

The launch baseline contains four featured ORESoftware repositories and twenty-two project organizations, including `usa-acc`. The desktop layout is three cards wide, with responsive two- and one-column breakpoints.
