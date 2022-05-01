const { Router } = require('express');
const router = Router();
const userRouter = require('../controllers/users');
const login = require('../controllers/login');

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1>').end();
});

router.use('/api/users', userRouter);
router.use('/api/login', login);

module.exports = router;
