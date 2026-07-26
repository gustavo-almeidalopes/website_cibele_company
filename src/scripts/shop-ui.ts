// ============================================================
// Cibele Plastic — Interface da loja (presente em todas as páginas)
// Contadores do cabeçalho, cesta lateral, favoritos, busca e toast.
// ============================================================
import {
  addToCart,
  cartItems,
  cartCount,
  faltaParaFreteGratis,
  formatPrice,
  getWishlist,
  onStoreChange,
  parcelar,
  removeFromCart,
  setQty,
  shop,
  toggleWish,
  totals,
} from './store';

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ------------------------------------------------------------
   Toast
------------------------------------------------------------ */
let toastEl: HTMLElement | null = null;
let toastTimer = 0;

export function toast(titulo: string, texto = '') {
  if (!toastEl) {
    toastEl = document.createElement('div');
    toastEl.className = 'toast';
    toastEl.setAttribute('role', 'status');
    toastEl.setAttribute('aria-live', 'polite');
    document.body.appendChild(toastEl);
  }
  toastEl.innerHTML = `<strong>${titulo}</strong>${texto}`;
  toastEl.classList.add('is-visible');
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toastEl?.classList.remove('is-visible'), 2600);
}

/* ------------------------------------------------------------
   Contadores do cabeçalho
------------------------------------------------------------ */
function renderCounters() {
  const cart = cartCount();
  document.querySelectorAll<HTMLElement>('[data-cart-count]').forEach((el) => {
    el.textContent = String(cart);
    el.hidden = cart === 0;
  });

  const wish = getWishlist().length;
  document.querySelectorAll<HTMLElement>('[data-wish-count]').forEach((el) => {
    el.textContent = String(wish);
    el.hidden = wish === 0;
  });
}

/* ------------------------------------------------------------
   Estado visual dos botões de favorito
------------------------------------------------------------ */
function renderWishButtons() {
  const lista = getWishlist();
  document.querySelectorAll<HTMLElement>('[data-wish]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(lista.includes(btn.dataset.wish ?? '')));
  });
}

function initWishButtons() {
  document.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLElement>('[data-wish]');
    if (!btn) return;
    event.preventDefault();
    const slug = btn.dataset.wish ?? '';
    const ativo = toggleWish(slug);
    toast(ativo ? 'Favoritado' : 'Removido', ativo ? 'Item salvo nos seus favoritos.' : 'Item saiu dos favoritos.');
  });
}

/* ------------------------------------------------------------
   Botões "adicionar" (vitrine e página de produto)
------------------------------------------------------------ */
function initAddButtons() {
  document.addEventListener('click', (event) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-add-sku]');
    if (!btn) return;
    event.preventDefault();

    const sku = btn.dataset.addSku ?? '';
    const nome = btn.dataset.addName ?? 'Produto';
    const qty = Number(btn.dataset.addQty ?? '1') || 1;
    if (!addToCart(sku, qty)) return;

    const label = btn.querySelector('span') ?? btn;
    const original = label.textContent;
    btn.classList.add('is-added');
    label.textContent = 'Adicionado';
    window.setTimeout(() => {
      btn.classList.remove('is-added');
      label.textContent = original;
    }, 1600);

    if (btn.hasAttribute('data-add-open')) openCart();
    else toast('Adicionado', nome);
  });
}

/* ------------------------------------------------------------
   Cesta lateral
------------------------------------------------------------ */
let lastFocus: HTMLElement | null = null;

function drawerEls() {
  return {
    drawer: document.querySelector<HTMLElement>('[data-cart-drawer]'),
    overlay: document.querySelector<HTMLElement>('[data-cart-overlay]'),
    body: document.querySelector<HTMLElement>('[data-cart-body]'),
    foot: document.querySelector<HTMLElement>('[data-cart-foot]'),
  };
}

export function openCart() {
  const { drawer, overlay } = drawerEls();
  if (!drawer || !overlay) return;

  lastFocus = document.activeElement as HTMLElement;
  renderCart();

  overlay.hidden = false;
  drawer.hidden = false;
  document.body.style.overflow = 'hidden';

  requestAnimationFrame(() => {
    overlay.classList.add('is-visible');
    drawer.classList.add('is-open');
  });

  drawer.querySelector<HTMLElement>('[data-cart-close]')?.focus();
}

export function closeCart() {
  const { drawer, overlay } = drawerEls();
  if (!drawer || !overlay || drawer.hidden) return;

  overlay.classList.remove('is-visible');
  drawer.classList.remove('is-open');
  document.body.style.overflow = '';

  const esconder = () => {
    drawer.hidden = true;
    overlay.hidden = true;
  };
  if (reduceMotion) esconder();
  else window.setTimeout(esconder, 320);

  lastFocus?.focus();
}

function renderCart() {
  const { drawer, body, foot } = drawerEls();
  if (!drawer || !body || !foot) return;

  const itens = cartItems();
  const t = totals();

  const titulo = drawer.querySelector<HTMLElement>('[data-cart-title-count]');
  if (titulo) titulo.textContent = t.itens ? `(${t.itens})` : '';

  // Progresso do frete grátis
  const freebar = drawer.querySelector<HTMLElement>('[data-freebar]');
  const freebarText = drawer.querySelector<HTMLElement>('[data-freebar-text]');
  const freebarFill = drawer.querySelector<HTMLElement>('[data-freebar-fill]');
  if (freebar && freebarText && freebarFill) {
    if (itens.length === 0) {
      freebar.hidden = true;
    } else {
      const falta = faltaParaFreteGratis();
      freebar.hidden = false;
      freebarText.innerHTML = falta
        ? `Faltam <strong>${formatPrice(falta)}</strong> para o frete grátis`
        : '<strong>Frete grátis</strong> liberado neste pedido';
      const progresso = Math.min(100, ((shop.freteGratisAcima - falta) / shop.freteGratisAcima) * 100);
      freebarFill.style.width = `${progresso}%`;
    }
  }

  if (itens.length === 0) {
    foot.hidden = true;
    body.innerHTML = `
      <div class="empty">
        <span class="empty__icon">
          <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true">
            <path d="M5.5 7.5h13l-1.1 12a1.6 1.6 0 0 1-1.6 1.5H8.2a1.6 1.6 0 0 1-1.6-1.5Z" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linejoin="round"></path>
            <path d="M9 9.5V7a3 3 0 0 1 6 0v2.5" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"></path>
          </svg>
        </span>
        <p class="ui">Sua cesta está vazia</p>
        <p class="text-muted" style="font-size: var(--step--1); max-width: 30ch;">
          Explore as coleções e adicione as embalagens que combinam com a sua operação.
        </p>
        <a class="btn btn--primary" href="/embalagens">Ver catálogo</a>
      </div>`;
    return;
  }

  foot.hidden = false;
  body.innerHTML = itens
    .map(
      (item) => `
      <article class="citem">
        <a class="citem__media" href="/produto/${item.slug}">
          <img src="${item.imagem}" alt="${item.nome}" loading="lazy" decoding="async" />
        </a>
        <div class="citem__body">
          <a class="citem__name" href="/produto/${item.slug}">${item.nome}</a>
          <p class="citem__meta">${item.variante} · ${item.colecao}</p>
          <div class="citem__foot">
            <div class="qty">
              <button class="qty__btn" type="button" data-line-dec="${item.sku}" aria-label="Diminuir quantidade">−</button>
              <span class="qty__value">${item.qty}</span>
              <button class="qty__btn" type="button" data-line-inc="${item.sku}" aria-label="Aumentar quantidade" ${
                item.qty >= item.estoque ? 'disabled' : ''
              }>+</button>
            </div>
            <span class="citem__price">${formatPrice(item.total)}</span>
          </div>
          <button class="citem__remove" type="button" data-line-remove="${item.sku}">Remover</button>
        </div>
      </article>`,
    )
    .join('');

  const set = (attr: string, valor: string) => {
    const el = drawer.querySelector<HTMLElement>(`[${attr}]`);
    if (el) el.textContent = valor;
  };

  set('data-cart-subtotal', formatPrice(t.subtotal));
  set('data-cart-shipping', t.frete === 0 ? 'Grátis' : formatPrice(t.frete));
  set('data-cart-total', formatPrice(t.total));
  set('data-cart-installment', t.total > 0 ? parcelar(t.total) : '');

  const descontoRow = drawer.querySelector<HTMLElement>('[data-cart-discount-row]');
  if (descontoRow) {
    descontoRow.hidden = t.desconto === 0;
    set('data-cart-discount-label', `Desconto ${t.cupom ?? ''}`.trim());
    set('data-cart-discount', `− ${formatPrice(t.desconto)}`);
  }
}

function initCartDrawer() {
  document.addEventListener('click', (event) => {
    const alvo = event.target as HTMLElement;

    if (alvo.closest('[data-cart-open]')) {
      event.preventDefault();
      openCart();
      return;
    }

    if (alvo.closest('[data-cart-close]') || alvo.closest('[data-cart-overlay]')) {
      closeCart();
      return;
    }

    const inc = alvo.closest<HTMLElement>('[data-line-inc]');
    const dec = alvo.closest<HTMLElement>('[data-line-dec]');
    const rem = alvo.closest<HTMLElement>('[data-line-remove]');
    if (!inc && !dec && !rem) return;

    const itens = cartItems();
    if (inc) {
      const item = itens.find((i) => i.sku === inc.dataset.lineInc);
      if (item) setQty(item.sku, item.qty + 1);
    } else if (dec) {
      const item = itens.find((i) => i.sku === dec.dataset.lineDec);
      if (item) setQty(item.sku, item.qty - 1);
    } else if (rem) {
      removeFromCart(rem.dataset.lineRemove ?? '');
    }
  });

  window.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const { drawer } = drawerEls();
    if (drawer && !drawer.hidden) closeCart();
  });

  // Mantém o foco dentro da gaveta enquanto ela está aberta
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab') return;
    const { drawer } = drawerEls();
    if (!drawer || drawer.hidden) return;

    const focaveis = drawer.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
    );
    if (!focaveis.length) return;
    const primeiro = focaveis[0];
    const ultimo = focaveis[focaveis.length - 1];

    if (event.shiftKey && document.activeElement === primeiro) {
      event.preventDefault();
      ultimo.focus();
    } else if (!event.shiftKey && document.activeElement === ultimo) {
      event.preventDefault();
      primeiro.focus();
    }
  });
}

/* ------------------------------------------------------------
   Busca em tela cheia
------------------------------------------------------------ */
interface SearchEntry {
  slug: string;
  nome: string;
  colecaoLabel: string;
  preco: number;
  imagem: string;
  termos: string;
}

function initSearch() {
  const painel = document.querySelector<HTMLElement>('[data-search]');
  const input = document.querySelector<HTMLInputElement>('[data-search-input]');
  const saida = document.querySelector<HTMLElement>('[data-search-results]');
  const status = document.querySelector<HTMLElement>('[data-search-status]');
  if (!painel || !input || !saida || !status) return;

  let indice: SearchEntry[] = [];
  try {
    indice = JSON.parse(document.getElementById('search-index')?.textContent ?? '[]');
  } catch {
    indice = [];
  }

  const abrir = () => {
    painel.hidden = false;
    document.body.style.overflow = 'hidden';
    requestAnimationFrame(() => {
      painel.classList.add('is-open');
      input.focus();
    });
  };

  const fechar = () => {
    painel.classList.remove('is-open');
    document.body.style.overflow = '';
    const esconder = () => (painel.hidden = true);
    if (reduceMotion) esconder();
    else window.setTimeout(esconder, 220);
  };

  const buscar = (termo: string) => {
    const q = termo.trim().toLowerCase();
    if (q.length < 2) {
      saida.innerHTML = '';
      status.textContent = 'Comece a digitar para ver resultados';
      return;
    }

    const palavras = q.split(/\s+/);
    const achados = indice.filter((item) => palavras.every((p) => item.termos.includes(p)));

    status.textContent = achados.length
      ? `${achados.length} ${achados.length === 1 ? 'resultado' : 'resultados'} para "${termo.trim()}"`
      : `Nada encontrado para "${termo.trim()}"`;

    saida.innerHTML = achados
      .slice(0, 8)
      .map(
        (item) => `
        <a class="sresult" href="/produto/${item.slug}">
          <span class="sresult__media"><img src="${item.imagem}" alt="${item.nome}" loading="lazy" decoding="async" /></span>
          <span class="sresult__name">${item.nome}</span>
          <span class="sresult__meta">${item.colecaoLabel}</span>
          <span class="sresult__price">${formatPrice(item.preco)}</span>
        </a>`,
      )
      .join('');
  };

  document.addEventListener('click', (event) => {
    const alvo = event.target as HTMLElement;

    if (alvo.closest('[data-search-open]')) {
      event.preventDefault();
      abrir();
      return;
    }
    if (alvo.closest('[data-search-close]')) {
      fechar();
      return;
    }

    const sugestao = alvo.closest<HTMLElement>('[data-search-suggest]');
    if (sugestao) {
      input.value = sugestao.dataset.searchSuggest ?? '';
      buscar(input.value);
      input.focus();
    }
  });

  let debounce = 0;
  input.addEventListener('input', () => {
    window.clearTimeout(debounce);
    debounce = window.setTimeout(() => buscar(input.value), 120);
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !painel.hidden) fechar();
  });
}

/* ------------------------------------------------------------
   Acordeões (ficha técnica, ajuda)
------------------------------------------------------------ */
function initAccordions() {
  document.addEventListener('click', (event) => {
    const trigger = (event.target as HTMLElement).closest<HTMLElement>('.acc__trigger');
    if (!trigger) return;

    const painel = document.getElementById(trigger.getAttribute('aria-controls') ?? '');
    if (!painel) return;

    const aberto = trigger.getAttribute('aria-expanded') === 'true';
    trigger.setAttribute('aria-expanded', String(!aberto));
    painel.hidden = aberto;
  });
}

/* ------------------------------------------------------------
   Boot
------------------------------------------------------------ */
function boot() {
  renderCounters();
  renderWishButtons();
  initAddButtons();
  initWishButtons();
  initCartDrawer();
  initSearch();
  initAccordions();

  onStoreChange(() => {
    renderCounters();
    renderWishButtons();
    const { drawer } = drawerEls();
    if (drawer && !drawer.hidden) renderCart();
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', boot);
} else {
  boot();
}
