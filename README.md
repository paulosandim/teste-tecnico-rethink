# Teste Técnico Rethink - Testes Automatizados de API

Este projeto contém a automação de testes end-to-end para a API de Bank [Rethink](https://points-app-backend.vercel.app/docs).

É parte de um Teste Técnico para vaga de QA Sênior na empresa **Rethink**.

## Funcionalidades Testadas na API

- Cadastro de Usuário com sucesso

## Casos de Testes 

- Os Casos de teste estão na pasta [features](./features), no formato Gherkin e prontos para serem usados com Cucumber.

- Foram dividios seguindo o modelo do Swagger: Auth, Caixinha e Points.

## Tecnologias Utilizadas

- [Jest](http://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Faker](https://fakerjs.dev/)
- [Node.js 22+](https://nodejs.org/en/download)


## Instalação e execução

### Instalação das dependências:

```
npm install
```

### Execução:

```
npm test
```