'use strict'

const { movieSchema } = require('../../utilities/joiSchemas')
const { insert: saveMovie } = require('../../repositories/movies')
const { ObjectId } = require('mongodb')

async function createMovie(req, res) {
  const validation = movieSchema.validate(req.body)

  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details.pop().message })
  }

  const userInfo = extractDataFromToken(req)
  await saveMovie({ ...validation.value, createdBy: new ObjectId(userInfo.id) })
  return res.status(200).json({ message: 'Movie saved succesfully' })
}

function extractDataFromToken(req) {
  const token = req.header('Authorization')
  return JSON.parse(atob(token.split('.')[1]))
}

module.exports = { createMovie }
