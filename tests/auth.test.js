const request = require('supertest')
const { faker } = require('@faker-js/faker')
const { gerarCPF } = require('../utils/dataGenerator')

const api = 'https://points-app-backend.vercel.app'

describe('API /cadastro', () => {
  it('cadastrar um novo usuário com sucesso e confirma e-mail', async () => {
    const res = await request(api)
      .post('/cadastro')
      .send({
        cpf: gerarCPF(),
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Tres@1234',
        confirmPassword: 'Tres@1234',
      })

    const email = 

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
    expect(res.body).toHaveProperty('confirmToken')

    const userToken = res.body.confirmToken

    const confirmaEmail = await request(api)
      .get(`/confirm-email?token=${userToken}`)

    expect(confirmaEmail.status).toBe(200);
    expect(confirmaEmail.text).toBe('E-mail confirmado com sucesso.');
    console.log(confirmaEmail.text)

  })

})

