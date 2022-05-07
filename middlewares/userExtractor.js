const jwt = require('jsonwebtoken');

// Verify if user's token is valid and check put of what user
// is requesting
module.exports = (req, res, next) => {
  const authorization = req.get('Authorization');
  let token = '';
  console.log(authorization);

  if (authorization && authorization.toLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }
  let decodedToken = '';
  try {
    decodedToken = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    next(err);
    return;
  }

  if (!token || !decodedToken.id) {
    return res.status(401).json({ error: 'token missing or invalid' });
  }

  const { id: userId } = decodedToken;
  req.userId = userId;

  next();
};
