const { MongoClient } = require('mongodb')

let db

async function connect() {
  if (!db) {
    const client = new MongoClient(
      `mongodb://${process.env.DB_USERNAME}:${encodeURI(
        process.env.DB_PASSWORD
      )}@${process.env.DB_HOST}`
    )
    db = (await client.connect()).db(process.env.DB_DATABASE)
  }
  return db
}

module.exports = { connect }
