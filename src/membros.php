<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

renderHeader('Sobre Nós', 'membros');
?>
<main class="page-content">
    <h1>Equipe do Projeto</h1>
    <p class="subtitle">Conheça os responsáveis por este e-commerce acadêmico.</p>

    <section class="members-grid">
        <article class="member-card">
            <img src="../assets/img/gustavo.jpg" alt="Gustavo Lopes">
            <h3>Gustavo Lopes</h3>
            <p><strong>RGM:</strong> 3XX83XX8</p>
            <p>Atuação em front-end e back-end, com foco em páginas de produtos e carrinho.</p>
        </article>
        <article class="member-card">
            <img src="../assets/img/matheus.webp" alt="Matheus Souza">
            <h3>Matheus Souza</h3>
            <p><strong>RGM:</strong> 3XX14XX3</p>
            <p>Atuação em back-end, revisão de código e consistência visual entre páginas.</p>
        </article>
    </section>
</main>
<?php renderFooter(); ?>
