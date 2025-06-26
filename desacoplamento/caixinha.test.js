const request = require('supertest')
const { api, setupUsuario } = require('../utils/testSetup')

describe('Deposita na Caixinha e confere Saldo consolidado', () => {
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

   it('confere saldo geral consolidado', async () => {
        const res = await request(api)
          .get('/points/saldo')
          .set('Authorization', `Bearer ${jwt}`)
    
        expect(res.status).toBe(200)
        expect(res.body).toHaveProperty('normal_balance')
        expect(res.body).toHaveProperty('piggy_bank_balance')
      })
})
