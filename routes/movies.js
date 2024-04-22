var express = require('express')
var router = express.Router()
var moviesController = require('../controllers/movies/index')

/* GET movies list. */
router.get('/', function (req, res, next) {
  moviesController.getMovies(req, res)
})

/* POST movies creation. */
router.post('/', function (req, res, next) {
  moviesController.createMovie(req, res)
})

/* PATCH movies update. */
router.patch('/:id', function (req, res, next) {
  moviesController.updateMovie(req, res)
})

module.exports = router
