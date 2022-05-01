const bcrypt = require('bcrypt');

// Return a hashed password
const hashPass = async pass => await bcrypt.hash(pass, 5);

// Compare the password to db-pass and return true or false
const comparePass = async (pass, hash) => await bcrypt.compare(pass, hash);

module.exports = {
  hashPass,
  comparePass,
};
