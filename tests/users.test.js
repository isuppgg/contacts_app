const connection = require('../database/connection');
const { server } = require('../index');
const { api, initialUsers } = require('./helpers');
const { hashPass } = require('../helpers/password');

beforeEach(async () => {
  connection.query('DELETE FROM user');
  connection.query('DELETE FROM contact');
  for (user of initialUsers) {
    const hashedPass = await hashPass(user.password);

    connection.query(`INSERT INTO user SET ?`, {
      username: user.username,
      email: user.email,
      password: hashedPass,
    });
  }
});

describe('GET /users', () => {
  test('should respond with an 200 status code', async () => {
    const response = await api.get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('should respond length of 2', async () => {
    const response = await api.get('/api/users');
    expect(response.body).toHaveLength(2);
  });
});

describe('POST /users', () => {
  describe('given all needed data', () => {
    test('Should respond with an 201 status code', async () => {
      const firstResponse = await api.post('/api/users').send({
        username: 'user3',
        email: 'user3@gmail.com',
        password: 'user3',
      });
      expect(firstResponse.statusCode).toBe(201);

      const secondResponse = await api.get('/api/users');
      expect(secondResponse.body).toHaveLength(initialUsers.length + 1);
    });
  });

  describe('given a null field', () => {
    test('Should respond with an 400 status code', async () => {
      const firstResponse = await api.post('/api/users').send({
        username: 'user3',
        email: undefined,
        password: 'user3',
      });
      expect(firstResponse.statusCode).toBe(400);

      expect(firstResponse.body.message).toMatch('email');
    });
  });
});

afterAll(() => {
  connection.end();
  server.close();
});
