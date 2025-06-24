const request = require('supertest')
const { faker } = require('@faker-js/faker')
const { gerarCpf } = require('../utils/dataGenerator')

const api = 'https://points-app-backend.vercel.app'

describe('API /cadastro', () => {
  it('cadastrar um novo usuário com sucesso', async () => {
    const res = await request(api)
      .post('/cadastro')
      .send({
        cpf: gerarCpf(),
        full_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: 'Senha@123',
        confirmPassword: 'Senha@123',
      })

    expect(res.status).toBe(201)
    expect(res.body).toHaveProperty('message')
  })
})

