var express = require('express')
var router = express.Router()

const { insert: saveUser, findByEmail } = require('../repositories/users')
const { DuplicatedError } = require('../errors/exceptions')
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
  try {
    const userExist = await findByEmail(req.body.user)

    if (userExist) {
      throw new DuplicatedError('User already exists.')
    }

    let userToSave = createUser(req.body)
    const savedUser = await saveUser(userToSave)

    return res
      .status(201)
      .json({ id: savedUser.insertedId, user: userToSave.user })
  } catch (error) {
    next(error)
  }
})

function createUser(user) {
  let newUser = { ...user }
  newUser.password = bcrypt.hashSync(user.password, 10)
  newUser.created_at = new Date()
  return newUser
}

module.exports = router
