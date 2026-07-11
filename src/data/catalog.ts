// Catálogo da Cibele Plastic — foco exclusivo em EMBALAGENS sustentáveis.
// Os produtos são organizados em coleções (linhas) de embalagem em bioplástico.
// Fonte única de dados, consumida por toda a interface (grade, PDP, sacola, favoritos).

export type CollectionSlug = 'mesa' | 'bebidas' | 'delivery';

export interface Product {
  id: number;
  slug: string;
  colecao: CollectionSlug;
  nome: string;
  descricao: string;
  preco: number;
}

export interface Collection {
  slug: CollectionSlug;
  /** âncora na página de catálogo */
  path: string;
  indice: string;
  titulo: string;
  headline: string;
  descricao: string;
  resumo: string;
  destaque: string;
}

export const products: Product[] = [
  // Mesa & Servir
  { id: 1, slug: 'prato-raso-18-cm', colecao: 'mesa', nome: 'Prato Raso 18 cm', descricao: 'Prato leve e resistente para refeições e buffet, de fontes vegetais.', preco: 15.0 },
  { id: 2, slug: 'prato-fundo-20-cm', colecao: 'mesa', nome: 'Prato Fundo 20 cm', descricao: 'Ideal para massas e caldos, com boa retenção térmica.', preco: 18.0 },
  { id: 3, slug: 'kit-talheres-bioplastico', colecao: 'mesa', nome: 'Kit Talheres Bioplástico', descricao: 'Garfo, faca e colher biodegradáveis, com toque firme.', preco: 8.0 },
  { id: 4, slug: 'guardanapos-50-un', colecao: 'mesa', nome: 'Guardanapos (50 un.)', descricao: 'Guardanapos macios de alta absorção, compostáveis.', preco: 5.0 },
  { id: 5, slug: 'bandeja-para-buffet', colecao: 'mesa', nome: 'Bandeja para Buffet', descricao: 'Bandeja rígida para servir em eventos e self-service.', preco: 22.0 },

  // Copos & Bebidas
  { id: 6, slug: 'copo-200-ml', colecao: 'bebidas', nome: 'Copo 200 ml', descricao: 'Copo transparente para bebidas frias, sem herança fóssil.', preco: 10.0 },
  { id: 7, slug: 'copo-400-ml', colecao: 'bebidas', nome: 'Copo 400 ml', descricao: 'Maior volume para sucos, refrigerantes e drinks.', preco: 13.0 },
  { id: 8, slug: 'tampa-para-copo', colecao: 'bebidas', nome: 'Tampa para Copo', descricao: 'Tampa encaixável antivazamento, compatível com canudo.', preco: 4.0 },
  { id: 9, slug: 'canudo-biodegradavel-100-un', colecao: 'bebidas', nome: 'Canudo Biodegradável (100 un.)', descricao: 'Canudos resistentes que não amolecem na bebida.', preco: 6.0 },

  // Delivery & Viagem
  { id: 10, slug: 'marmita-500-ml', colecao: 'delivery', nome: 'Marmita 500 ml', descricao: 'Embalagem térmica para transporte seguro de refeições.', preco: 20.0 },
  { id: 11, slug: 'marmita-750-ml', colecao: 'delivery', nome: 'Marmita 750 ml', descricao: 'Porção maior, com tampa de vedação reforçada.', preco: 24.0 },
  { id: 12, slug: 'pote-250-ml-com-tampa', colecao: 'delivery', nome: 'Pote 250 ml com Tampa', descricao: 'Para molhos, saladas e acompanhamentos.', preco: 9.0 },
  { id: 13, slug: 'sacola-compostavel-25-un', colecao: 'delivery', nome: 'Sacola Compostável (25 un.)', descricao: 'Sacola resistente que se decompõe após o uso.', preco: 12.0 },
];

export const collections: Collection[] = [
  {
    slug: 'mesa',
    path: '/embalagens?colecao=mesa',
    indice: '01',
    titulo: 'Mesa & Servir',
    headline: 'Mesa & Servir',
    descricao:
      'Pratos, talheres, guardanapos e bandejas que vestem a mesa com requinte e voltam à terra sem deixar rastro.',
    resumo: 'Pratos, talheres, guardanapos e bandejas para eventos, buffets e o dia a dia.',
    destaque: 'Eventos & buffet',
  },
  {
    slug: 'bebidas',
    path: '/embalagens?colecao=bebidas',
    indice: '02',
    titulo: 'Copos & Bebidas',
    headline: 'Copos & Bebidas',
    descricao:
      'Copos, tampas e canudos para bebidas quentes e frias, com o desempenho do plástico convencional e origem renovável.',
    resumo: 'Copos, tampas e canudos para cafeterias, bares e food service.',
    destaque: 'Cafeterias',
  },
  {
    slug: 'delivery',
    path: '/embalagens?colecao=delivery',
    indice: '03',
    titulo: 'Delivery & Viagem',
    headline: 'Delivery & Viagem',
    descricao:
      'Marmitas, potes e sacolas térmicas para transportar refeições com segurança — do preparo à entrega.',
    resumo: 'Marmitas, potes e sacolas para delivery, take-away e viagem.',
    destaque: 'Food service',
  },
];

export const collectionLabels: Record<CollectionSlug, string> = {
  mesa: 'Mesa',
  bebidas: 'Bebidas',
  delivery: 'Delivery',
};

export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return products.filter((product) => product.colecao === slug);
}

export function getCollection(slug: CollectionSlug): Collection {
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) {
    throw new Error(`Coleção desconhecida: ${slug}`);
  }
  return collection;
}

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products.filter((p) => p.colecao === product.colecao && p.id !== product.id).slice(0, limit);
}

/** Extrai a medida do nome (ex.: "200 ml", "18 cm", "50 un.") quando existir. */
function extractMeasure(nome: string): string | null {
  const match = nome.match(/(\d+(?:[.,]\d+)?\s?(?:ml|cm|un\.?))/i);
  return match ? match[1].replace(/\.$/, '') : null;
}

export function getProductSpecs(product: Product): string[] {
  const measure = extractMeasure(product.nome);
  return [
    'Material: bioplástico de origem vegetal (PLA)',
    measure ? `Medida: ${measure}` : null,
    `Coleção: ${collectionLabels[product.colecao]}`,
    'Compostável em até 180 dias — contra séculos do plástico fóssil',
  ].filter((line): line is string => Boolean(line));
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const stats = [
  { valor: 100, sufixo: '%', rotulo: 'Matéria-prima de origem renovável' },
  { valor: 3, rotulo: 'Coleções de embalagem em linha' },
  { valor: 180, sufixo: ' dias', rotulo: 'Para decompor — contra séculos do plástico fóssil' },
  { valor: 80, prefixo: '-', sufixo: '%', rotulo: 'Emissão de CO₂ frente ao plástico fóssil' },
];
