const ERROR_HANDLERS = {
  JsonWebTokenError: res => {
    res
      .status(409)
      .json({
        error: true,
        message: 'Token missing or invalid', // Token not valid
      })
      .end();
  },

  TokenExpiredError: res => {
    res
      .status(409)
      .json({
        error: true,
        message: 'Token expired', // Expired token
      })
      .end();
  },

  ER_DUP_ENTRY: (res, err) => {
    res
      .status(406)
      .json({
        error: true,
        message: `User with this ${
          err.sqlMessage.includes('user.email') ? 'email' : 'username'
        } already exists`, // Existing user
      })
      .end();
  },

  ER_BAD_NULL_ERROR: (res, err) => {
    console.log(err.sqlMessage);
    res
      .status(400)
      .json({
        error: true,
        message: `Value ${
          err.sqlMessage.includes('email') ? 'email' : 'username'
        } cannot be null or undefined`, // Existing user
      })
      .end();
  },

  defaultError: (res, error) => {
    res
      .status(500)
      .json({
        error: true,
        message: error,
      })
      .end();
  },
};

module.exports = (err, req, res, next) => {
  const handler = ERROR_HANDLERS[err.name] || ERROR_HANDLERS.defaultError;
  handler(res, err);
};
