const supertest = require('supertest');
const connection = require('../database/connection');
const { app, server } = require('../index');

const api = supertest(app);

const initialUsers = [
  {
    username: 'root',
    email: 'root@gmail.com',
    password: 'root',
  },
  {
    username: 'oswaldo',
    email: 'user1@gmail.com',
    password: 'user1',
  },
];

beforeEach(() => {
  connection.query('DELETE FROM user');
  connection.query('DELETE FROM contact');
  for (user of initialUsers) {
    connection.query(`INSERT INTO user SET ?`, {
      username: user.username,
      email: user.email,
      password: user.password,
    });
  }
});

describe('GET /', () => {
  test('should respond with a 200 status code', async () => {
    const response = await api.get('/').send();
    expect(response.headers['content-type']).toMatch(/text\/html/);
  });
});

describe('GET /users', () => {
  test('should respond with an 200 status code', async () => {
    const response = await api.get('/api/users');
    expect(response.statusCode).toBe(200);
  });

  test('should respond length of 2', async () => {
    const response = await api.get('/api/users');
    expect(response.body.length).toBe(2);
  });
});

describe('POST', () => {
  describe('given all needed data', () => {
    test('Should respond with an 201 status code', async () => {
      const firstResponse = await api.post('/api/users').send({
        username: 'user3',
        email: 'user3@gmail.com',
        password: 'user3',
      });
      expect(firstResponse.statusCode).toBe(201);

      const secondResponse = await api.get('/api/users');
      expect(secondResponse.body.length).toBe(initialUsers.length + 1);
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
