const { Router } = require('express');
const router = Router();
const { register, login } = require('../controllers/authControllers');

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1>').end();
});

router.post('/api/register', register);

router.post('/api/login', login);

router.use('/api/users/', require('./users'));

module.exports = router;
