// ============================================================
// Cibele Plastic — Estado da loja (carrinho, favoritos, pedidos)
// Persistência em localStorage, sem back-end. Toda mutação
// emite `cibele:store` para a interface se redesenhar.
// ============================================================
import { cartCatalog, shop, formatPrice } from '../data/catalog';

export interface CartLine {
  sku: string;
  qty: number;
}

export interface CartItem extends CartLine {
  slug: string;
  nome: string;
  variante: string;
  unidades: number;
  preco: number;
  estoque: number;
  imagem: string;
  colecao: string;
  total: number;
}

export interface Address {
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
}

export interface Order {
  numero: string;
  data: string;
  itens: { nome: string; variante: string; qty: number; total: number; imagem: string }[];
  totais: Totals;
  entrega: { nome: string; email: string; endereco: Address; metodo: string; prazo: string };
  pagamento: string;
}

export interface Totals {
  subtotal: number;
  desconto: number;
  cupom: string | null;
  /** Abatimento à vista (Pix) — zero nas demais formas de pagamento */
  descontoPagamento: number;
  frete: number;
  freteGratis: boolean;
  total: number;
  itens: number;
}

export type MetodoFrete = 'padrao' | 'expresso' | 'retirada';
export type MetodoPagamento = 'pix' | 'cartao' | 'boleto' | 'faturado';

const KEY_CART = 'cibele:cart:v1';
const KEY_WISH = 'cibele:wish:v1';
const KEY_COUPON = 'cibele:coupon:v1';
const KEY_ORDERS = 'cibele:orders:v1';
const KEY_SHIPPING = 'cibele:shipping:v1';
const KEY_USER = 'cibele:user:v1';

export const EVENT = 'cibele:store';

const CATALOG = cartCatalog();
const BY_SKU = new Map(CATALOG.map((item) => [item.sku, item]));

/* ---------- persistência tolerante a falhas ---------- */
function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

function write(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {
    /* modo privativo / cota cheia — a sessão segue em memória */
  }
}

function emit(detail: Record<string, unknown> = {}) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail }));
}

/* ============================================================
   Carrinho
   ============================================================ */
export function getCart(): CartLine[] {
  return read<CartLine[]>(KEY_CART, []).filter((line) => BY_SKU.has(line.sku) && line.qty > 0);
}

function setCart(lines: CartLine[], detail: Record<string, unknown> = {}) {
  write(KEY_CART, lines);
  emit(detail);
}

export function addToCart(sku: string, qty = 1): boolean {
  const produto = BY_SKU.get(sku);
  if (!produto) return false;

  const lines = getCart();
  const found = lines.find((line) => line.sku === sku);
  const alvo = (found?.qty ?? 0) + qty;
  const limite = Math.min(alvo, produto.estoque);

  if (found) found.qty = limite;
  else lines.push({ sku, qty: limite });

  setCart(lines, { tipo: 'add', sku, nome: produto.nome, variante: produto.variante });
  return true;
}

export function setQty(sku: string, qty: number) {
  const produto = BY_SKU.get(sku);
  if (!produto) return;
  const lines = getCart();
  const found = lines.find((line) => line.sku === sku);
  if (!found) return;

  if (qty <= 0) {
    setCart(lines.filter((line) => line.sku !== sku), { tipo: 'remove', sku });
    return;
  }
  found.qty = Math.min(qty, produto.estoque);
  setCart(lines, { tipo: 'qty', sku });
}

export function removeFromCart(sku: string) {
  setCart(getCart().filter((line) => line.sku !== sku), { tipo: 'remove', sku });
}

export function clearCart() {
  setCart([], { tipo: 'clear' });
}

export function cartItems(): CartItem[] {
  return getCart().flatMap((line) => {
    const produto = BY_SKU.get(line.sku);
    if (!produto) return [];
    return [{ ...produto, ...line, total: produto.preco * line.qty }];
  });
}

export function cartCount(): number {
  return getCart().reduce((soma, line) => soma + line.qty, 0);
}

/* ============================================================
   Cupom
   ============================================================ */
export function getCoupon(): string | null {
  return read<string | null>(KEY_COUPON, null);
}

export function applyCoupon(codigo: string): { ok: boolean; mensagem: string } {
  const alvo = codigo.trim().toUpperCase();
  const cupom = shop.cupons.find((c) => c.codigo === alvo);
  if (!cupom) return { ok: false, mensagem: 'Cupom inválido ou expirado.' };

  const subtotal = cartItems().reduce((soma, item) => soma + item.total, 0);
  if (cupom.minimo && subtotal < cupom.minimo) {
    return {
      ok: false,
      mensagem: `Este cupom vale para pedidos a partir de ${formatPrice(cupom.minimo)}.`,
    };
  }

  write(KEY_COUPON, alvo);
  emit({ tipo: 'cupom', codigo: alvo });
  return { ok: true, mensagem: `Cupom ${alvo} aplicado — ${cupom.rotulo}.` };
}

export function removeCoupon() {
  write(KEY_COUPON, null);
  emit({ tipo: 'cupom' });
}

/* ============================================================
   Totais
   ============================================================ */
export function totals(
  metodoFrete: MetodoFrete = 'padrao',
  metodoPagamento?: MetodoPagamento,
): Totals {
  const itens = cartItems();
  const subtotal = itens.reduce((soma, item) => soma + item.total, 0);
  const quantidade = itens.reduce((soma, item) => soma + item.qty, 0);

  const codigo = getCoupon();
  const cupom = shop.cupons.find((c) => c.codigo === codigo);
  const valido = cupom && (!cupom.minimo || subtotal >= cupom.minimo);
  const desconto = valido ? subtotal * cupom!.desconto : 0;

  const base = subtotal - desconto;

  // O frete grátis olha o valor das mercadorias antes do abatimento à
  // vista: quem paga no Pix não deve perder o benefício por isso.
  const freteGratis = base >= shop.freteGratisAcima || quantidade === 0;

  let frete = 0;
  if (quantidade > 0 && metodoFrete !== 'retirada') {
    if (metodoFrete === 'expresso') frete = shop.freteExpresso;
    else frete = freteGratis ? 0 : shop.freteFixo;
  }

  // Pix é à vista: o desconto anunciado no checkout entra aqui, senão
  // o cliente confirma um total que não corresponde à promessa.
  const descontoPagamento = metodoPagamento === 'pix' ? base * shop.descontoPix : 0;

  return {
    subtotal,
    desconto,
    cupom: valido ? codigo : null,
    descontoPagamento,
    frete,
    freteGratis: freteGratis && metodoFrete === 'padrao',
    total: base - descontoPagamento + frete,
    itens: quantidade,
  };
}

/** Quanto falta para o frete grátis (0 quando já alcançado). */
export function faltaParaFreteGratis(): number {
  const { subtotal, desconto } = totals();
  return Math.max(0, shop.freteGratisAcima - (subtotal - desconto));
}

/* ============================================================
   Favoritos
   ============================================================ */
export function getWishlist(): string[] {
  return read<string[]>(KEY_WISH, []);
}

export function isWished(slug: string): boolean {
  return getWishlist().includes(slug);
}

export function toggleWish(slug: string): boolean {
  const lista = getWishlist();
  const existe = lista.includes(slug);
  const nova = existe ? lista.filter((item) => item !== slug) : [...lista, slug];
  write(KEY_WISH, nova);
  emit({ tipo: 'wish', slug, ativo: !existe });
  return !existe;
}

/* ============================================================
   Entrega, conta e pedidos
   ============================================================ */
export function getShipping() {
  return read<Record<string, string>>(KEY_SHIPPING, {});
}

export function saveShipping(dados: Record<string, string>) {
  write(KEY_SHIPPING, dados);
}

export function getUser() {
  return read<{ nome: string; email: string } | null>(KEY_USER, null);
}

export function saveUser(user: { nome: string; email: string } | null) {
  write(KEY_USER, user);
  emit({ tipo: 'user' });
}

export function getOrders(): Order[] {
  return read<Order[]>(KEY_ORDERS, []);
}

export function placeOrder(dados: Omit<Order, 'numero' | 'data' | 'itens' | 'totais'> & { totais: Totals }): Order {
  const itens = cartItems().map((item) => ({
    nome: item.nome,
    variante: item.variante,
    qty: item.qty,
    total: item.total,
    imagem: item.imagem,
  }));

  const pedido: Order = {
    numero: gerarNumero(),
    data: new Date().toISOString(),
    itens,
    ...dados,
  };

  write(KEY_ORDERS, [pedido, ...getOrders()].slice(0, 20));
  write(KEY_COUPON, null);
  setCart([], { tipo: 'order', numero: pedido.numero });
  return pedido;
}

export function lastOrder(): Order | null {
  return getOrders()[0] ?? null;
}

function gerarNumero(): string {
  const ano = new Date().getFullYear();
  const seq = Math.floor(100000 + Math.random() * 899999);
  return `CB-${ano}-${seq}`;
}

/* ============================================================
   Utilitários compartilhados
   ============================================================ */
export { formatPrice, shop };

export function parcelar(total: number): string {
  const n = shop.parcelas;
  return `${n}× de ${formatPrice(total / n)} sem juros`;
}

export function onStoreChange(handler: (detail: any) => void) {
  const listener = (event: Event) => handler((event as CustomEvent).detail ?? {});
  window.addEventListener(EVENT, listener);
  // outra aba mexeu no carrinho
  window.addEventListener('storage', (event) => {
    if (event.key && event.key.startsWith('cibele:')) handler({ tipo: 'storage' });
  });
  return () => window.removeEventListener(EVENT, listener);
}
