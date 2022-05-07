const ERROR_HANDLERS = {
  JsonWebTokenError: res => {
    res.status(409).json({ error: 'Token missing or invalid' }).end();
  },

  TokenExpiredError: res => {
    res.status(409).json({ error: 'Token expired' }).end();
  },

  defaultError: (res, error) => {
    res.status(500).json({ error }).end();
  },
};

module.exports = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
  handler(res, err);
};
