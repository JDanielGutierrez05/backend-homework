var express = require('express')
var router = express.Router()
var authController = require('../controllers/auth/index')

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
router.post('/', function (req, res, next) {
  authController.login(req, res)
})

module.exports = router
