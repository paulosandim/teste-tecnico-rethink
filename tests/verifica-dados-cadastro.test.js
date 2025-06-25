const request = require('supertest')
const { api, dadosUsuario } = require('../utils/testSetup')

describe('validando dados inválidos no cadastro de usuário', () => {

  let cpf, full_name, email, password

  it('verifica CPF inválido', async () => {
    const usuario = await dadosUsuario()
    cpf = '010239345999'
    full_name = usuario.full_name
    email = usuario.email
    password = usuario.password

    const resCadastro = await request(api)
      .post('/cadastro')
      .send({ cpf, full_name, email, password, confirmPassword: password })

    expect(resCadastro.status).toBe(400)
    expect(resCadastro.body.error).toBe('CPF inválido')

  })

  it('verifica Nome Completo obrigatório', async () => {
    const usuario = await dadosUsuario()
    cpf = usuario.cpf
    full_name = 'Zé'
    email = usuario.email
    password = usuario.password

    const resCadastro = await request(api)
      .post('/cadastro')
      .send({ cpf, full_name, email, password, confirmPassword: password })

    expect(resCadastro.status).toBe(400)
    expect(resCadastro.body.error).toBe('Nome completo obrigatório')

  })

}) 