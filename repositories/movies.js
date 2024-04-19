const { connect } = require('./Connection.js')

async function insert(movie) {
  const db = await connect()
  return await db.collection('movies').insertOne(movie)
}

module.exports = { insert }
