const con = require('../database/connection');
const contactsRouter = require('express').Router();

// Returns all user's contacts
contactsRouter.get('/', (req, res, next) => {
  const userId = req.userId;
  console.log({ userId });
  con.query(
    'SELECT id,name,number FROM contact WHERE created_by = ?',
    [userId],
    (err, rows, fields) => {
      if (err) {
        next(err);
        return;
      }
      res.status(200).json(rows).end();
    }
  );
});

// Create a new contact associated with the user's id
contactsRouter.post('/', (req, res, next) => {
  const { name, number } = req.body;
  const userId = req.userId;
  con.query(
    'INSERT INTO contact SET ?',
    { name, number, created_by: userId },
    (err, rows, fields) => {
      if (err) {
        next(err);
        return;
      }
      const newContact = {
        name,
        number,
        id: rows.insertId,
      };
      res.status(201).json({
        message: 'The contact was succesfully created',
        newContact,
      });
    }
  );
});

// Update a contact
contactsRouter.put('/', (req, res, next) => {
  const { name, number, id } = req.body;
  console.log({ name, number, id });
  const userId = req.userId;
  con.query(
    'UPDATE contact SET ? WHERE id = ? AND created_by = ?',
    [{ name, number }, id, userId],
    (err, rows, fields) => {
      if (err) {
        next(err);
        return;
      }
      const updatedContact = {
        name,
        number,
        id,
      };
      res.status(200).json({
        message: 'The contact was succesfully updated',
        updatedContact,
      });
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
      res.status(204).end();
    }
  );
});

module.exports = contactsRouter;
