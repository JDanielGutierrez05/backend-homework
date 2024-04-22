'use strict'

const {
  movieCreationSchema,
  movieUpdateSchema,
} = require('../../utilities/joiSchemas')
const {
  findByFilters,
  insert: saveMovie,
  update,
} = require('../../repositories/movies')
const { ObjectId } = require('mongodb')
const {
  extractDataFromToken,
  validationMessage,
} = require('../../utilities/utilities')

function buildFilters(queryParams) {
  let filters = {}

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
  filters['deleted_at'] = { $exists: false }
  return filters
}

async function createMovie(req, res) {
  const validation = movieCreationSchema.validate(req.body)
  validationMessage(res, validation)

  const userInfo = extractDataFromToken(req)
  await saveMovie({
    ...validation.value,
    created_by: new ObjectId(userInfo.id),
    created_at: new Date(),
    updated_at: new Date(),
  })
  return res.status(200).json({ message: 'Movie saved succesfully' })
}

async function getMovies(req, res) {
  const userInfo = extractDataFromToken(req)
  const result = await findByFilters(
    buildFilters({ id: userInfo.id, ...req.query })
  )
  return res.status(200).json(result)
}

async function updateMovie(req, res) {
  const validation = movieUpdateSchema.validate(req.body)
  validationMessage(res, validation)

  const userInfo = extractDataFromToken(req)
  let movie = await findByFilters({ _id: new ObjectId(req.params.id) })

  if (!movie.length) {
    return res.status(406).json({ message: "The resource doesn't exists" })
  }

  movie = movie.pop()

  if (userInfo.id != movie.created_by) {
    return res.status(403).json({ message: 'You cannot edit this resource' })
  }

  await update(req.params.id, validation.value)
  return res.status(200).json({ message: 'Movie updated successfully' })
}

module.exports = { createMovie, getMovies, updateMovie }
