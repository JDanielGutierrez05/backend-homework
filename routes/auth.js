var express = require('express')
var router = express.Router()

const { findByEmail } = require('../repositories/users')
const { generateAccessToken } = require('../utilities/jwt-tools')
const { userSchema } = require('../validation/schemas')
const { UnauthorizedError } = require('../errors/exceptions')

const bcrypt = require('bcrypt')

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
router.post('/login', async function (req, res, next) {
  try {
    const validation = userSchema.validate(req.body)

    if (validation.error) {
      throw new UnauthorizedError('Invalid credentials.')
    }

    const userExist = await findByEmail(req.body.user)

    if (!userExist) {
      throw new UnauthorizedError('Invalid credentials.')
    }

    if (!bcrypt.compareSync(req.body.password, userExist.password)) {
      throw new UnauthorizedError('Invalid credentials.')
    }

    return res.status(200).json({
      token: generateAccessToken(userExist),
    })
  } catch (error) {
    next(error)
  }
})

module.exports = router
