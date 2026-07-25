// ============================================================
// Cibele Plastic — Sacola e favoritos (somente front-end).
// Estado persistido em localStorage; sem backend/pagamento real.
// Qualquer mudança dispara `cibele:store` para sincronizar a UI
// (selos do header, página de sacola, página de favoritos) sem
// precisar recarregar a página.
// ============================================================

const CART_KEY = 'cibele-cart';
const WISHLIST_KEY = 'cibele-wishlist';

export type Cart = Record<string, number>;

function safeParse<T>(raw: string | null, fallback: T): T {
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function notify() {
  window.dispatchEvent(
    new CustomEvent('cibele:store', {
      detail: { cart: readCart(), wishlist: readWishlist() },
    }),
  );
}

export function readCart(): Cart {
  return safeParse<Cart>(localStorage.getItem(CART_KEY), {});
}

function writeCart(cart: Cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  notify();
}

export function addToCart(id: number | string, qty = 1) {
  const cart = readCart();
  const key = String(id);
  cart[key] = Math.max(1, (cart[key] ?? 0) + qty);
  writeCart(cart);
}

export function setCartQty(id: number | string, qty: number) {
  const cart = readCart();
  const key = String(id);
  if (qty <= 0) {
    delete cart[key];
  } else {
    cart[key] = qty;
  }
  writeCart(cart);
}

export function removeFromCart(id: number | string) {
  const cart = readCart();
  delete cart[String(id)];
  writeCart(cart);
}

export function clearCart() {
  writeCart({});
}

export function cartCount(): number {
  return Object.values(readCart()).reduce((sum, qty) => sum + qty, 0);
}

export function readWishlist(): string[] {
  return safeParse<string[]>(localStorage.getItem(WISHLIST_KEY), []);
}

function writeWishlist(list: string[]) {
  localStorage.setItem(WISHLIST_KEY, JSON.stringify(list));
  notify();
}

export function isWishlisted(id: number | string): boolean {
  return readWishlist().includes(String(id));
}

/** Alterna o favorito e devolve o novo estado (true = favoritado). */
export function toggleWishlist(id: number | string): boolean {
  const key = String(id);
  const list = readWishlist();
  const index = list.indexOf(key);
  if (index === -1) {
    list.push(key);
  } else {
    list.splice(index, 1);
  }
  writeWishlist(list);
  return index === -1;
}

export function wishlistCount(): number {
  return readWishlist().length;
}

export function onStoreChange(handler: (detail: { cart: Cart; wishlist: string[] }) => void) {
  window.addEventListener('cibele:store', (event) => {
    handler((event as CustomEvent).detail);
  });
}
