const request = require('supertest')
const { api, setupUsuario } = require('../utils/testSetup')

describe('Cadastro de usuário', () => {
  it('deve cadastrar novo usuário com sucesso', async () => {
    const usuario = await setupUsuario()
    expect(usuario.confirmToken).toBeDefined()
  })
})
