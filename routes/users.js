var express = require('express')
var router = express.Router()

const { insert: saveUser, findByEmail } = require('../repositories/users')
const { validationMessage } = require('../utilities/utilities')
const { userSchema } = require('../validation/schemas')
const bcrypt = require('bcrypt')

/**
 * @swagger
 * /users:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         in: body
 *         required: true
 *         type: string
 *       - name: password
 *         in: body
 *         required: true
 *         type: string
 */
router.post('/', async function (req, res, next) {
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
})

function createUser(user) {
  let newUser = { ...user }
  newUser.password = bcrypt.hashSync(user.password, 10)
  newUser.created_at = new Date()
  return newUser
}

module.exports = router
