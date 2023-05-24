const con = require('../database/connection');
const userRouter = require('express').Router();
const { hashPass } = require('../helpers/password');

// Get all users
userRouter.get('/', (req, res, next) => {
  con.query('SELECT username FROM user', (err, rows, fields) => {
    if (err) {
      err.name = err?.code;
      return next(err);
    }    
    res.status(200).json(rows).end();
  });
});

/* Create a new user in our database if already exists 
 send an 406 error 'Not acceptable' */

userRouter.post('/', async (req, res, next) => {
  const { username, email, password } = req.body;
  const hashedPass = await hashPass(password);

  con.query(
    `INSERT INTO user SET ?`,
    { username, email, password: hashedPass },
    (err, rows, fields) => {
      if (err) {
        err.name = err?.code;
        return next(err);
      }
      res.status(201).json({ message: 'User succesfully created' }).end();
    }
  );
});

module.exports = userRouter;
