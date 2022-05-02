const con = require('../database/connection');
const contactsRouter = require('express').Router();
const jwt = require('jsonwebtoken');

// Create a new contact associated with the user's id
contactsRouter.post('/', (req, res) => {
  const { name, number } = req.body;
  const userId = req.userId;
  con.query(
    'INSERT INTO contact SET ?',
    { name, number, created_by: userId },
    (err, rows, fields) => {
      if (err) throw err;
      res.status(201).json({ message: 'The contact was succesfully created' });
    }
  );
});

// Delete a specified contact
contactsRouter.delete('/', (req, res) => {
  const { id } = req.body;
  const userId = req.userId;
  console.log({ userId });
  con.query(
    'DELETE FROM contact WHERE id = ? AND created_by = ?',
    [id, userId],
    (err, rows, fields) => {
      if (err) throw err;
      res.status(202).json({ message: 'The contact was succesfully deleted' });
    }
  );
});

module.exports = contactsRouter;
