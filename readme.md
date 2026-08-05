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

GitHub Actions builds the Astro source and deploys `dist/` to GitHub Pages. The repository root also carries a checked-in static snapshot plus `.nojekyll` so the current branch-based Pages configuration continues to serve the redesigned site during the deployment migration.

Project cards are defined once in `src/data/projects.json` and rendered by Astro. Add or edit projects there rather than duplicating card markup.
