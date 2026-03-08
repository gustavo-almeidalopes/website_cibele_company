<?php

declare(strict_types=1);

function getCatalog(): array
{
    return [
        1 => ['id' => 1, 'categoria' => 'embalagens', 'nome' => 'Copo Descartável 200ml', 'descricao' => 'Copo plástico sustentável para bebidas frias e quentes.', 'preco' => 10.00, 'imagem' => 'copo.webp'],
        2 => ['id' => 2, 'categoria' => 'embalagens', 'nome' => 'Prato Descartável 18cm', 'descricao' => 'Prato resistente para eventos e refeições rápidas.', 'preco' => 15.00, 'imagem' => 'prato.webp'],
        3 => ['id' => 3, 'categoria' => 'embalagens', 'nome' => 'Kit Talheres Bioplástico', 'descricao' => 'Conjunto com garfo, faca e colher biodegradáveis.', 'preco' => 8.00, 'imagem' => 'talher.webp'],
        4 => ['id' => 4, 'categoria' => 'embalagens', 'nome' => 'Embalagem para Comida 500ml', 'descricao' => 'Embalagem térmica para transporte de refeições.', 'preco' => 20.00, 'imagem' => 'embalagem.png'],
        5 => ['id' => 5, 'categoria' => 'embalagens', 'nome' => 'Guardanapos (50 unidades)', 'descricao' => 'Guardanapos macios com ótima absorção.', 'preco' => 5.00, 'imagem' => 'guardanapo.webp'],
        6 => ['id' => 6, 'categoria' => 'construcao', 'nome' => 'Tubo de Bioplástico para Drenagem', 'descricao' => 'Solução resistente e sustentável para obras.', 'preco' => 120.00, 'imagem' => 'tubo.webp'],
        7 => ['id' => 7, 'categoria' => 'construcao', 'nome' => 'Bloco Estrutural de Bioplástico', 'descricao' => 'Bloco estrutural de alto desempenho para construção verde.', 'preco' => 250.00, 'imagem' => 'bloco.webp'],
        8 => ['id' => 8, 'categoria' => 'construcao', 'nome' => 'Isolante Térmico Biodegradável', 'descricao' => 'Reduz variações térmicas com menor impacto ambiental.', 'preco' => 85.00, 'imagem' => 'isolante.webp'],
        9 => ['id' => 9, 'categoria' => 'construcao', 'nome' => 'Filme Protetor para Janelas', 'descricao' => 'Proteção temporária de superfícies durante reformas.', 'preco' => 60.00, 'imagem' => 'filmeprotetor.webp'],
        10 => ['id' => 10, 'categoria' => 'construcao', 'nome' => 'Formas para Concreto Bioplástico', 'descricao' => 'Formas reutilizáveis e leves para concretagem.', 'preco' => 200.00, 'imagem' => 'formas.jpeg'],
        11 => ['id' => 11, 'categoria' => 'medicos', 'nome' => 'Seringa de Bioplástico 5ml', 'descricao' => 'Seringa com material de fontes renováveis.', 'preco' => 12.00, 'imagem' => 'seringa.webp'],
        12 => ['id' => 12, 'categoria' => 'medicos', 'nome' => 'Luva Cirúrgica Biodegradável', 'descricao' => 'Luvas seguras com composição biodegradável.', 'preco' => 35.00, 'imagem' => 'luva.webp'],
        13 => ['id' => 13, 'categoria' => 'medicos', 'nome' => 'Máscara de Bioplástico', 'descricao' => 'Máscara descartável com menor impacto ambiental.', 'preco' => 10.00, 'imagem' => 'mascara.webp'],
        14 => ['id' => 14, 'categoria' => 'medicos', 'nome' => 'Frasco para Medicamentos 100ml', 'descricao' => 'Frasco reciclável para armazenamento seguro.', 'preco' => 8.00, 'imagem' => 'frasco.png'],
        15 => ['id' => 15, 'categoria' => 'medicos', 'nome' => 'Cápsula de Bioplástico', 'descricao' => 'Cápsulas farmacêuticas feitas com bioplásticos.', 'preco' => 5.00, 'imagem' => 'capsula.png'],
    ];
}

function getProductsByCategory(string $category): array
{
    return array_filter(getCatalog(), static fn(array $product): bool => $product['categoria'] === $category);
}

function getFeaturedProducts(): array
{
    return [
        getCatalog()[7],
        getCatalog()[4],
        getCatalog()[13],
    ];
}

function getProductById(int $id): ?array
{
    $catalog = getCatalog();

    return $catalog[$id] ?? null;
}
