require('dotenv').config();
const mysql = require('mysql');

const mode = process.env.NODE_ENV === 'production';
const options = {
  host: mode ? process.env.DB_HOST : process.env.DB_HOST_TEST,
  user: mode ? process.env.DB_USER : process.env.DB_USER_TEST,
  password: mode ? process.env.DB_PASS : process.env.DB_PASS_TEST,
  database: mode ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST,
};

const connection = mysql.createConnection(options);

connection.connect(err => {
  if (err) throw err;
});

module.exports = connection;
