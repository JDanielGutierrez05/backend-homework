'use strict'

const { userSchema } = require('../../validations/schemas')
const { insert: saveUser } = require('../../repositories/users')

exports.create = async function (req, res) {
  const validation = userSchema.validate(req.body)

  if (validation.error) {
    return res.status(400).send(validation.error.details.pop().message)
  }
  const savedUser = await saveUser(validation.value)
  console.log(savedUser)
  return res.json(savedUser)
}
