const { connect } = require('./Connection.js')

async function insert(user) {
  const db = await connect()
  return await db.collection('users').insertOne(user)
}

async function findByEmail(email) {
  const db = await connect()
  return await db.collection('users').findOne({
    email: email,
  })
}

module.exports = { findByEmail, insert }
