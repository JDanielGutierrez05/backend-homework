const { connect } = require('./Connection.js')

async function insert(user) {
  const db = await connect()
  return await db.collection('users').insertOne(user)
}

module.exports = { insert }
