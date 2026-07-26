// ============================================================
// Cibele Plastic — Catálogo (fonte única de dados)
// Embalagens em bioplástico organizadas em coleções.
// Consumido por vitrine, PDP, busca, carrinho e checkout.
// ============================================================

export type CollectionSlug = 'mesa' | 'bebidas' | 'delivery';

export type BadgeSlug = 'novo' | 'best' | 'eco';

export interface Variant {
  /** SKU estável — é a chave do item no carrinho */
  sku: string;
  /** Rótulo curto exibido no seletor (estilo "tamanho") */
  rotulo: string;
  /** Unidades contidas na embalagem */
  unidades: number;
  preco: number;
  estoque: number;
}

export interface Product {
  id: number;
  slug: string;
  colecao: CollectionSlug;
  nome: string;
  subtitulo: string;
  descricao: string;
  /** Texto editorial da página de produto */
  descricaoLonga: string;
  imagens: string[];
  badge?: BadgeSlug;
  /** Preço "de" para itens em oferta (opcional) */
  precoDe?: number;
  variantes: Variant[];
  ficha: { rotulo: string; valor: string }[];
  cuidados: string[];
  /** Aparece nas vitrines de destaque da home */
  destaque?: boolean;
}

export interface Collection {
  slug: CollectionSlug;
  path: string;
  indice: string;
  titulo: string;
  headline: string;
  descricao: string;
  resumo: string;
  destaque: string;
  capa: string;
}

export const badges: Record<BadgeSlug, string> = {
  novo: 'Novo',
  best: 'Mais vendido',
  eco: 'Compostável 180 dias',
};

// ------------------------------------------------------------
// Produtos
// ------------------------------------------------------------
export const products: Product[] = [
  // ---------- Mesa & Servir ----------
  {
    id: 1,
    slug: 'prato-raso-18',
    colecao: 'mesa',
    nome: 'Prato Raso 18 cm',
    subtitulo: 'Linha Mesa',
    descricao: 'Prato leve e resistente para refeições e buffet, de fontes vegetais.',
    descricaoLonga:
      'Um prato que não parece descartável. A borda fina e o acabamento fosco vestem a mesa com discrição, e a estrutura em fibra de cana suporta pratos quentes sem entortar. Depois do uso, volta à terra em cerca de 180 dias em compostagem industrial.',
    imagens: ['/img/prato.webp'],
    badge: 'best',
    destaque: true,
    variantes: [
      { sku: 'PRT18-050', rotulo: 'Caixa 50 un.', unidades: 50, preco: 89.0, estoque: 140 },
      { sku: 'PRT18-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 159.0, estoque: 86 },
      { sku: 'PRT18-500', rotulo: 'Fardo 500 un.', unidades: 500, preco: 690.0, estoque: 12 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana-de-açúcar (bagaço) 100%' },
      { rotulo: 'Diâmetro', valor: '18 cm · borda 1,2 cm' },
      { rotulo: 'Resistência', valor: 'Até 100 °C · micro-ondas e freezer' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Não lavar em máquina', 'Armazenar em local seco'],
  },
  {
    id: 2,
    slug: 'prato-fundo-20',
    colecao: 'mesa',
    nome: 'Prato Fundo 20 cm',
    subtitulo: 'Linha Mesa',
    descricao: 'Ideal para massas e caldos, com boa retenção térmica.',
    descricaoLonga:
      'Profundidade generosa para massas, caldos e risotos. A parede dupla segura o calor por mais tempo e mantém a peça rígida mesmo com alimentos líquidos — o ponto fraco clássico do descartável, resolvido.',
    imagens: ['/img/prato.webp'],
    variantes: [
      { sku: 'PRT20-050', rotulo: 'Caixa 50 un.', unidades: 50, preco: 104.0, estoque: 96 },
      { sku: 'PRT20-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 189.0, estoque: 54 },
      { sku: 'PRT20-500', rotulo: 'Fardo 500 un.', unidades: 500, preco: 820.0, estoque: 8 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana-de-açúcar (bagaço) 100%' },
      { rotulo: 'Diâmetro', valor: '20 cm · profundidade 3,5 cm' },
      { rotulo: 'Capacidade', valor: '450 ml' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Micro-ondas até 3 min', 'Armazenar em local seco'],
  },
  {
    id: 3,
    slug: 'kit-talheres',
    colecao: 'mesa',
    nome: 'Kit Talheres Bioplástico',
    subtitulo: 'Linha Mesa',
    descricao: 'Garfo, faca e colher biodegradáveis, com toque firme.',
    descricaoLonga:
      'Garfo, faca e colher em PLA de milho, com peso e rigidez próximos aos do talher convencional. Sem aquele estalo do plástico barato: o cabo tem nervura interna que evita a quebra no meio da refeição.',
    imagens: ['/img/talher.webp'],
    destaque: true,
    variantes: [
      { sku: 'TLH-KIT-050', rotulo: 'Caixa 50 kits', unidades: 50, preco: 74.0, estoque: 210 },
      { sku: 'TLH-KIT-200', rotulo: 'Caixa 200 kits', unidades: 200, preco: 268.0, estoque: 74 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA (ácido polilático) de milho' },
      { rotulo: 'Conteúdo', valor: 'Garfo + faca + colher, 16,5 cm' },
      { rotulo: 'Embalagem', valor: 'Sachê individual compostável' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Evitar contato com óleo acima de 85 °C'],
  },
  {
    id: 4,
    slug: 'guardanapos',
    colecao: 'mesa',
    nome: 'Guardanapos Folha Dupla',
    subtitulo: 'Linha Mesa',
    descricao: 'Guardanapos macios de alta absorção, compostáveis.',
    descricaoLonga:
      'Celulose não branqueada de reflorestamento, folha dupla, sem cloro e sem perfume. O tom natural levemente quente combina com a louça da linha Mesa e dispensa impressão.',
    imagens: ['/img/guardanapo.webp'],
    badge: 'eco',
    variantes: [
      { sku: 'GRD-100', rotulo: 'Pacote 100 un.', unidades: 100, preco: 24.0, estoque: 320 },
      { sku: 'GRD-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 98.0, estoque: 118 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Celulose de reflorestamento não branqueada' },
      { rotulo: 'Dimensões', valor: '23 × 23 cm · folha dupla' },
      { rotulo: 'Certificação', valor: 'Livre de cloro elementar (ECF)' },
      { rotulo: 'Descarte', valor: 'Compostável — 60 dias' },
    ],
    cuidados: ['Manter afastado de umidade'],
  },
  {
    id: 5,
    slug: 'bandeja-buffet',
    colecao: 'mesa',
    nome: 'Bandeja para Buffet',
    subtitulo: 'Linha Mesa',
    descricao: 'Bandeja rígida para servir em eventos e self-service.',
    descricaoLonga:
      'Estrutura reforçada nas bordas para carregar pratos cheios sem flexionar. Pensada para self-service, coffee breaks e eventos de grande volume, onde o empilhamento e a resistência importam mais que qualquer outra coisa.',
    imagens: ['/img/prato.webp'],
    variantes: [
      { sku: 'BDJ-025', rotulo: 'Caixa 25 un.', unidades: 25, preco: 118.0, estoque: 64 },
      { sku: 'BDJ-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 425.0, estoque: 21 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana + PLA' },
      { rotulo: 'Dimensões', valor: '35 × 25 × 2 cm' },
      { rotulo: 'Carga máxima', valor: '2,5 kg' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Empilhável', 'Não usar em forno convencional'],
  },

  // ---------- Copos & Bebidas ----------
  {
    id: 6,
    slug: 'copo-200',
    colecao: 'bebidas',
    nome: 'Copo 200 ml',
    subtitulo: 'Linha Bebidas',
    descricao: 'Copo transparente para bebidas frias, sem herança fóssil.',
    descricaoLonga:
      'Transparência de vidro, peso de pluma. O PLA cristal mantém a bebida à vista — importante para sucos e drinks — e não transfere gosto. Encaixe universal para tampa e canudo da mesma linha.',
    imagens: ['/img/copo.webp'],
    badge: 'best',
    destaque: true,
    variantes: [
      { sku: 'CP200-050', rotulo: 'Pacote 50 un.', unidades: 50, preco: 42.0, estoque: 260 },
      { sku: 'CP200-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 78.0, estoque: 132 },
      { sku: 'CP200-1000', rotulo: 'Fardo 1.000 un.', unidades: 1000, preco: 690.0, estoque: 18 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA cristal de origem vegetal' },
      { rotulo: 'Capacidade', valor: '200 ml · boca 78 mm' },
      { rotulo: 'Temperatura', valor: 'Bebidas frias até 40 °C' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Não usar com bebidas quentes'],
  },
  {
    id: 7,
    slug: 'copo-400',
    colecao: 'bebidas',
    nome: 'Copo 400 ml',
    subtitulo: 'Linha Bebidas',
    descricao: 'Maior volume para sucos, refrigerantes e drinks.',
    descricaoLonga:
      'A versão longa do copo cristal, com nervura de reforço na base para aguentar gelo e agitação. Formato afunilado que empilha sem travar — detalhe que economiza minutos no balcão em dia cheio.',
    imagens: ['/img/copo.webp'],
    variantes: [
      { sku: 'CP400-050', rotulo: 'Pacote 50 un.', unidades: 50, preco: 56.0, estoque: 180 },
      { sku: 'CP400-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 104.0, estoque: 92 },
      { sku: 'CP400-1000', rotulo: 'Fardo 1.000 un.', unidades: 1000, preco: 920.0, estoque: 9 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA cristal de origem vegetal' },
      { rotulo: 'Capacidade', valor: '400 ml · boca 90 mm' },
      { rotulo: 'Temperatura', valor: 'Bebidas frias até 40 °C' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Empilhável', 'Não usar com bebidas quentes'],
  },
  {
    id: 8,
    slug: 'tampa-copo',
    colecao: 'bebidas',
    nome: 'Tampa para Copo',
    subtitulo: 'Linha Bebidas',
    descricao: 'Tampa encaixável antivazamento, compatível com canudo.',
    descricaoLonga:
      'Encaixe com trava audível e furo central para canudo. Testada em transporte de delivery com copo cheio na horizontal — a vedação segura. Compatível com os copos de 200 e 400 ml da linha.',
    imagens: ['/img/copo.webp'],
    variantes: [
      { sku: 'TMP-100', rotulo: 'Pacote 100 un.', unidades: 100, preco: 38.0, estoque: 240 },
      { sku: 'TMP-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 170.0, estoque: 66 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA de origem vegetal' },
      { rotulo: 'Compatibilidade', valor: 'Copos 200 ml e 400 ml (boca 78–90 mm)' },
      { rotulo: 'Vedação', valor: 'Trava por pressão · furo para canudo' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único'],
  },
  {
    id: 9,
    slug: 'canudo-biodegradavel',
    colecao: 'bebidas',
    nome: 'Canudo Biodegradável',
    subtitulo: 'Linha Bebidas',
    descricao: 'Canudos resistentes que não amolecem na bebida.',
    descricaoLonga:
      'O problema do canudo de papel é conhecido: amolece em cinco minutos. Este não. A parede em PLA mantém a rigidez do início ao fim da bebida, inclusive em líquidos gelados e ácidos.',
    imagens: ['/img/tubo.webp', '/img/copo.webp'],
    badge: 'eco',
    variantes: [
      { sku: 'CND-100', rotulo: 'Pacote 100 un.', unidades: 100, preco: 29.0, estoque: 340 },
      { sku: 'CND-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 128.0, estoque: 112 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA de origem vegetal' },
      { rotulo: 'Dimensões', valor: '21 cm × Ø 6 mm' },
      { rotulo: 'Embalagem', valor: 'Sachê individual compostável' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Bebidas até 40 °C'],
  },
  {
    id: 10,
    slug: 'copo-termico-300',
    colecao: 'bebidas',
    nome: 'Copo Térmico 300 ml',
    subtitulo: 'Linha Bebidas',
    descricao: 'Parede dupla para café e bebidas quentes, sem cinta.',
    descricaoLonga:
      'Parede dupla que dispensa a cinta de papelão: segura na mão sem queimar e mantém a temperatura por mais tempo. O revestimento interno é de PLA, não de polietileno — por isso a peça inteira é compostável.',
    imagens: ['/img/copo.webp'],
    badge: 'novo',
    destaque: true,
    variantes: [
      { sku: 'CPT300-050', rotulo: 'Pacote 50 un.', unidades: 50, preco: 68.0, estoque: 150 },
      { sku: 'CPT300-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 590.0, estoque: 24 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Cartão de reflorestamento + revestimento PLA' },
      { rotulo: 'Capacidade', valor: '300 ml · parede dupla' },
      { rotulo: 'Temperatura', valor: 'Até 85 °C' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Não usar em micro-ondas'],
  },

  // ---------- Delivery & Viagem ----------
  {
    id: 11,
    slug: 'marmita-500',
    colecao: 'delivery',
    nome: 'Marmita 500 ml',
    subtitulo: 'Linha Delivery',
    descricao: 'Embalagem térmica para transporte seguro de refeições.',
    descricaoLonga:
      'A porção individual do delivery. Tampa articulada com trava lateral, canaleta que retém o molho e superfície que aceita etiqueta sem descolar. Vai do balcão ao micro-ondas do cliente sem transferir a refeição de recipiente.',
    imagens: ['/img/embalagem.png', '/img/embalagemdois.jpeg'],
    badge: 'best',
    destaque: true,
    variantes: [
      { sku: 'MRM500-050', rotulo: 'Caixa 50 un.', unidades: 50, preco: 96.0, estoque: 190 },
      { sku: 'MRM500-200', rotulo: 'Caixa 200 un.', unidades: 200, preco: 349.0, estoque: 78 },
      { sku: 'MRM500-500', rotulo: 'Fardo 500 un.', unidades: 500, preco: 820.0, estoque: 16 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana-de-açúcar (bagaço) 100%' },
      { rotulo: 'Capacidade', valor: '500 ml · 17 × 12 × 5 cm' },
      { rotulo: 'Vedação', valor: 'Tampa articulada com trava' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Micro-ondas até 3 min', 'Freezer até -20 °C'],
  },
  {
    id: 12,
    slug: 'marmita-750',
    colecao: 'delivery',
    nome: 'Marmita 750 ml',
    subtitulo: 'Linha Delivery',
    descricao: 'Porção maior, com tampa de vedação reforçada.',
    descricaoLonga:
      'Para pratos executivos e porções duplas. Mesma família da 500 ml, com fundo mais alto e reforço extra na dobradiça — a parte que costuma ceder quando a embalagem sai quente e cheia.',
    imagens: ['/img/embalagem.png', '/img/embalagemdois.jpeg'],
    variantes: [
      { sku: 'MRM750-050', rotulo: 'Caixa 50 un.', unidades: 50, preco: 118.0, estoque: 140 },
      { sku: 'MRM750-200', rotulo: 'Caixa 200 un.', unidades: 200, preco: 429.0, estoque: 52 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana-de-açúcar (bagaço) 100%' },
      { rotulo: 'Capacidade', valor: '750 ml · 19 × 14 × 6 cm' },
      { rotulo: 'Vedação', valor: 'Tampa articulada reforçada' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Micro-ondas até 3 min', 'Freezer até -20 °C'],
  },
  {
    id: 13,
    slug: 'pote-250',
    colecao: 'delivery',
    nome: 'Pote 250 ml com Tampa',
    subtitulo: 'Linha Delivery',
    descricao: 'Para molhos, saladas e acompanhamentos.',
    descricaoLonga:
      'O acompanhamento que chega inteiro. Rosca de meia-volta que não abre no transporte, corpo translúcido para identificar o conteúdo e boca larga para servir direto do pote.',
    imagens: ['/img/embalagem.png'],
    variantes: [
      { sku: 'PT250-100', rotulo: 'Caixa 100 un.', unidades: 100, preco: 128.0, estoque: 210 },
      { sku: 'PT250-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 560.0, estoque: 44 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PLA de origem vegetal' },
      { rotulo: 'Capacidade', valor: '250 ml · Ø 9,5 cm' },
      { rotulo: 'Vedação', valor: 'Tampa de rosca meia-volta' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Não usar em micro-ondas'],
  },
  {
    id: 14,
    slug: 'sacola-compostavel',
    colecao: 'delivery',
    nome: 'Sacola Compostável',
    subtitulo: 'Linha Delivery',
    descricao: 'Sacola resistente que se decompõe após o uso.',
    descricaoLonga:
      'Alça vazada reforçada, fole lateral e carga de até 6 kg. Feita de amido de mandioca — ao contrário das sacolas "oxi", não se fragmenta em microplástico: ela se decompõe de fato.',
    imagens: ['/img/embalagemdois.jpeg', '/img/embalagem.png'],
    badge: 'eco',
    variantes: [
      { sku: 'SCL-100', rotulo: 'Pacote 100 un.', unidades: 100, preco: 86.0, estoque: 260 },
      { sku: 'SCL-500', rotulo: 'Caixa 500 un.', unidades: 500, preco: 380.0, estoque: 58 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Amido de mandioca (bioplástico)' },
      { rotulo: 'Dimensões', valor: '30 × 40 cm · fole 8 cm' },
      { rotulo: 'Carga máxima', valor: '6 kg' },
      { rotulo: 'Descarte', valor: 'Compostável — 120 dias' },
    ],
    cuidados: ['Não expor ao sol por longos períodos', 'Armazenar em local seco'],
  },
  {
    id: 15,
    slug: 'filme-protetor',
    colecao: 'delivery',
    nome: 'Filme Protetor Compostável',
    subtitulo: 'Linha Delivery',
    descricao: 'Filme aderente de origem vegetal para cozinha e transporte.',
    descricaoLonga:
      'Substitui o filme de PVC no fechamento de bandejas e potes. Adere bem em vidro, fibra e bioplástico, resiste ao frio da câmara e sai do rolo sem grudar em si mesmo.',
    imagens: ['/img/filmeprotetor.webp'],
    badge: 'novo',
    variantes: [
      { sku: 'FLM-030', rotulo: 'Rolo 30 m', unidades: 1, preco: 42.0, estoque: 180 },
      { sku: 'FLM-100', rotulo: 'Rolo 100 m', unidades: 1, preco: 118.0, estoque: 74 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'PBAT + amido vegetal' },
      { rotulo: 'Largura', valor: '30 cm' },
      { rotulo: 'Temperatura', valor: '-20 °C a 60 °C' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Não usar em forno', 'Armazenar longe de fontes de calor'],
  },
  {
    id: 16,
    slug: 'bandeja-delivery-divisorias',
    colecao: 'delivery',
    nome: 'Bandeja 3 Divisórias',
    subtitulo: 'Linha Delivery',
    descricao: 'Compartimentos separados para prato completo.',
    descricaoLonga:
      'Três compartimentos com altura de parede suficiente para o arroz não invadir a salada. Feita para marmitex de restaurante e refeição corporativa, com tampa opcional vendida à parte.',
    imagens: ['/img/embalagem.png', '/img/embalagemdois.jpeg'],
    variantes: [
      { sku: 'BDV3-050', rotulo: 'Caixa 50 un.', unidades: 50, preco: 108.0, estoque: 130 },
      { sku: 'BDV3-200', rotulo: 'Caixa 200 un.', unidades: 200, preco: 398.0, estoque: 40 },
    ],
    ficha: [
      { rotulo: 'Composição', valor: 'Fibra de cana-de-açúcar (bagaço) 100%' },
      { rotulo: 'Dimensões', valor: '26 × 20 × 4 cm · 3 divisórias' },
      { rotulo: 'Resistência', valor: 'Micro-ondas e freezer' },
      { rotulo: 'Descarte', valor: 'Compostável — 180 dias' },
    ],
    cuidados: ['Uso único', 'Empilhável'],
  },
];

// ------------------------------------------------------------
// Coleções
// ------------------------------------------------------------
export const collections: Collection[] = [
  {
    slug: 'mesa',
    path: '/colecoes/mesa',
    indice: '01',
    titulo: 'Mesa & Servir',
    headline: 'Mesa & Servir',
    descricao:
      'Pratos, talheres, guardanapos e bandejas que vestem a mesa com requinte e voltam à terra sem deixar rastro.',
    resumo: 'Pratos, talheres, guardanapos e bandejas para eventos, buffets e o dia a dia.',
    destaque: 'Eventos & buffet',
    capa: '/img/prato.webp',
  },
  {
    slug: 'bebidas',
    path: '/colecoes/bebidas',
    indice: '02',
    titulo: 'Copos & Bebidas',
    headline: 'Copos & Bebidas',
    descricao:
      'Copos, tampas e canudos para bebidas quentes e frias, com o desempenho do plástico convencional e origem renovável.',
    resumo: 'Copos, tampas e canudos para cafeterias, bares e food service.',
    destaque: 'Cafeterias',
    capa: '/img/copo.webp',
  },
  {
    slug: 'delivery',
    path: '/colecoes/delivery',
    indice: '03',
    titulo: 'Delivery & Viagem',
    headline: 'Delivery & Viagem',
    descricao:
      'Marmitas, potes e sacolas térmicas para transportar refeições com segurança — do preparo à entrega.',
    resumo: 'Marmitas, potes e sacolas para delivery, take-away e viagem.',
    destaque: 'Food service',
    capa: '/img/embalagem.png',
  },
];

export const collectionLabels: Record<CollectionSlug, string> = {
  mesa: 'Mesa',
  bebidas: 'Bebidas',
  delivery: 'Delivery',
};

// ------------------------------------------------------------
// Regras da loja
// ------------------------------------------------------------
export const shop = {
  /** Frete grátis a partir deste subtotal */
  freteGratisAcima: 500,
  freteFixo: 39.9,
  freteExpresso: 79.9,
  /** Parcelamento sem juros */
  parcelas: 6,
  /** Desconto à vista no Pix — anunciado no checkout e aplicado no total */
  descontoPix: 0.05,
  /** Cupons aceitos no carrinho e no checkout (percentual sobre o subtotal) */
  cupons: [
    { codigo: 'CIBELE10', desconto: 0.1, rotulo: '10% na primeira compra' },
    { codigo: 'ECO15', desconto: 0.15, rotulo: '15% acima de R$ 1.000' , minimo: 1000 },
  ] as { codigo: string; desconto: number; rotulo: string; minimo?: number }[],
};

// ------------------------------------------------------------
// Helpers
// ------------------------------------------------------------
export function getProductsByCollection(slug: CollectionSlug): Product[] {
  return products.filter((product) => product.colecao === slug);
}

export function getCollection(slug: CollectionSlug): Collection {
  const collection = collections.find((item) => item.slug === slug);
  if (!collection) throw new Error(`Coleção desconhecida: ${slug}`);
  return collection;
}

export function getProduct(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

/** Menor preço entre as variantes — é o preço "a partir de" da vitrine. */
export function precoBase(product: Product): number {
  return Math.min(...product.variantes.map((v) => v.preco));
}

/** Preço por unidade da menor variante — argumento de venda B2B. */
export function precoUnitario(product: Product): number {
  const v = product.variantes.reduce((a, b) => (a.preco / a.unidades < b.preco / b.unidades ? a : b));
  return v.preco / v.unidades;
}

export function relacionados(product: Product, limite = 4): Product[] {
  const mesmaColecao = products.filter(
    (p) => p.colecao === product.colecao && p.slug !== product.slug,
  );
  const outros = products.filter((p) => p.colecao !== product.colecao && p.slug !== product.slug);
  return [...mesmaColecao, ...outros].slice(0, limite);
}

export function destaques(limite = 4): Product[] {
  const marcados = products.filter((p) => p.destaque);
  return (marcados.length >= limite ? marcados : [...marcados, ...products]).slice(0, limite);
}

export function novidades(limite = 4): Product[] {
  return [...products]
    .sort((a, b) => (b.badge === 'novo' ? 1 : 0) - (a.badge === 'novo' ? 1 : 0) || b.id - a.id)
    .slice(0, limite);
}

export function formatPrice(value: number): string {
  return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

/** Índice enxuto usado pela busca no cliente (embutido como JSON). */
export function searchIndex() {
  return products.map((p) => ({
    slug: p.slug,
    nome: p.nome,
    colecao: p.colecao,
    colecaoLabel: collectionLabels[p.colecao],
    descricao: p.descricao,
    preco: precoBase(p),
    imagem: p.imagens[0],
    termos: [p.nome, p.subtitulo, p.descricao, collectionLabels[p.colecao], ...p.ficha.map((f) => f.valor)]
      .join(' ')
      .toLowerCase(),
  }));
}

/** Catálogo mínimo entregue ao cliente para carrinho/checkout. */
export function cartCatalog() {
  return products.flatMap((p) =>
    p.variantes.map((v) => ({
      sku: v.sku,
      slug: p.slug,
      nome: p.nome,
      variante: v.rotulo,
      unidades: v.unidades,
      preco: v.preco,
      estoque: v.estoque,
      imagem: p.imagens[0],
      colecao: collectionLabels[p.colecao],
    })),
  );
}

export const stats = [
  { valor: 100, sufixo: '%', rotulo: 'Matéria-prima de origem renovável' },
  { valor: 16, rotulo: 'Referências em linha, prontas para envio' },
  { valor: 180, sufixo: ' dias', rotulo: 'Para decompor — contra séculos do plástico fóssil' },
  { valor: 80, prefixo: '-', sufixo: '%', rotulo: 'Emissão de CO₂ frente ao plástico fóssil' },
];
