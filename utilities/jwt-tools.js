const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
  return jwt.sign({ id: user._id, user: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  })
}

module.exports = { generateAccessToken }
