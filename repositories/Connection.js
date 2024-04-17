const { MongoClient } = require('mongodb')

let db

async function connect() {
  if (!db) {
    const client = new MongoClient(`mongodb://root:example@database`)
    db = (await client.connect()).db('test')
  }
  return db
}

module.exports = { connect }
