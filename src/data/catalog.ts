// Catálogo da Cibele Plastic — fonte única de dados de produtos e categorias,
// mantido em um só lugar para alimentar todas as páginas do front-end.

export type CategorySlug = 'embalagens' | 'medicos' | 'construcao';

export interface Product {
  id: number;
  categoria: CategorySlug;
  nome: string;
  descricao: string;
  preco: number;
  imagem: string;
}

export interface Category {
  slug: CategorySlug;
  /** rota da página (arquivo .astro) */
  path: string;
  indice: string;
  titulo: string;
  headline: string;
  descricao: string;
  resumo: string;
  destaque: string;
  imagem: string;
}

export const products: Product[] = [
  { id: 1, categoria: 'embalagens', nome: 'Copo Descartável 200ml', descricao: 'Copo plástico sustentável para bebidas frias e quentes.', preco: 10.0, imagem: 'copo.webp' },
  { id: 2, categoria: 'embalagens', nome: 'Prato Descartável 18cm', descricao: 'Prato resistente para eventos e refeições rápidas.', preco: 15.0, imagem: 'prato.webp' },
  { id: 3, categoria: 'embalagens', nome: 'Kit Talheres Bioplástico', descricao: 'Conjunto com garfo, faca e colher biodegradáveis.', preco: 8.0, imagem: 'talher.webp' },
  { id: 4, categoria: 'embalagens', nome: 'Embalagem para Comida 500ml', descricao: 'Embalagem térmica para transporte de refeições.', preco: 20.0, imagem: 'embalagem.png' },
  { id: 5, categoria: 'embalagens', nome: 'Guardanapos (50 unidades)', descricao: 'Guardanapos macios com ótima absorção.', preco: 5.0, imagem: 'guardanapo.webp' },
  { id: 6, categoria: 'construcao', nome: 'Tubo de Bioplástico para Drenagem', descricao: 'Solução resistente e sustentável para obras.', preco: 120.0, imagem: 'tubo.webp' },
  { id: 7, categoria: 'construcao', nome: 'Bloco Estrutural de Bioplástico', descricao: 'Bloco estrutural de alto desempenho para construção verde.', preco: 250.0, imagem: 'bloco.webp' },
  { id: 8, categoria: 'construcao', nome: 'Isolante Térmico Biodegradável', descricao: 'Reduz variações térmicas com menor impacto ambiental.', preco: 85.0, imagem: 'isolante.webp' },
  { id: 9, categoria: 'construcao', nome: 'Filme Protetor para Janelas', descricao: 'Proteção temporária de superfícies durante reformas.', preco: 60.0, imagem: 'filmeprotetor.webp' },
  { id: 10, categoria: 'construcao', nome: 'Formas para Concreto Bioplástico', descricao: 'Formas reutilizáveis e leves para concretagem.', preco: 200.0, imagem: 'formas.jpeg' },
  { id: 11, categoria: 'medicos', nome: 'Seringa de Bioplástico 5ml', descricao: 'Seringa com material de fontes renováveis.', preco: 12.0, imagem: 'seringa.webp' },
  { id: 12, categoria: 'medicos', nome: 'Luva Cirúrgica Biodegradável', descricao: 'Luvas seguras com composição biodegradável.', preco: 35.0, imagem: 'luva.webp' },
  { id: 13, categoria: 'medicos', nome: 'Máscara de Bioplástico', descricao: 'Máscara descartável com menor impacto ambiental.', preco: 10.0, imagem: 'mascara.webp' },
  { id: 14, categoria: 'medicos', nome: 'Frasco para Medicamentos 100ml', descricao: 'Frasco reciclável para armazenamento seguro.', preco: 8.0, imagem: 'frasco.png' },
  { id: 15, categoria: 'medicos', nome: 'Cápsula de Bioplástico', descricao: 'Cápsulas farmacêuticas feitas com bioplásticos.', preco: 5.0, imagem: 'capsula.png' },
];

export const categories: Category[] = [
  {
    slug: 'embalagens',
    path: '/embalagens',
    indice: '01',
    titulo: 'Embalagens',
    headline: 'Embalagens Descartáveis',
    descricao: 'Produtos leves, funcionais e com foco em sustentabilidade para food service, eventos e delivery.',
    resumo: 'Copos, pratos, talheres e embalagens térmicas que se decompõem sem deixar rastro.',
    destaque: 'Food service',
    imagem: 'embalagem.png',
  },
  {
    slug: 'construcao',
    path: '/construcao',
    indice: '02',
    titulo: 'Construção Civil',
    headline: 'Construção Civil',
    descricao: 'Materiais de bioplástico de alto desempenho para uma obra mais eficiente, leve e limpa.',
    resumo: 'Tubos, blocos, isolantes e formas que reduzem peso, desperdício e impacto ambiental.',
    destaque: 'Obra verde',
    imagem: 'bloco.webp',
  },
  {
    slug: 'medicos',
    path: '/produtos-medicos',
    indice: '03',
    titulo: 'Produtos Médicos',
    headline: 'Produtos Médicos',
    descricao: 'Itens confiáveis para clínicas, laboratórios e hospitais, com segurança e menor pegada de carbono.',
    resumo: 'Seringas, luvas, máscaras e frascos com a mesma segurança e muito menos plástico fóssil.',
    destaque: 'Saúde',
    imagem: 'seringa.webp',
  },
];

export function getProductsByCategory(slug: CategorySlug): Product[] {
  return products.filter((product) => product.categoria === slug);
}

export function getCategory(slug: CategorySlug): Category {
  const category = categories.find((item) => item.slug === slug);
  if (!category) {
    throw new Error(`Categoria desconhecida: ${slug}`);
  }
  return category;
}

export function getFeaturedProducts(): Product[] {
  return [7, 4, 13, 12].map((id) => {
    const product = products.find((item) => item.id === id);
    if (!product) {
      throw new Error(`Produto em destaque não encontrado: ${id}`);
    }
    return product;
  });
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

export const stats = [
  { valor: 100, sufixo: '%', rotulo: 'Matéria-prima renovável' },
  { valor: 15, prefixo: '+', rotulo: 'Produtos no catálogo' },
  { valor: 3, rotulo: 'Segmentos atendidos' },
  { valor: 80, prefixo: '-', sufixo: '%', rotulo: 'Emissão de CO₂ vs. plástico fóssil' },
];
