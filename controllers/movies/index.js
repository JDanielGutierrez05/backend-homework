'use strict'

const { movieSchema } = require('../../utilities/joiSchemas')
const {
  findByFilters,
  insert: saveMovie,
} = require('../../repositories/movies')
const { ObjectId } = require('mongodb')

async function createMovie(req, res) {
  const validation = movieSchema.validate(req.body)

  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details.pop().message })
  }

  const userInfo = extractDataFromToken(req)
  await saveMovie({
    ...validation.value,
    created_by: new ObjectId(userInfo.id),
  })
  return res.status(200).json({ message: 'Movie saved succesfully' })
}

function extractDataFromToken(req) {
  const token = req.header('Authorization')
  return JSON.parse(atob(token.split('.')[1]))
}

async function getMovies(req, res) {
  const userInfo = extractDataFromToken(req)
  const result = await findByFilters(
    buildFilters({ id: userInfo.id, ...req.query })
  )
  return res.status(200).json(result)
}

function buildFilters(queryParams) {
  let filters = {}

  if (queryParams.id) {
    filters['created_by'] = new ObjectId(queryParams.id)
  }

  if (queryParams.private) {
    filters['private'] = queryParams.private === 'true'
  }
  return filters
}

module.exports = { createMovie, getMovies }
