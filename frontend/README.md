# Cibele Plastic — Front-end (Astro + Anime.js)

Front-end moderno e animado da **Cibele Plastic**, empresa de bioplásticos sustentáveis
para três segmentos: **Embalagens**, **Construção Civil** e **Produtos Médicos**.

Construído com [Astro](https://astro.build/) e animações com
[Anime.js v4](https://animejs.com/). Tipografia **Montserrat** via Google Fonts.

> Esta pasta é a nova camada de apresentação. O back-end em PHP (pasta `src/` na raiz do
> repositório) permanece intacto para o fluxo de compra.

## ✨ Destaques

- **Design eco-tech**: paleta escura editorial com acento lima ácido, layout amplo e tipografia grande.
- **Muito animado** (Anime.js v4):
  - Timeline de entrada do _hero_ com títulos revelados linha a linha.
  - _Reveals_ ao rolar a página via `IntersectionObserver` + Anime.js (com _stagger_).
  - Contadores numéricos animados nas estatísticas.
  - Botões magnéticos, cursor personalizado e _marquees_ contínuos.
  - Menu mobile em tela cheia com transições encadeadas.
  - Micro-interação de "Adicionar ao carrinho" com _toast_.
- **Acessível e responsivo**: respeita `prefers-reduced-motion`, navegação por teclado,
  _skip link_ e _fallback_ sem JavaScript.

## 🗂 Estrutura

```
frontend/
├── public/
│   ├── img/            # imagens de produtos, equipe e logo
│   └── documents/      # política de cookies (PDF)
├── src/
│   ├── data/catalog.ts     # catálogo (espelha src/includes/catalog.php)
│   ├── styles/global.css   # design system
│   ├── scripts/animations.ts   # motor de animações (Anime.js)
│   ├── layouts/BaseLayout.astro
│   ├── components/          # Header, Footer, ProductCard, CategoryPage
│   └── pages/               # index, embalagens, construcao,
│                            #   produtos-medicos, sobre, contato
└── astro.config.mjs
```

## 🚀 Como rodar

Requisitos: **Node 18+** (testado com Node 22).

```bash
cd frontend
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento em http://localhost:4321
npm run build     # gera o site estático em dist/
npm run preview   # pré-visualiza o build de produção
```

## 🧩 Editando o catálogo

Todos os produtos, categorias e estatísticas ficam em `src/data/catalog.ts`.
Basta editar o array `products` (mesmos campos do catálogo PHP) para atualizar
todas as páginas automaticamente.
