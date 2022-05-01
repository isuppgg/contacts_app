const bcrypt = require('bcrypt');

const hashPass = async pass => await bcrypt.hash(pass, 5);
const comparePass = async (pass, hash) => await bcrypt.compare(pass, hash);

module.exports = {
  hashPass,
  comparePass,
};
