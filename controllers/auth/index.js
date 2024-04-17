'use strict'

const { findByEmail } = require('../../repositories/users')
const { userSchema } = require('../../util/validations/schemas')

async function login(req, res) {
  const validation = userSchema.validate(req.body)

  if (validation.error) {
    return res.status(400).send(validation.error.details.pop().message)
  }

  const userExist = await findByEmail(validation.value.email)
  if (!userExist) {
    return res.status(422).send("User doesn't exists.")
  }

  return res.status(200).send({ id: userExist._id, user: userExist.user })
}

module.exports = { login }
