# Projeto de Gestão de Clientes com Next.js e React

Este é um projeto de gestão de clientes desenvolvido com Next.js, React, Node.js e PostgreSQL.

## Pré-requisitos

Antes de rodar este projeto, é necessário ter o seguinte instalado:

- Node.js (v14.1.2 ou superior)
- PostgreSQL (devidamente configurado e executando)

## Configuração do Banco de Dados

Para criar a tabela necessária no PostgreSQL, execute o seguinte DDL (Data Definition Language):

```sql
CREATE TABLE IF NOT EXISTS clients (
    id      SERIAL PRIMARY KEY,
    name    TEXT    NOT NULL,
    email   TEXT    NOT NULL,
    phone   TEXT    NOT NULL,
    coordx  INTEGER NOT NULL,
    coordy  INTEGER NOT NULL
);
```

## Configuração do Projeto

1. Clone este repositório em sua máquina local.
2. Navegue até o diretório raiz do projeto.

## Configuração do PostgreSQL

1. No diretório src/config, edite o arquivo postgres.json para adicionar o nome do usuário e a senha de acesso ao PostgreSQL.

## Instalação de Dependências

Execute o seguinte comando para instalar as dependências do projeto:

```bash
npm install
```

## Rodando o Projeto

Após configurar o banco de dados e instalar as dependências, você pode rodar o projeto com o seguinte comando:

```bash
npm run dev
```

Isso iniciará o servidor Next.js localmente. Você pode acessar o projeto no navegador em [http://localhost:3000](http://localhost:3000).

## Consultando Todos os Clientes

Para consultar todos os clientes diretamente do banco de dados, execute o seguinte comando SQL no PostgreSQL:

```sql
SELECT * FROM clients;
```

## Licença

Este projeto está sob a licença [MIT License](LICENSE).
