#language: pt

Funcionalidade: Caixinha

  Cenário: deposita pontos da conta normal para a caixinha do usuário
    Dado que o usuário esteja autenticado e com o amount preenchido no body
    Quando enviar uma requisição POST para o endpoint /caixinha/deposit
    Então o sistema deve retornar status code 200
    E a mensagem "Depósito na caixinha realizado."

  Cenário: resgata pontos da caixinha para a conta normal do usuário
    Dado que o usuário esteja autenticado e com o amount preenchido no body
    Quando enviar uma requisição POST para o endpoint /caixinha/withdraw
    Então o sistema deve retornar status code 200
    E a mensagem "Resgate da caixinha realizado."

  Cenário: visualizar extrato de transações da caixinha do usuário autenticado
    Dado que o usuário deseja visualizar o extrato de transações da caixinha
    Quando enviar uma requisição POST para o endpoint /caixinha/extrato
    Então o sistema deve retornar status code 200
    E as informações das transações
