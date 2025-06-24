#language: pt

Funcionalidade: Points

  Cenário: envia pontos de um usuário autenticado para outro
    Dado que o usuário tem preencha o body com um cpf cadastrado e autenticado
    Quando enviar uma requisição POST para o endpoint /points/send
    Então o sistema deve retornar status code 200
    E a mensagem "Pontos enviados com sucesso."

  Esquema do Cenário: Erro ao tentar enviar pontos para outro usuário
    Dado que o usuário preencha o body com um "<tipo_de_erro>"
    Quando enviar uma requisição POST para o endpoint /points/send
    Então o sistema deve retornar "<status_code>"
    E a "<mensagem_erro>"

  Exemplos:
    | tipo_de_erro                 | status_code | mensagem_erro                    |
    | valor inválido               | 400         | Valor inválido                   |
    | sem token de autenticação    | 401         | Não autorizado                   |
    | CPF de destinatário inválido | 404         | Usuário destino não encontrado   |

  Cenário: verifica extrato de transações do usuário autenticado
    Dado que o usuário é autenticado e quer visualizar o extrato de transações
    Quando enviar uma requisição GET para o endpoint /points/extrato
    Então o sistema deve retornar status code 200
    E os dados do usuário

  Cenário: tenta verificar extrato de transações com usuário não autenticado
    Dado que o usuário não possui token e quer visualizar o extrato de transações
    Quando enviar uma requisição GET para o endpoint /points/extrato
    Então o sistema deve retornar status code 401
    E e mensagem de erro "Não autorizado"

  Cenário: verifica saldo geral consolidado do usuário autenticado
    Dado que o usuário quer visualizar o saldo geral
    Quando enviar uma requisição GET para o endpoint /points/extrato
    Então o sistema deve retornar status code 200
    E os dados do usuário

  Cenário: tenta verificar saldo geral consolidado com usuário não autenticado
    Dado que o usuário não possui token e quer visualizar o saldo geral consolidado
    Quando enviar uma requisição GET para o endpoint /points/extrato
    Então o sistema deve retornar status code 401
    E e mensagem de erro "Não autorizado"