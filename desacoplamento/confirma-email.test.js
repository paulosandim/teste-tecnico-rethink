const request = require('supertest');
const { api, setupUsuario } = require('../utils/testSetup');

describe('Confirmação de e-mail', () => {
  it('deve confirmar e-mail com token válido', async () => {
    const { confirmToken } = await setupUsuario();

    const res = await request(api)
      .get(`/confirm-email?token=${confirmToken}`);

    expect(res.status).toBe(200);
    expect(res.text).toBe('E-mail confirmado com sucesso.');
  });
});
