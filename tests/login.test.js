const connection = require('../database/connection');
const { api, initialUsers } = require('./helpers');
const { server } = require('../index');

describe('POST /login', () => {
  test('given all information', async () => {
    const response = await api.post('/api/login').send({
      usernameEmail: initialUsers[0].email,
      password: initialUsers[0].password,
    });
    expect(response.statusCode).toBe(200);
    expect(response.body.token).toBeDefined();
  });

  test('error in password', async () => {
    const response = await api.post('/api/login').send({
      usernameEmail: initialUsers[0].email,
      password: 'oswaldo',
    });
    expect(response.statusCode).toBe(401);
    expect(response.body.message).toBe('Incorrect user or password');
  });

  test('null or undefined field', async () => {
    const response = await api.post('/api/login').send({
      usernameEmail: initialUsers[0].email,
      password: null,
    });
    expect(response.statusCode).toBe(400);
    expect(response.body.error).toBeTruthy();
    expect(response.body.message).toBe('No field can be null');
  });
});

afterAll(() => {
  connection.end();
  server.close();
});
