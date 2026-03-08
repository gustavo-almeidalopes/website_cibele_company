<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (isset($_POST['add_to_cart'])) {
    addProductToCart((int) ($_POST['product_id'] ?? 0), max(1, (int) ($_POST['quantidade'] ?? 1)));
    header('Location: produtos_medicos.php?added=1');
    exit;
}

$products = getProductsByCategory('medicos');
renderHeader('Produtos Médicos', 'medicos');
?>
<main class="page-content">
    <h1>Produtos Médicos</h1>
    <p class="subtitle">Itens confiáveis para clínicas, laboratórios e hospitais.</p>
    <?php if (isset($_GET['added'])): ?><p class="alert success">Produto adicionado ao carrinho.</p><?php endif; ?>
    <?php renderProductGrid($products); ?>
</main>
<?php renderFooter(); ?>
