const { ValidationError } = require('../errors/exceptions')

function validateFields(schema) {
  return function (req, res, next) {
    const validation = schema.validate(req.body, { abortEarly: false })
    if (validation.error) {
      throw new ValidationError(
        validation.error.details.map((error) => error.message)
      )
    }
    next()
  }
}

module.exports = validateFields
