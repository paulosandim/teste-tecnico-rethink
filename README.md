# Teste Técnico Rethink - Testes Automatizados de API

Este projeto contém a automação de testes end-to-end para a API de Bank [Rethink](https://points-app-backend.vercel.app/docs).

É parte de um Teste Técnico para vaga de QA Sênior na empresa **Rethink**.

---

## Funcionalidades Testadas na Automação da API

- Cadastro de um novo usuário
- Confirmação do e-mail do usuário a partir de um token
- Autenticação de um usuário
- Envio de pontos para um usuário
- Deposito de pontos da conta normal para a caixinha do usuário
- Verificação do saldo consolidado do usuário
- Exclusão do usuário

## Casos de Testes 

- Os Casos de teste estão na pasta [features](./features), no formato Gherkin e prontos para serem usados com Cucumber.

- Foram divididos seguindo o modelo do Swagger: Auth, Caixinha e Points.

---

## Tecnologias Utilizadas

- [Jest](http://jestjs.io/)
- [SuperTest](https://www.npmjs.com/package/supertest)
- [Faker](https://fakerjs.dev/)
- [Node.js 22+](https://nodejs.org/en/download)
- [Postman](https://www.postman.com/)
- [Jest HTML Reporter](https://www.npmjs.com/package/jest-html-reporter)

---

## Instalação e execução

### Instalação das dependências:

```
npm install
```

### Execução:

```
npm test
```

---

## Evidências dos Testes

### Execução Completa no Postman:
![evidencias-manual-postman](./evidencias/testes/fluxo-completo-postman.gif)

### Execução Completa no Jest e Relatório HTML:
- O Relatório pode ser encontrado na pasta [reports](./reports), no formato HTML e pronto para ser visualizado após a cada execução.

![evidencias-jest-completo](./evidencias/testes/fluxo-completo-jest.gif)

---

## Bugs

### Bug 01 - Usuário Deletado realizando operações de Cadastro/Criação
### Criticidade: Média

- Após exclusão do usuário, ainda é possível realizar requisições do tipo *POST*, por exemplo, enviar pontos, depositar pontos, etc.
- Mesmo sendo um soft delete, é uma boa prática bloquear operações de cadastro/criação.

**Dados do Usuário:**
```
{
  "cpf": "12345678941",
  "full_name": "João da Silva",
  "email": "joao@mail.com",
  "password": "Senha@123",
  "confirmPassword": "Senha@123"
}
```

**Evidências:**

![evidencias-bug-delete](./evidencias/bugs/bug-usuario-deletado.gif)

---

### Bug 02 - Retorno incorreto ao passar valor 0 como amount na rota /caixinha/deposit
### Criticidade: Média

- Quando o usuário faz a requisição /caixinha/deposit passando o valor 0 no campo amount, está sendo retornado *Status Code 200* e a mensagem *"Depósito na caixinha realizado com sucesso."*.
- O correto seria *Status Code 400* e a mensagem *"Saldo insuficiente ou requisição inválida."*, conforme descrito na documentação que está no [Swagger](https://points-app-backend.vercel.app/docs).

**Evidências:**

![evidencias-bug-zero-deposit](./evidencias/bugs/bug-caixinha-deposit-zero.gif)

---

### Bug 03 - Retorno incorreto ao passar valor 0 como amount na rota /caixinha/withdraw
### Criticidade: Média

- Quando o usuário faz a requisição /caixinha/withdraw passando o valor 0 no campo amount, está sendo retornado *Status Code 200* e a mensagem *"Resgate da caixinha realizado."*.
- O correto seria *Status Code 400* e a mensagem *"Saldo na caixinha insuficiente ou requisição inválida."*, conforme descrito na documentação que está no Swagger.

**Evidências:**

![evidencias-bug-zero-withdraw](./evidencias/bugs/bug-caixinha-withdraw-zero.gif)

---

### Bug 04 - Retorno incorreto ao passar String como amount na rota /caixinha/deposit
### Criticidade: Média

- Quando o usuário faz a requisição /caixinha/deposit passando uma string (vazia ou não) no campo amount, está sendo retornado *Status Code 200* e a mensagem *"Depósito na caixinha realizado com sucesso."*.
- O correto seria *Status Code 400* e a mensagem *"Saldo insuficiente ou requisição inválida."*, conforme descrito na documentação que está no Swagger.

**Evidências:**

![evidencias-bug-string-deposit](./evidencias/bugs/bug-caixinha-deposit-string.gif)

---

### Bug 05 - Retorno incorreto ao passar String como amount na rota /caixinha/withdraw
### Criticidade: Média

- Quando o usuário faz a requisição /caixinha/withdraw passando uma string (vazia ou não) no campo amount, está sendo retornado *Status Code 200* e a mensagem *"Resgate da caixinha realizado."*.
- O correto seria *Status Code 400* e a mensagem *"Saldo na caixinha insuficiente ou requisição inválida."*, conforme descrito na documentação que está no Swagger.

**Evidências:**

![evidencias-bug-string-withdraw](./evidencias/bugs/bug-caixinha-withdraw-string.gif)

---

### Tabela de Criticidade

- Alta: O bug precisa ser corrigido imediatamente, pois representa um risco significativo para o negócio ou para os usuários.

- Média: O bug precisa ser corrigido em breve, mas não representa um risco imediato.

- Baixa: O bug pode ser corrigido em um momento posterior, sem impacto significativo no negócio ou nos usuários.