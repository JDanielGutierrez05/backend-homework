var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users/index')

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
router.post('/', function (req, res, next) {
  usersController.create(req, res)
})

module.exports = router
