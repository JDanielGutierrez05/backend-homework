var express = require('express')
var router = express.Router()

const {
  findByFilters,
  deleteOne: deleteMovie,
  insert: saveMovie,
} = require('../repositories/movies')
const {
  movieCreationSchema,
  movieUpdateSchema,
} = require('../validation/schemas')
const { ObjectId } = require('mongodb')
const { ValidationError } = require('../errors/exceptions')

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
router.get('/', async function (req, res, next) {
  const result = await findByFilters(
    buildFilters({ id: req.userInfo.id, ...req.query })
  )
  return res.status(200).json(result)
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
router.post('/', async function (req, res, next) {
  const validation = movieCreationSchema.validate(req.body)
  if (validation.error) {
    throw new ValidationError(
      validation.error.details.map((error) => error.message)
    )
  }

  await saveMovie({
    ...validation.value,
    created_by: new ObjectId(req.userInfo.id),
    created_at: new Date(),
    updated_at: new Date(),
  })
  return res.status(200).json({ message: 'Movie saved successfully' })
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
router.patch('/:id', async function (req, res, next) {
  const validation = movieUpdateSchema.validate(req.body)
  if (validation.error) {
    throw new ValidationError(
      validation.error.details.map((error) => error.message)
    )
  }

  let movie = await findByFilters({ _id: new ObjectId(req.params.id) })

  if (!movie.length) {
    return res.status(406).json({ message: "The resource doesn't exists" })
  }

  movie = movie.pop()

  if (req.userInfo.id != movie.created_by) {
    return res.status(403).json({ message: 'You cannot edit this resource' })
  }

  await update(req.params.id, validation.value)
  return res.status(200).json({ message: 'Movie updated successfully' })
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
router.delete('/:id', async function (req, res, next) {
  let movie = await findByFilters({ _id: new ObjectId(req.params.id) })

  if (!movie.length) {
    return res.status(406).json({ message: "The resource doesn't exists" })
  }

  movie = movie.pop()

  if (req.userInfo.id != movie.created_by) {
    return res.status(403).json({ message: 'You cannot edit this resource' })
  }
  await deleteMovie(req.params.id)
  return res.status(200).json({ message: 'Resource deleted successfully' })
})

function buildFilters(queryParams) {
  let filters = { deleted_at: { $exists: false } }

  if (queryParams.private) {
    if (queryParams.private === 'true') {
      filters['created_by'] = new ObjectId(queryParams.id)
      filters['private'] = true
    } else {
      filters['private'] = false
    }
  } else {
    filters['created_by'] = new ObjectId(queryParams.id)
  }
  return filters
}

module.exports = router
