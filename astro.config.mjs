import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://oresoftware.github.io',
  output: 'static',
  build: {
    inlineStylesheets: 'always'
  }
});
