<?php

declare(strict_types=1);

require_once __DIR__ . '/includes/bootstrap.php';
require_once __DIR__ . '/includes/layout.php';

renderHeader('Contato', 'contato');
?>
<main class="page-content narrow">
    <h1>Fale com a Cibele Plastic</h1>
    <p class="subtitle">Dúvidas, sugestões ou orçamento? Envie sua mensagem.</p>

    <?php if (isset($_GET['status']) && $_GET['status'] === 'ok'): ?>
        <p class="alert success">Mensagem enviada com sucesso! Em breve entraremos em contato.</p>
    <?php elseif (isset($_GET['status']) && $_GET['status'] === 'erro'): ?>
        <p class="alert error">Não foi possível enviar sua mensagem agora. Tente novamente.</p>
    <?php endif; ?>

    <form class="contact-form" action="processa_contato.php" method="post">
        <label for="nome">Nome</label>
        <input id="nome" type="text" name="nome" required>

        <label for="email">E-mail</label>
        <input id="email" type="email" name="email" required>

        <label for="mensagem">Mensagem</label>
        <textarea id="mensagem" name="mensagem" rows="6" required></textarea>

        <button type="submit">Enviar mensagem</button>
    </form>
</main>
<?php renderFooter(); ?>
