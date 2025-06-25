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

module.exports = { api, dadosUsuario }