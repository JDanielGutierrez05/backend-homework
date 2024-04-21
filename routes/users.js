var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users/index')

/* GET users example. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

/* POST users creation. */
router.post('/', function (req, res, next) {
  usersController.create(req, res)
})

module.exports = router
