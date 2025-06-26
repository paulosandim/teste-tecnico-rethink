const request = require('supertest')
const { api, setupUsuario } = require('./utils/testSetup')

describe('Transferência de pontos', () => {
  let jwt, usuario

  beforeAll(async () => {
    usuario = await setupUsuario()
    await request(api).get(`/confirm-email?token=${usuario.confirmToken}`)
    const resLogin = await request(api).post('/login').send({
      email: usuario.email,
      password: usuario.password,
    })
    jwt = resLogin.body.token
  })

  it('envia pontos de um usuário autenticado', async () => {
    const res = await request(api)
      .post('/points/send')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ recipientCpf: usuario.cpf, amount: 50 })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})
