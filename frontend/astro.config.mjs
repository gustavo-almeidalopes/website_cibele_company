// @ts-check
import { defineConfig } from 'astro/config';

// Front-end estático da Cibele Plastic.
// https://astro.build/config
export default defineConfig({
  site: 'https://cibele-plastic.example',
  build: {
    inlineStylesheets: 'auto',
  },
});
