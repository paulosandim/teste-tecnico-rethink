const request = require('supertest')
const { faker } = require('@faker-js/faker')
const { gerarCpf } = require('./dataGenerator')

const api = 'https://points-app-backend.vercel.app'

async function criarUsuarioELogar() {
  const userData = {
    cpf: gerarCpf(),
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Senha@123',
    confirmPassword: 'Senha@123'
  }

  const resCadastro = await request(api).post('/cadastro').send(userData)
  const token = resCadastro.body.confirmToken

  await request(api).get(`/confirm-email?token=${token}`)

  const resLogin = await request(api)
    .post('/login')
    .send({ email: userData.email, password: userData.password })

  const jwt = resLogin.body.token

  return { ...userData, jwt }
}

module.exports = { api, criarUsuarioELogar }