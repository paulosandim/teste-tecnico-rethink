const request = require('supertest')
const { api, setupUsuario } = require('./utils/testSetup')

describe('Exclusão de usuário', () => {
  let jwt, usuario

  beforeAll(async () => {
    usuario = await setupUsuario()
    await request(api).get(`/confirm-email?token=${usuario.confirmToken}`)
    const resLogin = await request(api).post('/login').send({
      email: usuario.email,
      password: usuario.password
    })
    jwt = resLogin.body.token
  })

  it('exclui a conta do usuário', async () => {
    const res = await request(api)
      .delete('/account')
      .set('Authorization', `Bearer ${jwt}`)
      .send({ password: usuario.password })
  
    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('message')
  })
})