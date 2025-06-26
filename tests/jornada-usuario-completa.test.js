const request = require('supertest')
const { api, dadosUsuario } = require('./utils/testSetup')

describe('fluxo completo Rethink Bank', () => {
  let cpf, full_name, email, password, confirmToken, jwt

  beforeAll(async () => {
    const usuario = await dadosUsuario()
    cpf = usuario.cpf
    full_name = usuario.full_name
    email = usuario.email
    password = usuario.password

    const resCadastro = await request(api)
      .post('/cadastro')
      .send({ cpf, full_name, email, password, confirmPassword: password })

    confirmToken = resCadastro.body.confirmToken
  })

  it('confirma o e-mail do usuário a partir de um token', async () => {
    const res = await request(api)
      .get(`/confirm-email?token=${confirmToken}`)

    expect(res.status).toBe(200)
    expect(res.text).toBe('E-mail confirmado com sucesso.')
  })

  it('autentica um usuário e retorna um token de sessão', async () => {
    const res = await request(api)
      .post('/login')
      .send({ email, password })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
    jwt = res.body.token
  })

  it('envia pontos de um usuário autenticado', async () => {
    const res = await request(api)
      .post('/points/send')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ recipientCpf: cpf, amount: 50 })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })

  it('deposita pontos na caixinha', async () => {
    const res = await request(api)
      .post('/caixinha/deposit')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ amount: 30 })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })

  it('confere saldo geral consolidado', async () => {
    const res = await request(api)
      .get('/points/saldo')
      .set('Authorization', `Bearer ${jwt}`)

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('normal_balance')
    expect(res.body).toHaveProperty('piggy_bank_balance')
  })

  it('exclui a conta do usuário', async () => {
    const res = await request(api)
      .delete('/account')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ password })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})