var express = require('express')
var router = express.Router()
var usersController = require('../controllers/users/index')

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send('respond with a resource')
})

router.post('/', function (req, res, next) {
  usersController.create(req, res)
})

module.exports = router
