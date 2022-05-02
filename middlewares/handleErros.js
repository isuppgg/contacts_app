const ERROR_HANDLERS = {
  JsonWebTokenError: res => {
    res.status(409).json({ error: 'Token missing or invalid' });
  },

  TokenExpiredError: res => {
    res.status(409).json({ error: 'Token expired' });
  },

  defaultError: (res, error) => {
    console.log(error.name);
    res.status(500).end();
  },
};

module.exports = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;

  handler(res, err);
};
