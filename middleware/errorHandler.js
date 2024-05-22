class ValidationError extends Error {
  message

  constructor(message) {
    super(message)
    this.message = message
  }
}

const errorHandler = (err, req, res, next) => {
  console.error(err)

  errStatus = 500
  errMsg = err.message

  if (err instanceof ValidationError) {
    this.errStatus = 400
  }

  res.status(errStatus).json({ error: errMsg })
}

module.exports = { ValidationError, errorHandler }
