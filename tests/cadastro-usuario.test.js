const request = require('supertest')
const { faker, it } = require('@faker-js/faker')
const { gerarCPF } = require('../utils/dataGenerator')

const api = 'https://points-app-backend.vercel.app'

describe('API /cadastro', () => {
  it('cadastrar um novo usuário com sucesso', async () => {
    const res = await request(api)
      .post('/cadastro')
      .send({
        cpf: gerarCPF(),
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Uno@1234',
        confirmPassword: 'Uno@1234',
      })

    console.log(res.body)
    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
  })

})

