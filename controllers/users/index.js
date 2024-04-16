'use strict'

const { userSchema } = require('../../validations/schemas')

exports.create = function (req, res) {
  const validation = userSchema.validate(req.body)

  if (validation.error) {
    return res.status(400).send(validation.error.details.pop().message)
  }
  return res.send(validation)
}
