const { connect } = require('./Connection.js')

async function insert(movie) {
  const db = await connect()
  return await db.collection('movies').insertOne(movie)
}

async function findByFilters(filters) {
  const db = await connect()
  return await db.collection('movies').find(filters).toArray()
}

module.exports = { findByFilters, insert }
