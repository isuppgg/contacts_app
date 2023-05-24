require('dotenv').config()
const mysql = require('mysql')

const mode = process.env.NODE_ENV === 'production'
const options = {
   connectionLimit: 10,
   port: 3306,
   host: mode ? process.env.DB_HOST : process.env.DB_HOST_TEST,
   user: mode ? process.env.DB_USER : process.env.DB_USER_TEST,
   password: mode ? process.env.DB_PASS : process.env.DB_PASS_TEST,
   database: mode ? process.env.DB_DATABASE : process.env.DB_DATABASE_TEST,
}

console.log(options)

const connection = mysql.createPool(options)

module.exports = connection
