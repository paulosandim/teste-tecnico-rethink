#language: pt

Funcionalidade: Auth

  Cenário: cadastrar um novo usuário com sucesso
    Dado que o usuário preenche todos os dados obrigatórios corretamente
    Quando enviar uma requisição POST para o endpoint /cadastro
    Então o sistema deve retornar status code 201
    E a mensagem "Cadastro realizado com sucesso."

  Esquema do Cenário: erro ao tentar cadastrar um novo usuário com dado inválido
    Dado que o usuário insere um dado inválido no campo "<campo_incorreto>"
    Quando enviar uma requisição POST para o endpoint /cadastro
    Então o sistema deve retornar status code 400
    E a mensagem de erro "<mensagem_de_erro>"

    Exemplos:
      | campo_incorreto   | mensagem_de_erro           |
      | cpf               | CPF inválido               |
      | full_name         | Nome completo obrigatório  |
      | password          | Senha fraca                |
      | confirmPassword   | Senhas não conferem        |

  Cenário: erro interno do servidor
    Dado que o usuário insere os dados corretamente
    Quando enviar a request POST para /cadastro
    Então verá a mensagem de sucesso "Erro interno do servidor."
    E status code 500

  Esquema do Cenário: confirmar e-mail com token válido
    Dado que o usuário possui um token "<token>"
    Quando enviar uma requisição GET para /confirm-email com esse token
    Então o sistema deve retornar status code 200
    E a mensagem "E-mail confirmado com sucesso."

    Exemplos:
      | token_correto                     |
      | eyJhbGciOiJIUzI1NiIsInR5cCI6...   |

  Esquema do Cenário: erro ao tentar confirmar e-mail com token inválido ou expirado
    Dado que o usuário possui um token inválido ou expirado "<token_incorreto>"
    Quando enviar uma requisição GET para o endpoint /confirm-email com esse token
    Então o sistema deve retornar status code 400
    E a mensagem "Token inválido ou expirado."

    Exemplos:
      | token_incorreto     |
      | deUrUImfamILIa...   |

  Cenário: login do usuário com sucesso
    Dado que o usuário possui "<email>" e "<senha>" válidos
    Quando enviar uma requisição POST para o endpoint /login
    Então o sistema deve retornar status code 200
    E o token JWT válido

  Esquema do Cenário: erro ao tentar fazer login com dados inválidos ou e-mail não confirmado
    Dado que o usuário informa o email "<email>" e a senha "<senha>"
    Quando enviar uma requisição POST para o endpoint /login
    Então o sistema deve retornar status code <status_code>
    E a mensagem de erro "<mensagem_erro>"

    Exemplos:
      | email                     | senha         | status_code | mensagem_erro           |
      | usuario@invalido.com      | SenhaErrada   | 400         | Credenciais inválidas   |
      | usuario@naoconfirmado.com | Senha@123     | 403         | E-mail não confirmado   |

  Cenário: excluão de usuário
    Dado que o usuário insira o password corretamente no body
    Quando enviar uma requisição DELETE para o endpoint /account
    Então o sistema deve retornar status code 200
    E a mensagem "Conta marcada como deletada."

  Esquema do Cenário: exclusão com dados inválidos ou e-mail não confirmado
    Dado que o usuário informa "<senha_inavlida>", requisição mal formada ou "<token_correto>"
    Quando enviar uma requisição DELETE para o endpoint /account
    Então o sistema deve retornar "<status_code>"
    E a "<mensagem_de_erro>"

    Exemplos:
      | status_code | mensagem_erro           |
      | 400         | Credenciais inválidas   |
      | 401         | E-mail não confirmado   |
