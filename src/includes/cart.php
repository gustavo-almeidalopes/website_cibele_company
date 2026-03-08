<?php

declare(strict_types=1);

function initializeCart(): void
{
    if (!isset($_SESSION['carrinho']) || !is_array($_SESSION['carrinho'])) {
        $_SESSION['carrinho'] = [];
    }
}

function addProductToCart(int $productId, int $quantity = 1): void
{
    $product = getProductById($productId);
    if ($product === null || $quantity < 1) {
        return;
    }

    if (!isset($_SESSION['carrinho'][$productId])) {
        $_SESSION['carrinho'][$productId] = 0;
    }

    $_SESSION['carrinho'][$productId] += $quantity;
}

function updateProductQuantity(int $productId, int $quantity): void
{
    if (!isset($_SESSION['carrinho'][$productId])) {
        return;
    }

    if ($quantity <= 0) {
        unset($_SESSION['carrinho'][$productId]);
        return;
    }

    $_SESSION['carrinho'][$productId] = $quantity;
}

function removeProductFromCart(int $productId): void
{
    unset($_SESSION['carrinho'][$productId]);
}

function getCartItemsDetailed(): array
{
    $items = [];

    foreach ($_SESSION['carrinho'] as $productId => $quantity) {
        $product = getProductById((int) $productId);
        if ($product === null) {
            continue;
        }

        $items[] = [
            'id' => $product['id'],
            'nome' => $product['nome'],
            'descricao' => $product['descricao'],
            'preco' => $product['preco'],
            'imagem' => $product['imagem'],
            'quantidade' => (int) $quantity,
            'subtotal' => $product['preco'] * (int) $quantity,
        ];
    }

    return $items;
}

function getCartCount(): int
{
    return array_sum($_SESSION['carrinho']);
}

function getCartTotal(): float
{
    $total = 0;
    foreach (getCartItemsDetailed() as $item) {
        $total += $item['subtotal'];
    }

    return $total;
}

function clearCart(): void
{
    $_SESSION['carrinho'] = [];
}
