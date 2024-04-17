'use strict'

const { findByEmail } = require('../../repositories/users')
const { userSchema } = require('../../validations/schemas')

async function login(req, res) {
  console.log(req.body)
  const validation = userSchema.validate({ user: req.body.user })

  if (validation.error) {
    return res.status(400).send(validation.error.details.pop().message)
  }

  const userExist = await findByEmail(validation.value.email)
  if (!userExist) {
    return res.status(422).send("User doesn't exists.")
  }

  return res.status(200).send('holi')
}

module.exports = { login }
