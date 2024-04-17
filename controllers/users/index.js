'use strict'

const { userSchema } = require('../../util/validations/schemas')
const { insert: saveUser, findByEmail } = require('../../repositories/users')
const cloneDeep = require('lodash.clonedeep')

async function create(req, res) {
  const validation = userSchema.validate(req.body)

  if (validation.error) {
    return res.status(400).send(validation.error.details.pop().message)
  }

  const userExist = await findByEmail(validation.value.email)
  if (userExist) {
    return res.status(422).send('User already exists.')
  }

  let userToSave = createUser(validation.value)
  const savedUser = await saveUser(userToSave)
  return res.status(201).json(savedUser)
}

function createUser(user) {
  let newUser = cloneDeep(user)
  newUser.password = Buffer.from(user.password).toString('base64')
  newUser.created_at = new Date()
  return newUser
}

module.exports = { create }
