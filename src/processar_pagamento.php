<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';

$pagamento = $_POST['pagamento'] ?? '';
$metodosValidos = ['pix', 'cartao', 'boleto'];

if (!in_array($pagamento, $metodosValidos, true) || getCartCount() === 0) {
    header('Location: checkout.php?erro=1');
    exit;
}

clearCart();
header('Location: checkout.php?sucesso=1');
exit;
