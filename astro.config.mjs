// @ts-check
import { defineConfig } from 'astro/config';

// Front-end estático da Cibele Plastic.
// https://astro.build/config
export default defineConfig({
  site: 'https://cibele-plastic.example',
  build: {
    inlineStylesheets: 'auto',
  },
  // A sacola virou "cesta" em /carrinho. O endereço antigo continua
  // publicado, então segue vivo como redirecionamento.
  redirects: {
    '/sacola': '/carrinho',
  },
});
