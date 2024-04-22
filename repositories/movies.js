const { connect } = require('./Connection.js')
const { ObjectId } = require('mongodb')

async function insert(movie) {
  const db = await connect()
  return await db.collection('movies').insertOne(movie)
}

async function findByFilters(filters) {
  const db = await connect()
  return await db.collection('movies').find(filters).toArray()
}

async function update(id, data) {
  const db = await connect()
  return await db.collection('movies').findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        ...data,
        updated_at: new Date(),
      },
    },
    {
      returnDocument: 'after',
    }
  )
}

async function deleteM(id) {
  const db = await connect()
  return await db.collection('movies').findOneAndUpdate(
    {
      _id: new ObjectId(id),
    },
    {
      $set: {
        deleted_at: new Date(),
      },
    }
  )
}

module.exports = { deleteM, findByFilters, insert, update }
