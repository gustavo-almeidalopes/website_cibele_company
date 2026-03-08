<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (isset($_POST['update_item'])) {
    updateProductQuantity((int) ($_POST['product_id'] ?? 0), (int) ($_POST['quantidade'] ?? 1));
    header('Location: carrinho.php');
    exit;
}

if (isset($_POST['remove_item'])) {
    removeProductFromCart((int) ($_POST['product_id'] ?? 0));
    header('Location: carrinho.php');
    exit;
}

$items = getCartItemsDetailed();
$total = getCartTotal();

renderHeader('Carrinho de Compras', '');
?>
<main class="page-content">
    <h1>Seu Carrinho</h1>
    <?php if (empty($items)): ?>
        <p class="subtitle">Seu carrinho está vazio. Adicione produtos para continuar.</p>
        <a class="btn" href="embalagens.php">Ver produtos</a>
    <?php else: ?>
        <div class="table-wrap">
            <table>
                <thead>
                    <tr><th>Produto</th><th>Preço</th><th>Quantidade</th><th>Subtotal</th><th>Ação</th></tr>
                </thead>
                <tbody>
                    <?php foreach ($items as $item): ?>
                        <tr>
                            <td><?php echo htmlspecialchars($item['nome']); ?></td>
                            <td>R$ <?php echo number_format((float) $item['preco'], 2, ',', '.'); ?></td>
                            <td>
                                <form method="post" class="inline-form">
                                    <input type="hidden" name="product_id" value="<?php echo (int) $item['id']; ?>">
                                    <input type="number" min="1" name="quantidade" value="<?php echo (int) $item['quantidade']; ?>">
                                    <button type="submit" name="update_item">Atualizar</button>
                                </form>
                            </td>
                            <td>R$ <?php echo number_format((float) $item['subtotal'], 2, ',', '.'); ?></td>
                            <td>
                                <form method="post">
                                    <input type="hidden" name="product_id" value="<?php echo (int) $item['id']; ?>">
                                    <button class="danger" type="submit" name="remove_item">Remover</button>
                                </form>
                            </td>
                        </tr>
                    <?php endforeach; ?>
                </tbody>
            </table>
        </div>
        <p class="total">Total: <strong>R$ <?php echo number_format($total, 2, ',', '.'); ?></strong></p>
        <a class="btn" href="checkout.php">Ir para checkout</a>
    <?php endif; ?>
</main>
<?php renderFooter(); ?>
