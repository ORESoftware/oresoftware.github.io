# ORESoftware GitHub Pages

The public ORESoftware project showcase, built with [Astro](https://astro.build/) and published at `oresoftware.github.io`.

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

GitHub Actions validates the shared project catalog, builds the Astro source into `dist/`, and syncs that generated output to the repository root used by the current `main:/` GitHub Pages configuration. The checked-in root snapshot and `.nojekyll` keep Pages available during builds without introducing Jekyll or Hugo.

Project cards are defined once in `src/data/projects.json` and rendered by Astro. Add or edit projects there rather than duplicating card markup. The root fallback also reads that same catalog until the next generated Astro snapshot is published.
