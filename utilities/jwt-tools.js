const jwt = require('jsonwebtoken')

function generateAccessToken(user) {
  return jwt.sign({ id: user._id }, process.env.TOKEN_SECRET, {
    expiresIn: process.env.TOKEN_EXPIRATION_TIME,
  })
}

function verifyToken(req, res, next) {
  const token = req.header('auth-token')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET)
    req.user = verified
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' })
  }
}

module.exports = { generateAccessToken, verifyToken }
