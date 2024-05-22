var express = require('express')
var router = express.Router()

const { findByEmail } = require('../repositories/users')
const { userSchema } = require('../validation/schemas')
const { generateAccessToken } = require('../utilities/jwt-tools')
const bcrypt = require('bcrypt')
const { ValidationError } = require('../middleware/errorHandler')

/**
 * @swagger
 * /login:
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
    const validation = userSchema.validate(req.body)

    // TODO: change to general error handler middleware
    if (validation.error) {
      throw new ValidationError(validation.error.details.pop().message)
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
  } catch (error) {
    next(error)
  }
})

module.exports = router
