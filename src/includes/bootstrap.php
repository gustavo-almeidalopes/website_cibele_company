<?php

declare(strict_types=1);

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

require_once __DIR__ . '/catalog.php';
require_once __DIR__ . '/cart.php';

initializeCart();
