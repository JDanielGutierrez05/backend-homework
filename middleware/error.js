const ValidationError = require('../errors/validation')
const UnauthorizedError = require('../errors/unauthorized')
const { TokenExpiredError } = require('jsonwebtoken')

const errorHandler = (err, req, res, next) => {
  console.error(err)

  errStatus = 500
  errMsg = err.message

  if (err instanceof ValidationError) {
    errStatus = 400
  }

  if (err instanceof UnauthorizedError || TokenExpiredError) {
    errStatus = 401
  }

  res.status(errStatus).json({ error: errMsg })
}

module.exports = errorHandler
