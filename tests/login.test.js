const request = require('supertest')
const { api, setupUsuario } = require('./utils/testSetup')

describe('Login de usuário', () => {
  it('deve autenticar e retornar JWT', async () => {
    const { email, password, confirmToken } = await setupUsuario()

    await request(api).get(`/confirm-email?token=${confirmToken}`)

    const res = await request(api)
      .post('/login')
      .send({ email, password })

    expect(res.status).toBe(200)
    expect(res.body).toHaveProperty('token')
  })
})
