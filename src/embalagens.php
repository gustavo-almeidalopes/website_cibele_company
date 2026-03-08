<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (isset($_POST['add_to_cart'])) {
    addProductToCart((int) ($_POST['product_id'] ?? 0), max(1, (int) ($_POST['quantidade'] ?? 1)));
    header('Location: embalagens.php?added=1');
    exit;
}

$products = getProductsByCategory('embalagens');
renderHeader('Embalagens Descartáveis', 'embalagens');
?>
<main class="page-content">
    <h1>Embalagens Descartáveis</h1>
    <p class="subtitle">Produtos leves, funcionais e com foco em sustentabilidade.</p>
    <?php if (isset($_GET['added'])): ?><p class="alert success">Produto adicionado ao carrinho.</p><?php endif; ?>
    <?php renderProductGrid($products); ?>
</main>
<?php renderFooter(); ?>
