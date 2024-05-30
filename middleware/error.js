const {
  DuplicatedError,
  UnauthorizedError,
  ValidationError,
} = require('../errors/exceptions')
const { TokenExpiredError } = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
  console.error(err)

  errStatus = 500
  errMsgs = err instanceof ValidationError ? err.getMessages() : err.message

  if (err instanceof ValidationError) {
    errStatus = 400
  } else if (err instanceof UnauthorizedError || TokenExpiredError) {
    errStatus = 401
  } else if (err instanceof DuplicatedError) {
    errStatus = 409
  }

  res.status(errStatus).json({ errors: errMsgs })
}

module.exports = errorHandler
