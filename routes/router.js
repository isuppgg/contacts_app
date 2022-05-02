const { Router } = require('express');
const router = Router();
const userRouter = require('../controllers/users');
const contactsRouter = require('../controllers/contacts');
const login = require('../controllers/login');
const userExtractor = require('../middlewares/userExtractor');

router.get('/', (req, res) => {
  res.status(200).send('<h1>Hello World</h1>').end();
});

router.use('/api/users', userRouter);
router.use('/api/login', login);
router.use('/api/contacts', userExtractor, contactsRouter);

module.exports = router;
