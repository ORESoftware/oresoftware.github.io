# ORESoftware GitHub Pages

The ORESoftware landing page is an Astro 7 static site.

## Development

```sh
npm install
npm run dev
```

## Validation

```sh
npm test
npm run build
```

The repository's existing GitHub Pages configuration publishes from the root of `main`. The `Build Astro Pages` workflow builds the source in `src/`, verifies it, and commits the generated Astro output to that publishing root. Both the source and generated output include `.nojekyll`, so GitHub Pages serves Astro's static output directly rather than invoking Jekyll. Hugo is not used.
