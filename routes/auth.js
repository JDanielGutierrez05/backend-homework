var express = require('express')
var router = express.Router()
var authController = require('../controllers/auth/index')

/* POST auth login. */
router.post('/', function (req, res, next) {
  authController.login(req, res)
})

module.exports = router
