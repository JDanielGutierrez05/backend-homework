'use strict'

const { findByEmail } = require('../../repositories/users')
const { userSchema } = require('../../utilities/joiSchemas')
const { generateAccessToken } = require('../../utilities/jwt-tools')
const bcrypt = require('bcrypt')

async function login(req, res) {
  const validation = userSchema.validate(req.body)

  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details.pop().message })
  }

  const userExist = await findByEmail(validation.value.email)
  if (!userExist) {
    return res.status(422).json({ message: "User doesn't exists." })
  }

  if (!bcrypt.compareSync(req.body.password, userExist.password)) {
    return res.status(400).json({ message: 'User or password incorrect' })
  }

  return res.status(200).json({
    token: generateAccessToken(userExist),
  })
}

module.exports = { login }
