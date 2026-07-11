// Catálogo da Cibele Plastic — foco exclusivo em EMBALAGENS sustentáveis.
// Os produtos são organizados em coleções (linhas) de embalagem em bioplástico.
// Fonte única de dados, consumida por toda a interface.

export type CollectionSlug = 'mesa' | 'bebidas' | 'delivery';

export interface Product {
  id: number;
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
  { id: 1, colecao: 'mesa', nome: 'Prato Raso 18 cm', descricao: 'Prato leve e resistente para refeições e buffet, de fontes vegetais.', preco: 15.0 },
  { id: 2, colecao: 'mesa', nome: 'Prato Fundo 20 cm', descricao: 'Ideal para massas e caldos, com boa retenção térmica.', preco: 18.0 },
  { id: 3, colecao: 'mesa', nome: 'Kit Talheres Bioplástico', descricao: 'Garfo, faca e colher biodegradáveis, com toque firme.', preco: 8.0 },
  { id: 4, colecao: 'mesa', nome: 'Guardanapos (50 un.)', descricao: 'Guardanapos macios de alta absorção, compostáveis.', preco: 5.0 },
  { id: 5, colecao: 'mesa', nome: 'Bandeja para Buffet', descricao: 'Bandeja rígida para servir em eventos e self-service.', preco: 22.0 },

  // Copos & Bebidas
  { id: 6, colecao: 'bebidas', nome: 'Copo 200 ml', descricao: 'Copo transparente para bebidas frias, sem herança fóssil.', preco: 10.0 },
  { id: 7, colecao: 'bebidas', nome: 'Copo 400 ml', descricao: 'Maior volume para sucos, refrigerantes e drinks.', preco: 13.0 },
  { id: 8, colecao: 'bebidas', nome: 'Tampa para Copo', descricao: 'Tampa encaixável antivazamento, compatível com canudo.', preco: 4.0 },
  { id: 9, colecao: 'bebidas', nome: 'Canudo Biodegradável (100 un.)', descricao: 'Canudos resistentes que não amolecem na bebida.', preco: 6.0 },

  // Delivery & Viagem
  { id: 10, colecao: 'delivery', nome: 'Marmita 500 ml', descricao: 'Embalagem térmica para transporte seguro de refeições.', preco: 20.0 },
  { id: 11, colecao: 'delivery', nome: 'Marmita 750 ml', descricao: 'Porção maior, com tampa de vedação reforçada.', preco: 24.0 },
  { id: 12, colecao: 'delivery', nome: 'Pote 250 ml com Tampa', descricao: 'Para molhos, saladas e acompanhamentos.', preco: 9.0 },
  { id: 13, colecao: 'delivery', nome: 'Sacola Compostável (25 un.)', descricao: 'Sacola resistente que se decompõe após o uso.', preco: 12.0 },
];

export const collections: Collection[] = [
  {
    slug: 'mesa',
    path: '/embalagens#mesa',
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
    path: '/embalagens#bebidas',
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
    path: '/embalagens#delivery',
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

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const stats = [
  { valor: 100, sufixo: '%', rotulo: 'Matéria-prima de origem renovável' },
  { valor: 3, rotulo: 'Coleções de embalagem em linha' },
  { valor: 180, sufixo: ' dias', rotulo: 'Para decompor — contra séculos do plástico fóssil' },
  { valor: 80, prefixo: '-', sufixo: '%', rotulo: 'Emissão de CO₂ frente ao plástico fóssil' },
];
