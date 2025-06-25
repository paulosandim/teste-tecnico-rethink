const request = require('supertest')
const {api, dadosUsuario} = require('../utils/testSetup')

describe('fluxo completo', () => {
  it('fluxo completo rethink bank', async () => {

    const { cpf, full_name, email, password } = await dadosUsuario()

    const res = await request(api)
      .post('/cadastro')
      .send({
        cpf,
        full_name,
        email,
        password,
        confirmPassword: password
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('confirmToken')

    const userToken = res.body.confirmToken

    const confirmaEmail = await request(api)
      .get(`/confirm-email?token=${userToken}`)

    expect(confirmaEmail.status).toBe(200);
    expect(confirmaEmail.text).toBe('E-mail confirmado com sucesso.')
    console.log(confirmaEmail.text)

    const loginRes = await request(api)
      .post('/login')
      .send({ email, password })

    const sessaoJWT = loginRes.body.token

    const enviaPontos = await request(api)
      .post('/points/send')
      .set('Authorization', `Bearer ${sessaoJWT}`)
      .send({ recipientCpf: cpf, amount: 50 });

    expect(enviaPontos.status).toBe(200)
    expect(enviaPontos.body).toHaveProperty('message')
    console.log(enviaPontos.body)


    const depositaPontos = await request(api)
      .post('/caixinha/deposit')
      .set('Authorization', `Bearer ${sessaoJWT}`)
      .send({ amount: 30 });

    expect(depositaPontos.status).toBe(200)
    expect(depositaPontos.body).toHaveProperty('message')
    console.log(depositaPontos.body)

  })

})

