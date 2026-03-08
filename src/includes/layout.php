<?php

declare(strict_types=1);

function renderHeader(string $title, string $currentPage, string $pathPrefix = '..', string $pagePrefix = ''): void
{
    $cartCount = getCartCount();
    $pages = [
        'home' => ['label' => 'Início', 'href' => $pathPrefix . '/index.php'],
        'embalagens' => ['label' => 'Embalagens', 'href' => $pagePrefix . 'embalagens.php'],
        'medicos' => ['label' => 'Produtos Médicos', 'href' => $pagePrefix . 'produtos_medicos.php'],
        'construcao' => ['label' => 'Construção Civil', 'href' => $pagePrefix . 'construcao.php'],
        'contato' => ['label' => 'Contato', 'href' => $pagePrefix . 'form.php'],
        'membros' => ['label' => 'Sobre Nós', 'href' => $pagePrefix . 'membros.php'],
    ];
    ?>
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title><?php echo htmlspecialchars($title); ?></title>
        <link rel="icon" type="image/png" href="<?php echo htmlspecialchars($pathPrefix); ?>/assets/img/faviconum.png">
        <link rel="stylesheet" href="<?php echo htmlspecialchars($pathPrefix); ?>/assets/css/app.css">
    </head>
    <body>
    <header class="site-header">
        <div class="topbar">
            <a href="<?php echo htmlspecialchars($pathPrefix); ?>/index.php" class="brand">
                <img src="<?php echo htmlspecialchars($pathPrefix); ?>/assets/img/alternativelogo.png" alt="Cibele Plastic">
            </a>
            <a class="cart-link" href="<?php echo htmlspecialchars($pagePrefix); ?>carrinho.php">🛒 Carrinho <span><?php echo $cartCount; ?></span></a>
        </div>
        <nav class="main-nav">
            <?php foreach ($pages as $key => $page): ?>
                <?php $isActive = $currentPage === $key; ?>
                <a class="<?php echo $isActive ? 'active' : ''; ?>" href="<?php echo htmlspecialchars($page['href']); ?>">
                    <?php echo htmlspecialchars($page['label']); ?>
                </a>
            <?php endforeach; ?>
        </nav>
    </header>
    <?php
}

function renderFooter(string $pathPrefix = '..'): void
{
    ?>
    <footer class="site-footer">
        <p>© <?php echo date('Y'); ?> Cibele Plastic — soluções sustentáveis para cada segmento.</p>
        <a href="<?php echo htmlspecialchars($pathPrefix); ?>/documents/cookiesphp.pdf" target="_blank" rel="noopener noreferrer">Política de Cookies</a>
    </footer>
    </body>
    </html>
    <?php
}

function renderProductGrid(array $products): void
{
    echo '<div class="product-grid">';
    foreach ($products as $product) {
        echo '<article class="product-card">';
        echo '<img src="../assets/img/' . htmlspecialchars($product['imagem']) . '" alt="' . htmlspecialchars($product['nome']) . '">';
        echo '<h3>' . htmlspecialchars($product['nome']) . '</h3>';
        echo '<p>' . htmlspecialchars($product['descricao']) . '</p>';
        echo '<div class="price">R$ ' . number_format((float) $product['preco'], 2, ',', '.') . '</div>';
        echo '<form method="post">';
        echo '<input type="hidden" name="product_id" value="' . (int) $product['id'] . '">';
        echo '<input type="number" name="quantidade" value="1" min="1">';
        echo '<button type="submit" name="add_to_cart">Adicionar</button>';
        echo '</form>';
        echo '</article>';
    }
    echo '</div>';
}
