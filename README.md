# Cibele Plastic — Loja (Astro + Anime.js)

E-commerce completo da **Cibele Plastic**, especializada em **embalagens de bioplástico**
para food service, eventos, cafeterias e delivery.

Construído com [Astro](https://astro.build/) e animações discretas com
[Anime.js v4](https://animejs.com/). Tipografia **Manrope** (títulos) e **Inter** (texto).

> Este repositório contém **apenas o front-end**. Não há back-end: o carrinho, os
> favoritos, a conta e os pedidos vivem no `localStorage` do navegador, o que
> permite percorrer a jornada de compra inteira sem servidor.

## 🛍 Páginas da loja

| Rota | O que é |
| --- | --- |
| `/` | Home editorial — hero, coleções, novidades, mais vendidos, números e serviços |
| `/embalagens` | Catálogo completo com filtros, ordenação e densidade de grade (2/3/4 colunas) |
| `/colecoes/[slug]` | Página de coleção — `mesa`, `bebidas`, `delivery` |
| `/produto/[slug]` | Página de produto — galeria, formatos, quantidade, ficha técnica e relacionados |
| `/carrinho` | Cesta completa com cupom, quantidades e resumo |
| `/checkout` | Compra em 4 etapas: identificação → entrega → pagamento → revisão |
| `/pedido` | Confirmação do pedido, com acompanhamento e dados de entrega |
| `/favoritos` | Itens salvos |
| `/busca` | Busca com resultados ao vivo |
| `/conta` | Entrar, criar conta e histórico de pedidos |
| `/ajuda` | Envios, trocas, pagamento e dúvidas sobre compostagem |
| `/sobre`, `/contato`, `/privacidade`, `/termos` | Institucional e legal |

Além das páginas, a loja tem **cesta lateral**, **busca em tela cheia**, **mega menu**
e **menu mobile** disponíveis em qualquer rota.

## ✨ Como funciona

- **Estado da loja** (`src/scripts/store.ts`): carrinho, favoritos, cupons, endereço e
  pedidos em `localStorage`. Toda mutação emite `cibele:store`, e a interface se
  redesenha — inclusive entre abas.
- **Interface da loja** (`src/scripts/shop-ui.ts`): contadores do cabeçalho, cesta
  lateral, botões de adicionar/favoritar, busca e acordeões.
- **Catálogo** (`src/data/catalog.ts`): fonte única de produtos, variantes (SKU, preço e
  estoque), coleções e regras da loja — frete grátis, parcelamento e cupons.
- **Checkout**: validação campo a campo, máscaras de CPF/CNPJ, telefone, CEP e cartão,
  consulta de CEP via ViaCEP (com preenchimento manual se o serviço falhar) e resumo
  atualizado a cada escolha de frete.

### Cupons de demonstração

| Código | Desconto |
| --- | --- |
| `CIBELE10` | 10% |
| `ECO15` | 15% em pedidos acima de R$ 1.000 |

## 🗂 Estrutura

```
.
├── public/img/                 # fotos de produto, equipe e logo
├── src/
│   ├── data/catalog.ts         # produtos, variantes, coleções e regras da loja
│   ├── styles/global.css       # design system
│   ├── scripts/
│   │   ├── store.ts            # estado da loja (carrinho, favoritos, pedidos)
│   │   ├── shop-ui.ts          # interface da loja em todas as páginas
│   │   └── animations.ts       # motor de animações (Anime.js)
│   ├── layouts/BaseLayout.astro
│   ├── components/             # Header, Footer, ProductCard, CartDrawer,
│   │                           #   SearchOverlay, Newsletter, CookieConsent
│   └── pages/                  # as rotas da tabela acima
└── astro.config.mjs
```

## 🚀 Como rodar

Requisitos: **Node 18+** (testado com Node 22).

```bash
npm install       # instala dependências
npm run dev       # ambiente de desenvolvimento em http://localhost:4321
npm run build     # gera o site estático em dist/
npm run preview   # pré-visualiza o build de produção
```

## ☁️ Deploy (Vercel)

Site estático Astro na raiz do repositório. A Vercel detecta o framework
automaticamente:

- **Build Command:** `astro build` (ou `npm run build`)
- **Output Directory:** `dist`

## 🧩 Editando o catálogo

Produtos, variantes, preços, estoque, coleções e regras da loja ficam em
`src/data/catalog.ts`. Editar o array `products` atualiza vitrine, busca, carrinho e
checkout de uma vez — cada variante precisa de um `sku` estável, que é a chave do item
no carrinho.

## ♿ Acessibilidade

Respeita `prefers-reduced-motion`, navega por teclado (inclusive com foco preso na
cesta lateral), tem *skip link*, rótulos em todos os campos e funciona sem JavaScript
para leitura de conteúdo.

## 📄 Licença

Distribuído sob a licença incluída em [`LICENSE`](LICENSE).
