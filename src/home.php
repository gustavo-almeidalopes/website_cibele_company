<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (isset($_POST['add_to_cart'])) {
    addProductToCart((int) ($_POST['product_id'] ?? 0), max(1, (int) ($_POST['quantidade'] ?? 1)));
    header('Location: index.php?added=1');
    exit;
}

$featuredProducts = getFeaturedProducts();
renderHeader('Cibele Plastic', 'home', '.', 'src/');
?>
<main class="page-content">
    <section class="hero">
        <div>
            <span class="tag">E-commerce sustentável</span>
            <h1>Front-end renovado com navegação integrada em PHP</h1>
            <p>Explore produtos de embalagens, construção civil e área médica com carrinho compartilhado entre todas as páginas.</p>
            <a class="btn" href="src/embalagens.php">Começar compras</a>
        </div>
    </section>

    <?php if (isset($_GET['added'])): ?>
        <p class="alert success">Produto adicionado ao carrinho com sucesso.</p>
    <?php endif; ?>

    <section>
        <h2>Destaques da semana</h2>
        <div class="product-grid">
            <?php foreach ($featuredProducts as $product): ?>
                <article class="product-card">
                    <img src="assets/img/<?php echo htmlspecialchars($product['imagem']); ?>" alt="<?php echo htmlspecialchars($product['nome']); ?>">
                    <h3><?php echo htmlspecialchars($product['nome']); ?></h3>
                    <p><?php echo htmlspecialchars($product['descricao']); ?></p>
                    <div class="price">R$ <?php echo number_format((float) $product['preco'], 2, ',', '.'); ?></div>
                    <form method="post">
                        <input type="hidden" name="product_id" value="<?php echo (int) $product['id']; ?>">
                        <input type="number" name="quantidade" value="1" min="1">
                        <button type="submit" name="add_to_cart">Adicionar</button>
                    </form>
                </article>
            <?php endforeach; ?>
        </div>
    </section>
</main>
<?php renderFooter('.'); ?>
