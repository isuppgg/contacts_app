const con = require('../database/connection');
const { hashPass, comparePass } = require('../helpers/password');

/* Create a new user in our database if already exists 
 send an 406 error 'Not acceptable' */
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPass = await hashPass(password);

  con.query(
    `INSERT INTO user SET ?`,
    { username, email, password: hashedPass },
    (err, rows, fields) => {
      if (err) {
        if (err.errno == 1062) {
          res.status(406);
          res
            .send(
              `User with this ${
                err.sqlMessage.includes('user.email') ? 'email' : 'username'
              } already exists`
            )
            .end();
        }
        return;
      }
      res.status(201).end();
    }
  );
};

/* Login feature not completed yet */
const login = (req, res) => {
  const { usernameEmail, password } = req.body;
  con.query(
    'SELECT * FROM user WHERE username = ? OR email = ?',
    [usernameEmail, usernameEmail],
    async (err, rows, fields) => {
      if (err) throw err;

      if (
        rows.length !== 0 &&
        (await comparePass(password, rows[0].password))
      ) {
        res
          .status(200)
          .json({
            user: rows[0].username,
            email: rows[0].email,
          })
          .end();
      } else {
        res.status(404).send('Incorrect user or password').end();
      }
    }
  );
};

module.exports = { register, login };
