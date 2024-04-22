var express = require('express')
var router = express.Router()
var moviesController = require('../controllers/movies/index')

/**
 * @swagger
 * /users:
 *   get:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: private
 *         in: path
 *         required: false
 *         type: string
 *         description: Defines if show or not the public elements on movies collection
 *       - in: header
 *         name: Authorization
 *         description: Bearer token in the format "{token}"
 *         required: true
 *         schema:
 *           type: string
 *           format: JWT
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Validation of fields
 */
router.get('/', function (req, res, next) {
  moviesController.getMovies(req, res)
})

/**
 * @swagger
 * /users:
 *   post:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: year
 *         in: body
 *         required: true
 *         type: string
 *       - name: director
 *         in: body
 *         required: true
 *         type: string
 *       - name: company
 *         in: body
 *         required: true
 *         type: string
 *       - name: private
 *         in: body
 *         required: true
 *         type: string
 *         description: Defines if the movie object can be watched for any user
 *       - in: header
 *         name: Authorization
 *         description: Bearer token in the format "{token}"
 *         required: true
 *         schema:
 *           type: string
 *           format: JWT
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Validation of fields
 *       403:
 *         description: Cannot edit the movie, because not create the movie
 *       406:
 *         description: Movie not exists in database
 */
router.post('/', function (req, res, next) {
  moviesController.createMovie(req, res)
})

/**
 * @swagger
 * /users:
 *   patch:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - name: name
 *         in: body
 *         required: true
 *         type: string
 *       - name: year
 *         in: body
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token in the format "{token}"
 *         required: true
 *         schema:
 *           type: string
 *           format: JWT
 *     responses:
 *       200:
 *         description: Successful
 *       400:
 *         description: Validation of fields
 *       403:
 *         description: Cannot edit the movie, because not create the movie
 *       406:
 *         description: Movie not exists in database
 */
router.patch('/:id', function (req, res, next) {
  moviesController.updateMovie(req, res)
})

/**
 * @swagger
 * /users:
 *   delete:
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         type: string
 *       - in: header
 *         name: Authorization
 *         description: Bearer token in the format "{token}"
 *         required: true
 *         schema:
 *           type: string
 *           format: JWT
 *     responses:
 *       200:
 *         description: Successful
 *       403:
 *         description: Cannot edit the movie, because not create the movie
 *       406:
 *         description: Movie not exists in database
 */
router.delete('/:id', function (req, res, next) {
  moviesController.deleteMovie(req, res)
})

module.exports = router
