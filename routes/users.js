const { Router } = require('express');
const router = Router();
const con = require('../database/connection');
const { v4: uuidv4 } = require('uuid');

router.get('/', (req, res) => {
  console.log(req.body);
  con.query('SELECT username FROM user', (err, rows, fields) => {
    if (err) throw err;
    res.status(200).json(rows).end();
  });
});

router.get('/:username', (req, res) => {
  const username = req.params.username;
  con.query(
    `SELECT username, email FROM user WHERE username = '${username}'`,
    (err, rows, fields) => {
      if (err) throw err;
      if (rows.length != 0) {
        res.status(200).json(rows).end();
      } else {
        res.status(404).send('Sorry');
      }
    }
  );
});

module.exports = router;
