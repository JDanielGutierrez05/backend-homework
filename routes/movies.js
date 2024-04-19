var express = require('express')
var router = express.Router()
var moviesController = require('../controllers/movies/index')

/* POST movies login. */
router.post('/', function (req, res, next) {
  moviesController.createMovie(req, res)
})

module.exports = router
