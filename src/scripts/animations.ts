// ============================================================
// Cibele Plastic — Motor de animações (Anime.js v4) + loja
// Vocabulário de movimento restrito: fade, opacity, translateY e
// scale sutil, 200-250ms, sem bounce/elastic/movimento contínuo.
// ============================================================
import { animate, createTimeline, stagger, utils } from 'animejs';
import {
  addToCart,
  cartCount,
  isWishlisted,
  onStoreChange,
  readCart,
  removeFromCart,
  setCartQty,
  clearCart,
  toggleWishlist,
  wishlistCount,
} from './store';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const fine = window.matchMedia('(pointer: fine)').matches;

const DURATION = 240;
const DURATION_FAST = 200;
const EASE = 'outQuart';

let toastEl: HTMLElement | null = null;
let toastTimer = 0;

function showToast(message: string) {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    document.body.appendChild(toastEl);
  }
  toastEl.textContent = message;
  toastEl.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl?.classList.remove('is-visible'), 2200);
}

function formatBRL(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/* --------------------------------------------------------
   Fallback sem movimento: apenas mostra tudo.
-------------------------------------------------------- */
function showEverything() {
  document.documentElement.classList.remove('is-animate');
  utils.set('[data-reveal], [data-reveal-item], .line-inner', {
    opacity: 1,
    translateY: 0,
  });
}

/* --------------------------------------------------------
   Reveal de elementos e grupos via IntersectionObserver.
-------------------------------------------------------- */
function initReveals() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);

        if (el.hasAttribute('data-reveal-group')) {
          const items = el.querySelectorAll<HTMLElement>('[data-reveal-item]');
          animate(items, {
            opacity: [0, 1],
            translateY: [16, 0],
            duration: DURATION,
            delay: stagger(45),
            ease: EASE,
          });
        } else if (el.hasAttribute('data-lines')) {
          animate(el.querySelectorAll<HTMLElement>('.line-inner'), {
            translateY: ['105%', '0%'],
            duration: DURATION,
            delay: stagger(45),
            ease: EASE,
          });
        } else {
          const distance = el.getAttribute('data-reveal') === 'fade' ? 0 : 16;
          animate(el, {
            opacity: [0, 1],
            translateY: [distance, 0],
            duration: DURATION,
            ease: EASE,
          });
        }
      }
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  );

  document
    .querySelectorAll('[data-reveal], [data-reveal-group], [data-lines]')
    .forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------
   Contadores numéricos (conteúdo, não transform — mantém
   duração própria para permanecer legível).
-------------------------------------------------------- */
function initCounters() {
  const observer = new IntersectionObserver(
    (entries, obs) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target as HTMLElement;
        obs.unobserve(el);
        const target = Number(el.dataset.count ?? '0');
        const proxy = { value: 0 };
        animate(proxy, {
          value: target,
          duration: 1100,
          ease: 'outQuart',
          onUpdate: () => {
            el.textContent = String(Math.round(proxy.value));
          },
        });
      }
    },
    { threshold: 0.4 },
  );

  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------
   Timeline do hero (executa no carregamento).
-------------------------------------------------------- */
function initHero() {
  const hero = document.querySelector('[data-hero]');
  if (!hero) return;

  const tl = createTimeline({
    defaults: { ease: EASE, duration: DURATION },
  });

  const lines = hero.querySelectorAll<HTMLElement>('.line-inner');
  if (lines.length) {
    tl.add(lines, {
      translateY: ['105%', '0%'],
      delay: stagger(60),
    });
  }

  hero.querySelectorAll<HTMLElement>('[data-hero-item]').forEach((item, index) => {
    tl.add(
      item,
      {
        opacity: [0, 1],
        translateY: [16, 0],
        duration: DURATION,
      },
      index === 0 ? '-=140' : '-=180',
    );
  });
}

/* --------------------------------------------------------
   Cabeçalho: sombra ao rolar.
-------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector<HTMLElement>('[data-header]');
  if (!header) return;
  const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

/* --------------------------------------------------------
   Busca (header) — abre/fecha o painel de busca.
-------------------------------------------------------- */
function initSearch() {
  const wrap = document.querySelector<HTMLElement>('[data-search-wrap]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-search-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-search-panel]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  if (!wrap || !toggle || !panel) return;

  let open = false;

  const setOpen = (state: boolean) => {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    if (state) {
      panel.hidden = false;
      requestAnimationFrame(() => panel.classList.add('is-visible'));
      input?.focus();
    } else {
      panel.classList.remove('is-visible');
      window.setTimeout(() => {
        panel.hidden = true;
      }, DURATION);
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));
  document.addEventListener('click', (event) => {
    if (open && !wrap.contains(event.target as Node)) setOpen(false);
  });
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------
   Mega menu de categorias (desktop) — abre no hover para
   ponteiros finos e por clique/teclado em qualquer caso.
-------------------------------------------------------- */
function initMegaMenu() {
  const wrap = document.querySelector<HTMLElement>('[data-mega-wrap]');
  const toggle = document.querySelector<HTMLButtonElement>('[data-mega-toggle]');
  const panel = document.querySelector<HTMLElement>('[data-mega-panel]');
  if (!wrap || !toggle || !panel) return;

  let open = false;
  let openedByHover = false;
  let hoverTimer = 0;

  const setOpen = (state: boolean, viaHover = false) => {
    if (state === open) return;
    open = state;
    if (state) openedByHover = viaHover;
    toggle.setAttribute('aria-expanded', String(state));
    toggle.classList.toggle('is-open', state);

    if (state) {
      panel.hidden = false;
      if (!reduceMotion) {
        animate(panel, { opacity: [0, 1], translateY: [-6, 0], duration: DURATION_FAST, ease: 'outQuad' });
      }
    } else if (!reduceMotion) {
      animate(panel, {
        opacity: [1, 0],
        translateY: [0, -6],
        duration: DURATION_FAST,
        ease: 'outQuad',
        onComplete: () => {
          panel.hidden = true;
        },
      });
    } else {
      panel.hidden = true;
    }
  };

  // Em ponteiros finos, o hover já abre o menu antes do clique chegar;
  // ignoramos esse clique "de passagem" para não fechar o painel na hora.
  toggle.addEventListener('click', () => {
    if (open && openedByHover) return;
    setOpen(!open);
  });

  if (fine) {
    wrap.addEventListener('mouseenter', () => {
      window.clearTimeout(hoverTimer);
      if (window.innerWidth >= 940) setOpen(true, true);
    });
    wrap.addEventListener('mouseleave', () => {
      hoverTimer = window.setTimeout(() => setOpen(false), 150);
    });
  }

  panel.querySelectorAll('[data-mega-link]').forEach((link) => {
    link.addEventListener('click', () => setOpen(false));
  });

  document.addEventListener('click', (event) => {
    if (open && !wrap.contains(event.target as Node)) setOpen(false);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) {
      setOpen(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (open && window.innerWidth < 940) setOpen(false);
  });
}

/* --------------------------------------------------------
   Menu mobile.
-------------------------------------------------------- */
function initMobileMenu() {
  const toggle = document.querySelector<HTMLElement>('[data-menu-toggle]');
  const menu = document.querySelector<HTMLElement>('[data-menu]');
  if (!toggle || !menu) return;

  const links = menu.querySelectorAll<HTMLElement>('[data-menu-link]');
  let open = false;

  const setOpen = (state: boolean) => {
    open = state;
    toggle.setAttribute('aria-expanded', String(state));
    document.body.classList.toggle('menu-open', state);
    document.documentElement.classList.toggle('menu-open', state);
    if (state) {
      menu.hidden = false;
      animate(menu, { opacity: [0, 1], duration: DURATION_FAST, ease: 'outQuad' });
      if (!reduceMotion) {
        animate(links, {
          opacity: [0, 1],
          translateY: [16, 0],
          delay: stagger(35, { start: 60 }),
          duration: DURATION,
          ease: EASE,
        });
      }
    } else {
      animate(menu, {
        opacity: [1, 0],
        duration: DURATION_FAST,
        ease: 'outQuad',
        onComplete: () => {
          menu.hidden = true;
        },
      });
    }
  };

  toggle.addEventListener('click', () => setOpen(!open));
  menu.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => setOpen(false)));
  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && open) setOpen(false);
  });
}

/* --------------------------------------------------------
   Selos do header (favoritos / sacola) — refletem o estado
   salvo em localStorage em toda navegação, e ao vivo quando
   o carrinho/favoritos mudam na mesma página.
-------------------------------------------------------- */
function initBadges() {
  const wishlistBadges = document.querySelectorAll<HTMLElement>('[data-badge="wishlist"]');
  const cartBadges = document.querySelectorAll<HTMLElement>('[data-badge="cart"]');
  if (!wishlistBadges.length && !cartBadges.length) return;

  const render = () => {
    const wCount = wishlistCount();
    const cCount = cartCount();
    wishlistBadges.forEach((el) => {
      el.textContent = String(wCount);
      el.classList.toggle('is-visible', wCount > 0);
    });
    cartBadges.forEach((el) => {
      el.textContent = String(cCount);
      el.classList.toggle('is-visible', cCount > 0);
    });
  };

  render();
  onStoreChange(render);
}

/* --------------------------------------------------------
   Botão de favoritar — em qualquer card ou na PDP. Sincroniza
   todas as ocorrências do mesmo produto na página.
-------------------------------------------------------- */
function initWishlistButtons() {
  const buttons = document.querySelectorAll<HTMLButtonElement>('[data-wishlist-toggle]');
  if (!buttons.length) return;

  const render = () => {
    buttons.forEach((btn) => {
      const id = btn.dataset.id;
      if (!id) return;
      const active = isWishlisted(id);
      btn.classList.toggle('is-active', active);
      btn.setAttribute('aria-pressed', String(active));
    });
  };

  buttons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.id;
      if (!id) return;
      const active = toggleWishlist(id);
      const name = btn.getAttribute('aria-label')?.replace('Favoritar ', '') ?? 'Produto';
      showToast(active ? `Favoritado: ${name}` : `Removido dos favoritos: ${name}`);
      if (!reduceMotion) {
        animate(btn, { scale: [1, 1.12, 1], duration: DURATION, ease: 'outQuad' });
      }
    });
  });

  render();
  onStoreChange(render);
}

/* --------------------------------------------------------
   Contador de quantidade genérico (+/-). Em linhas da sacola
   (`[data-cart-row]`), a mudança também grava no estado.
-------------------------------------------------------- */
function initQtySteppers() {
  document.querySelectorAll<HTMLElement>('[data-qty-stepper]').forEach((stepper) => {
    const input = stepper.querySelector<HTMLInputElement>('[data-qty-input]');
    const minus = stepper.querySelector<HTMLButtonElement>('[data-qty-minus]');
    const plus = stepper.querySelector<HTMLButtonElement>('[data-qty-plus]');
    const row = stepper.closest<HTMLElement>('[data-cart-row]');
    if (!input) return;

    const clamp = (value: number) => Math.max(1, Math.min(999, Math.round(value) || 1));

    const commit = (value: number) => {
      input.value = String(clamp(value));
      if (row) setCartQty(row.dataset.id ?? '', clamp(value));
    };

    minus?.addEventListener('click', () => commit(Number(input.value) - 1));
    plus?.addEventListener('click', () => commit(Number(input.value) + 1));
    input.addEventListener('change', () => commit(Number(input.value)));
  });
}

/* --------------------------------------------------------
   "Adicionar à sacola" — cards de produto e formulário da PDP.
-------------------------------------------------------- */
function initAddToCart() {
  document.querySelectorAll<HTMLButtonElement>('[data-add]').forEach((button) => {
    const label = button.querySelector('.card__add-label');
    const original = label?.textContent ?? 'Adicionar';
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      if (!id) return;
      addToCart(id, 1);
      button.classList.add('is-added');
      if (label) label.textContent = 'Adicionado';
      showToast(`Adicionado à sacola: ${button.dataset.name ?? 'Produto'}`);
      if (!reduceMotion) {
        animate(button, { scale: [1, 0.97, 1], duration: DURATION, ease: 'outQuad' });
      }
      window.setTimeout(() => {
        button.classList.remove('is-added');
        if (label) label.textContent = original;
      }, 1600);
    });
  });

  const pdpForm = document.querySelector<HTMLFormElement>('[data-pdp-form]');
  if (pdpForm) {
    pdpForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const id = pdpForm.dataset.id;
      const qtyInput = pdpForm.querySelector<HTMLInputElement>('[data-qty-input]');
      const qty = Math.max(1, Number(qtyInput?.value ?? 1));
      if (!id) return;
      addToCart(id, qty);
      showToast(`Adicionado à sacola: ${pdpForm.dataset.name ?? 'Produto'}`);
      const submit = pdpForm.querySelector('[data-pdp-add]');
      if (submit && !reduceMotion) {
        animate(submit, { scale: [1, 0.97, 1], duration: DURATION, ease: 'outQuad' });
      }
    });
  }
}

/* --------------------------------------------------------
   PLP — filtros (coleção, preço), busca e ordenação.
-------------------------------------------------------- */
function initPlp() {
  const root = document.querySelector<HTMLElement>('[data-plp]');
  const grid = document.querySelector<HTMLElement>('[data-plp-grid]');
  if (!root || !grid) return;

  const cards = Array.from(grid.querySelectorAll<HTMLElement>('[data-product-card]'));
  const originalOrder = cards.slice();
  const collectionChecks = Array.from(root.querySelectorAll<HTMLInputElement>('[data-filter-collection]'));
  const priceMin = root.querySelector<HTMLInputElement>('[data-filter-price-min]');
  const priceMax = root.querySelector<HTMLInputElement>('[data-filter-price-max]');
  const clearBtn = root.querySelector<HTMLButtonElement>('[data-filter-clear]');
  const sortSelect = root.querySelector<HTMLSelectElement>('[data-sort-select]');
  const countEl = root.querySelector<HTMLElement>('[data-plp-count]');
  const emptyEl = root.querySelector<HTMLElement>('[data-plp-empty]');

  const params = new URLSearchParams(window.location.search);
  const searchQuery = (params.get('busca') ?? '').trim().toLowerCase();
  const initialCollection = params.get('colecao');
  if (initialCollection) {
    const match = collectionChecks.find((c) => c.value === initialCollection);
    if (match) match.checked = true;
  }

  const apply = () => {
    const checked = collectionChecks.filter((c) => c.checked).map((c) => c.value);
    const min = priceMin?.value ? Number(priceMin.value) : -Infinity;
    const max = priceMax?.value ? Number(priceMax.value) : Infinity;

    let visible = 0;
    cards.forEach((card) => {
      const collection = card.dataset.collection ?? '';
      const price = Number(card.dataset.price ?? 0);
      const name = card.dataset.name ?? '';
      const desc = card.dataset.desc ?? '';
      const matchesCollection = checked.length === 0 || checked.includes(collection);
      const matchesPrice = price >= min && price <= max;
      const matchesSearch = !searchQuery || name.includes(searchQuery) || desc.includes(searchQuery);
      const match = matchesCollection && matchesPrice && matchesSearch;
      card.hidden = !match;
      if (match) visible += 1;
    });

    if (countEl) countEl.textContent = `${visible} produto${visible === 1 ? '' : 's'}`;
    emptyEl?.classList.toggle('is-visible', visible === 0);

    const sortValue = sortSelect?.value ?? 'relevancia';
    let sorted = cards.slice();
    if (sortValue === 'menor-preco') {
      sorted.sort((a, b) => Number(a.dataset.price) - Number(b.dataset.price));
    } else if (sortValue === 'maior-preco') {
      sorted.sort((a, b) => Number(b.dataset.price) - Number(a.dataset.price));
    } else if (sortValue === 'nome') {
      sorted.sort((a, b) => (a.dataset.name ?? '').localeCompare(b.dataset.name ?? ''));
    } else {
      sorted = originalOrder.slice();
    }
    sorted.forEach((card) => grid.appendChild(card));
  };

  collectionChecks.forEach((c) => c.addEventListener('change', apply));
  priceMin?.addEventListener('input', apply);
  priceMax?.addEventListener('input', apply);
  sortSelect?.addEventListener('change', apply);
  clearBtn?.addEventListener('click', () => {
    collectionChecks.forEach((c) => (c.checked = false));
    if (priceMin) priceMin.value = '';
    if (priceMax) priceMax.value = '';
    if (sortSelect) sortSelect.value = 'relevancia';
    apply();
  });

  apply();
}

/* --------------------------------------------------------
   Favoritos — revela apenas os cards favoritados.
-------------------------------------------------------- */
function initWishlistPage() {
  const grid = document.querySelector<HTMLElement>('[data-wishlist-grid]');
  const empty = document.querySelector<HTMLElement>('[data-wishlist-empty]');
  if (!grid) return;

  const render = () => {
    const cards = grid.querySelectorAll<HTMLElement>('[data-product-card]');
    let count = 0;
    cards.forEach((card) => {
      const id = card.dataset.id ?? '';
      const favorited = isWishlisted(id);
      card.classList.toggle('is-favorited', favorited);
      if (favorited) count += 1;
    });
    if (empty) empty.hidden = count > 0;
  };

  render();
  onStoreChange(render);
}

/* --------------------------------------------------------
   Sacola — lista os itens salvos, quantidades e subtotal.
-------------------------------------------------------- */
function initCartPage() {
  const root = document.querySelector<HTMLElement>('[data-cart-root]');
  const list = document.querySelector<HTMLElement>('[data-cart-list]');
  const emptyEl = document.querySelector<HTMLElement>('[data-cart-empty]');
  const successEl = document.querySelector<HTMLElement>('[data-cart-success]');
  const subtotalEl = document.querySelector<HTMLElement>('[data-cart-subtotal]');
  const checkoutBtn = document.querySelector<HTMLButtonElement>('[data-checkout-submit]');
  if (!root || !list) return;

  const rows = Array.from(list.querySelectorAll<HTMLElement>('[data-cart-row]'));
  let checkedOut = false;

  const render = () => {
    const cart = readCart();
    const hasItems = Object.keys(cart).length > 0;

    rows.forEach((row) => {
      const id = row.dataset.id ?? '';
      const qty = cart[id];
      const price = Number(row.dataset.price ?? 0);
      if (!qty) {
        row.hidden = true;
        return;
      }
      row.hidden = false;
      const qtyInput = row.querySelector<HTMLInputElement>('[data-qty-input]');
      if (qtyInput && Number(qtyInput.value) !== qty) qtyInput.value = String(qty);
      const totalEl = row.querySelector<HTMLElement>('[data-cart-row-total]');
      if (totalEl) totalEl.textContent = formatBRL(price * qty);
    });

    const subtotal = rows.reduce((sum, row) => {
      const id = row.dataset.id ?? '';
      const qty = cart[id] ?? 0;
      return sum + qty * Number(row.dataset.price ?? 0);
    }, 0);
    if (subtotalEl) subtotalEl.textContent = formatBRL(subtotal);

    if (checkedOut) {
      root.hidden = true;
      if (emptyEl) emptyEl.hidden = true;
      if (successEl) successEl.hidden = false;
    } else {
      root.hidden = !hasItems;
      if (emptyEl) emptyEl.hidden = hasItems;
      if (successEl) successEl.hidden = true;
    }
  };

  list.addEventListener('click', (event) => {
    const target = event.target as HTMLElement;
    const removeBtn = target.closest<HTMLElement>('[data-cart-remove]');
    if (!removeBtn) return;
    const row = removeBtn.closest<HTMLElement>('[data-cart-row]');
    if (row?.dataset.id) removeFromCart(row.dataset.id);
  });

  checkoutBtn?.addEventListener('click', () => {
    if (Object.keys(readCart()).length === 0) return;
    checkedOut = true;
    clearCart();
  });

  render();
  onStoreChange(render);
}

/* --------------------------------------------------------
   Consentimento de cookies (LGPD).
-------------------------------------------------------- */
function initCookieConsent() {
  const banner = document.getElementById('cookie-consent');
  if (!banner) return;

  const KEY = 'cibele-consent';
  let choice: string | null = null;
  try {
    choice = localStorage.getItem(KEY);
  } catch (e) {
    choice = null;
  }

  const persist = (value: string) => {
    try {
      localStorage.setItem(KEY, value);
      localStorage.setItem(KEY + '-at', new Date().toISOString());
    } catch (e) {
      /* sem persistência */
    }
  };

  const hide = () => {
    banner.classList.remove('is-visible');
    window.setTimeout(() => (banner.hidden = true), 300);
  };

  // "manage" (link) não fecha nem grava — leva à página de privacidade.
  banner.querySelectorAll<HTMLElement>('[data-consent="accept"], [data-consent="reject"]').forEach(
    (btn) => {
      btn.addEventListener('click', () => {
        persist(btn.dataset.consent === 'accept' ? 'all' : 'essential');
        hide();
      });
    },
  );

  if (!choice) {
    banner.hidden = false;
    // força reflow para a transição de entrada rodar
    requestAnimationFrame(() =>
      requestAnimationFrame(() => banner.classList.add('is-visible')),
    );
  }
}

/* --------------------------------------------------------
   Boot.
-------------------------------------------------------- */
function boot() {
  initCookieConsent();
  initHeader();
  initSearch();
  initMegaMenu();
  initMobileMenu();
  initBadges();
  initWishlistButtons();
  initQtySteppers();
  initAddToCart();
  initPlp();
  initWishlistPage();
  initCartPage();

  if (reduceMotion) {
    showEverything();
    return;
  }

  initHero();
  initReveals();
  initCounters();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
