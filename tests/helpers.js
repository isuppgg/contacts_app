const supertest = require('supertest');
const { app } = require('../index');

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

module.exports = { api, initialUsers };
