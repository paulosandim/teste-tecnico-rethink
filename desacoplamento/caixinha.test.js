const request = require('supertest')
const { api, setupUsuario } = require('../utils/testSetup')

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

  it('deposita pontos na caixinha', async () => {
      const res = await request(api)
        .post('/caixinha/deposit')
        .set('Authorization', `Bearer ${jwt}`)
        .send({ amount: 30 })
  
      expect(res.status).toBe(200)
      expect(res.body).toHaveProperty('message')
    })
})
