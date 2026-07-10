# Projeto de E-commerce em PHP

Este é um projeto acadêmico de **E-commerce** desenvolvido utilizando **PHP**, **MySQL**, **HTML**, **CSS**, **JavaScript** e outras tecnologias web. O objetivo do projeto é criar uma plataforma online onde os usuários podem visualizar produtos, adicioná-los ao carrinho e realizar compras. Além disso, administradores têm a capacidade de gerenciar o catálogo de produtos.

> 🌿 **Novo front-end (Astro + Anime.js):** foi adicionada uma camada de apresentação moderna e
> animada na pasta [`frontend/`](frontend/README.md), com tipografia Montserrat e design eco-tech.
> O back-end em PHP (`src/`) permanece intacto. Para rodar: `cd frontend && npm install && npm run dev`.

## Sumário

- [Descrição do Projeto](#descrição-do-projeto)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Como Executar o Projeto](#como-executar-o-projeto)
- [Arquivos Importantes](#arquivos-importantes)
- [Licença](#licença)

## Descrição do Projeto

Este projeto foi desenvolvido para simular uma plataforma de e-commerce. Ele permite que:
- **Usuários** naveguem pelos produtos, adicionem ao carrinho e finalizem compras.
- **Administradores** tenham acesso para gerenciar os produtos (criar, editar e excluir produtos) e ver os pedidos realizados.
- **Recursos adicionais** incluem login de administrador, página de contato e informações sobre o e-commerce.

## Funcionalidades

- **Cadastro de produtos**: Administradores podem adicionar novos produtos, incluindo nome, descrição, preço e imagem.
- **Visualização de produtos**: Usuários podem visualizar uma lista de produtos disponíveis para compra.
- **Carrinho de compras**: Usuários podem adicionar itens ao carrinho, ver o resumo da compra e finalizar o pedido.
- **Login de Administrador**: Apenas administradores têm acesso à interface de administração para gerenciar os produtos.
- **Busca de produtos**: Usuários podem buscar por produtos utilizando filtros como nome e preço.

## Tecnologias Utilizadas

- **PHP**: Lógica do servidor para processar as requisições do usuário.
- **MySQL**: Banco de dados utilizado para armazenar informações sobre produtos, usuários e pedidos.
- **HTML/CSS**: Para estruturar e estilizar o site.
- **JavaScript/jQuery**: Para interatividade e manipulação do DOM (exemplo: adicionar itens ao carrinho sem recarregar a página).
- **Bootstrap**: Framework CSS utilizado para criar um design responsivo e amigável.
- **XAMPP/WAMP/MAMP**: Usado para configurar um servidor local de PHP e MySQL.

## Estrutura do Projeto

A estrutura de diretórios do projeto está organizada da seguinte forma:
<pre>
  meu_projeto_academico/
├── assets/                          # Arquivos estáticos (CSS, JS, imagens, fontes)
│   ├── css/                         # Arquivos CSS
│   │   ├── style1.css
│   │   ├── style2.css
│   │   └── ...
│   ├── js/                          # Arquivos JavaScript
│   │   └── script.js
│   ├── img/                         # Arquivos de imagem
│   │   ├── imagem1.jpg
│   │   ├── imagem2.png
│   │   └── ...
│   └── fonts/                       # Fontes, caso haja (opcional)
│       └── font1.woff
├── documents/                       # Arquivos de documentos (PDF, TXT, etc.)
│   ├── documento.pdf
│   └── informacoes.txt
├── src/                             # Arquivos PHP principais
│   ├── home.php
│   ├── contato.php
│   ├── sobre.php
│   ├── login.php
│   └── ... 
├── includes/                        # Arquivos de inclusão (header, footer, conexões de banco de dados)
│   ├── header.php
│   ├── footer.php
│   └── db_connection.php
├── config/                          # Arquivos de configuração (se necessário)
│   └── config.php
├── index.php                        # Arquivo principal de entrada
└── README.md                        # Descrição do projeto
</pre>

---


## Funcionalidades

- **Cadastro de produtos**: A plataforma permite que o administrador cadastre novos produtos com nome, descrição, preço, e imagem.
- **Exibição de produtos**: Os usuários podem visualizar os produtos disponíveis no e-commerce, com informações detalhadas e imagens.
- **Carrinho de compras**: Os usuários podem adicionar produtos ao carrinho e visualizar os itens antes de finalizar a compra.
- **Processamento de pedidos**: Após a compra, o sistema gerencia os pedidos e armazena as informações de forma organizada.
- **Área de login**: O sistema possui uma área de login para que os administradores possam gerenciar o conteúdo da loja.

## Tecnologias Utilizadas

- **PHP**: Para a lógica do servidor.
- **MySQL**: Para o gerenciamento de banco de dados (para armazenar os produtos, usuários, pedidos, etc.).
- **HTML/CSS**: Para a construção e o design do site.
- **JavaScript**: Para funcionalidades interativas no frontend.
- **jQuery**: Para facilitar a manipulação de elementos DOM e chamadas AJAX.
- **Bootstrap**: Para o design responsivo e otimizado do site.

## Como Executar o Projeto

### Pré-requisitos

- Ter o **PHP** instalado em sua máquina.
- Ter um servidor de banco de dados **MySQL** rodando.
- Um servidor local, como o **XAMPP**, **MAMP**, ou **WAMP**, pode ser usado para rodar o servidor PHP e MySQL.

### Passos para execução:

1. **Clone o repositório:**

   ```bash
   git clone https://github.com/gustavo-almeidalopes/meu_projeto_academico.git

 2 ● Instalar o banco de dados:
     ● Crie um banco de dados no MySQL (exemplo: ecommerce).
     ● Importe o arquivo SQL com a estrutura do banco de dados (caso você tenha um arquivo .sqlpara isso).

3 ● Configure uma conexão ao banco de dados:
No arquivo config/config.php, defina as credenciais do seu banco de dados MySQL.

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', '');
define('DB_NAME', 'ecommerce');

4 ● Iniciar ou servidor local:
Se você estiver usando XAMPP, MAMP ou WAMP, inicie o servidor Apache e MySQL.

5 ● Acesse o projeto:
Abra o navegador e vá até http://localhost/meu_projeto_academico/.

---

<pre>
Arquivos Importantes
   ● index.php: Arquivo principal da página inicial.
   ● config/config.php: Arquivo de configuração do banco de dados.
   ● src/home.php: Página inicial do site com a listagem dos produtos.
   ● src/login.php: Página de login para administradores.
   ● src/contato.php: Página de contato.
   ● includes/header.phpe includes/footer.php: Arquivos que contêm o cabeçalho e rodapé do site.
</pre>

---

Contribuições
Caso queira contribuir para o projeto, sinta-se à vontade para fazer um fork e criar uma pull request. Ficarei feliz em revisar suas sugestões e melhorias!

---

Considerações Finais
Este projeto é uma base simples de um sistema de E-commerce em PHP. Ele pode ser expandido com funcionalidades como login de usuários, administração de pedidos, processamento de pagamentos e muito mais. Sinta-se à vontade para melhorar e personalizar o sistema conforme necessário.


### Explicação do `README.md`:

1. **Título e Descrição do Projeto**: Descreve o propósito do projeto de forma clara.
2. **Estrutura do Projeto**: Apresenta uma visão geral da organização do código, com as pastas e arquivos principais.
3. **Funcionalidades**: Lista as funcionalidades principais do e-commerce, como cadastro de produtos, carrinho de compras, login de administrador etc.
4. **Tecnologias Utilizadas**: Especifica as tecnologias e frameworks utilizados para construir o site.
5. **Como Executar o Projeto**: Fornece instruções claras para rodar o projeto em ambiente local, desde o clone do repositório até a configuração do banco de dados.
6. **Arquivos Importantes**: Destaca os arquivos-chave do projeto e suas funções.
7. **Contribuições**: Convida outras pessoas a contribuir com melhorias no projeto.
8. **Licença**: Informa sobre a licença do projeto.

Esse `README.md` proporciona um guia completo para qualquer pessoa entender o projeto e começar a usá-lo ou contribuir com melhorias.
