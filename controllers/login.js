const con = require('../database/connection');
const loginRouter = require('express').Router();
const { comparePass } = require('../helpers/password');

/* Login feature not completed yet */
loginRouter.post('/', (req, res) => {
  const { usernameEmail, password } = req.body;
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
        res.status(401).json({ error: 'Incorrect user or password' }).end();
        return;
      }

      res
        .status(200)
        .json({
          user: rows[0].username,
          email: rows[0].email,
        })
        .end();
    }
  );
});

module.exports = loginRouter;
