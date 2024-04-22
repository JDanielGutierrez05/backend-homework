'use strict'

const { userSchema } = require('../../utilities/joiSchemas')
const { insert: saveUser, findByEmail } = require('../../repositories/users')
const cloneDeep = require('lodash.clonedeep')
const bcrypt = require('bcrypt')
const { validationMessage } = require('../../utilities/utilities')

async function create(req, res) {
  const validation = userSchema.validate(req.body)

  validationMessage(res, validation)

  const userExist = await findByEmail(validation.value.email)
  if (userExist) {
    return res.status(422).json({ message: 'User already exists.' })
  }

  let userToSave = createUser(validation.value)
  const savedUser = await saveUser(userToSave)
  return res
    .status(201)
    .json({ id: savedUser.insertedId, user: userToSave.user })
}

function createUser(user) {
  let newUser = cloneDeep(user)
  newUser.password = bcrypt.hashSync(user.password, 10)
  newUser.created_at = new Date()
  return newUser
}

module.exports = { create }
