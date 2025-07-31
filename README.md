## Alunos:
Felipe Muller Schvuchov - fmuller@edu.univali.br

Gabriel Pavan Marquevicz - gabriel.marquevicz@edu.univali.br

Guilherme Mohr dos Santos - guimohrsantos@edu.univali.br

Kauã Betineli Correia - kauabetineli@edu.univali.br

-----------------------------

ONGaniza é uma aplicação que desenvolvida em React + Spring Boot que permite o gerenciamento de doações, estoques, produtos, beneficiários e doadores para organizações não governamentais.

# Frontend

## Tecnologias Utilizadas

- [React 19](https://react.dev/)
- [React Router DOM](https://reactrouter.com/)
- CSS Modules

---

## Como rodar o projeto

1. **Pré-requisitos:**  
   - Node.js (recomendado: versão 18 ou superior)
   - npm ou yarn

2. **Instale as dependências:**
   ```bash
   npm install
   # ou
   yarn install

3. **Inicie o Servidor**
    ```bash
    npm run dev
    #ou 
    yarn dev

-----------------------------

# Backend

## Tecnologias Utilizadas

- Spring Boot 3.4.4
- Spring Data JPA
- PostgreSQL
- Lombok
- MapStruct
- Maven

---

## Como rodar o projeto

Para executar este projeto, você precisará ter instalado:

- [Java Development Kit (JDK) 21](https://www.oracle.com/java/technologies/downloads/#java21)
- [Maven](https://maven.apache.org/download.cgi) (3.8.1 ou superior)
- [PostgreSQL](https://www.postgresql.org/download/) (versão 12 ou superior)
- [Git](https://git-scm.com/downloads) (opcional, para clonar o repositório)

---

## Configuração do Banco de Dados

1. Instale o PostgreSQL seguindo as instruções do site oficial
2. Crie um banco de dados chamado `ONGaniza`:
   ```sql
   CREATE DATABASE "ONGaniza";
   ```
3. Por padrão, a aplicação usa as seguintes configurações de conexão:
   - URL: `jdbc:postgresql://localhost:5432/ONGaniza`
   - Usuário: `postgres`
   - Senha: `postgres`

Se você precisar alterar essas configurações, edite o arquivo `src/main/resources/application.yml`.

---

## Instalação e Execução

1. Clone o repositório (ou baixe o código-fonte):
   ```bash
   git clone <url-do-repositorio>
   ```

2. Navegue até o diretório do projeto:
   ```bash
   cd onganiza/backend
   ```

3. Compile o projeto usando Maven:
   ```bash
   mvn clean install
   ```

4. Execute a aplicação:
   ```bash
   mvn spring-boot:run
   ```

A aplicação estará disponível em `http://localhost:8080`.

---

## Criação de um usuário inicial

Abra o pgAdmin, e em uma nova Query para o banco de Dados ONGaniza, faça a inserção do seguinte registro válido para utilização do sistema:

INSERT INTO usuario (nome, cpf, senha, data_nascimento, endereco, setor, tipo_usuario, data_cadastro, data_atualizacao) 
VALUES (
    'Administrador Sistema',
    '12345678900',
    'senha123',
    '1990-01-01',
    'Rua Exemplo, 123 - Cidade',
    'COORDENACAO',
    'ADMINISTRADOR',
    CURRENT_TIMESTAMP,
    CURRENT_TIMESTAMP
);


---

## Estrutura do Projeto

O projeto segue uma arquitetura em camadas:

- **Controller**: Responsável por receber as requisições HTTP e retornar as respostas
- **Service**: Contém a lógica de negócio da aplicação
- **Repository**: Responsável pela comunicação com o banco de dados
- **Entity**: Representa as entidades do domínio
- **DTO**: Objetos de transferência de dados

---

## Licença

Este projeto foi desenvolvido para fins educacionais.
