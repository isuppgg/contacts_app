const con = require('../database/connection');
const loginRouter = require('express').Router();
const { comparePass } = require('../helpers/password');
const jwt = require('jsonwebtoken');

/* User log in wit username or email and password and returns a 
   JWT token */
loginRouter.post('/', (req, res) => {
  const { usernameEmail, password } = req.body;
  if (!usernameEmail || !password) {
    return res
      .status(400)
      .json({ error: true, message: 'No field can be null' });
  }
  con.query(
    'SELECT * FROM user WHERE username = ? OR email = ?',
    [usernameEmail, usernameEmail],
    async (err, rows, fields) => {
      if (err) throw err;

      const passwordCorrect =
        rows.length !== 0
          ? await comparePass(password, rows[0].password)
          : false;

      if (!passwordCorrect) {
        res
          .status(401)
          .json({
            error: true,
            message: 'Incorrect user or password',
          })
          .end();
        return;
      }
      const userForToken = {
        id: rows[0].id,
        username: rows[0].username,
      };

      const token = jwt.sign(userForToken, process.env.JWT_SECRET);
      res
        .status(200)
        .json({
          user: rows[0].username,
          email: rows[0].email,
          token,
        })
        .end();
    }
  );
});

module.exports = loginRouter;
