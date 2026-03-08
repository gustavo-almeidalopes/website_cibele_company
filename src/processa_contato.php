<?php

declare(strict_types=1);

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: form.php');
    exit;
}

$nome = trim((string) ($_POST['nome'] ?? ''));
$email = filter_var((string) ($_POST['email'] ?? ''), FILTER_VALIDATE_EMAIL);
$mensagem = trim((string) ($_POST['mensagem'] ?? ''));

if ($nome === '' || $email === false || $mensagem === '') {
    header('Location: form.php?status=erro');
    exit;
}

$to = 'seuemail@dominio.com';
$subject = 'Contato do site - ' . $nome;
$body = "Nome: {$nome}\nE-mail: {$email}\nMensagem:\n{$mensagem}";
$headers = 'From: ' . $email;

$status = mail($to, $subject, $body, $headers) ? 'ok' : 'erro';
header('Location: form.php?status=' . $status);
exit;
