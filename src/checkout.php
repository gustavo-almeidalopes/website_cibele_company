<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

if (isset($_GET['sucesso'])) {
    renderHeader('Pedido confirmado', '');
    ?>
    <main class="page-content">
        <h1>Pagamento concluído ✅</h1>
        <p class="subtitle">Seu pedido foi registrado com sucesso. Obrigado pela compra!</p>
        <a class="btn" href="embalagens.php">Continuar comprando</a>
    </main>
    <?php
    renderFooter();
    exit;
}

$items = getCartItemsDetailed();
if (empty($items)) {
    header('Location: carrinho.php');
    exit;
}

renderHeader('Checkout', '');
?>
<main class="page-content">
    <h1>Finalizar compra</h1>
    <p class="subtitle">Revise os itens e escolha uma forma de pagamento.</p>

    <?php if (isset($_GET['erro'])): ?><p class="alert error">Selecione um método de pagamento válido.</p><?php endif; ?>

    <div class="table-wrap">
        <table>
            <thead><tr><th>Produto</th><th>Qtd.</th><th>Subtotal</th></tr></thead>
            <tbody>
            <?php foreach ($items as $item): ?>
                <tr>
                    <td><?php echo htmlspecialchars($item['nome']); ?></td>
                    <td><?php echo (int) $item['quantidade']; ?></td>
                    <td>R$ <?php echo number_format((float) $item['subtotal'], 2, ',', '.'); ?></td>
                </tr>
            <?php endforeach; ?>
            </tbody>
        </table>
    </div>

    <p class="total">Total do pedido: <strong>R$ <?php echo number_format(getCartTotal(), 2, ',', '.'); ?></strong></p>

    <form class="checkout-form" action="processar_pagamento.php" method="post">
        <label><input type="radio" name="pagamento" value="pix" required> Pix</label>
        <label><input type="radio" name="pagamento" value="cartao"> Cartão de Crédito</label>
        <label><input type="radio" name="pagamento" value="boleto"> Boleto</label>
        <button type="submit">Confirmar pagamento</button>
    </form>
</main>
<?php renderFooter(); ?>
