const request = require('supertest')
const { faker } = require('@faker-js/faker')
const { gerarCPF } = require('./cpfGenerator')

const api = 'https://points-app-backend.vercel.app'

function dadosUsuario() {
  return {
    cpf: gerarCPF(),
    full_name: faker.person.fullName(),
    email: faker.internet.email(),
    password: 'Seis@123',
  }
}

async function setupUsuario() {
  const { cpf, full_name, email, password } = dadosUsuario()

  const resCadastro = await request(api)
    .post('/cadastro')
    .send({ cpf, full_name, email, password, confirmPassword: password })

  const confirmToken = resCadastro.body.confirmToken

  await request(api).get(`/confirm-email?token=${confirmToken}`)

  const resLogin = await request(api)
    .post('/login')
    .send({ email, password })

  const jwt = resLogin.body.token

  return {
    cpf,
    full_name,
    email,
    password,
    confirmToken,
    jwt,
  }
}

module.exports = { api, dadosUsuario, setupUsuario }
