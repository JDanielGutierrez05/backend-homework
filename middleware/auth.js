'use strict'

const jwt = require('jsonwebtoken')

function verifyToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) return res.status(401).json({ error: 'Access denied' })
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    res.status(400).json({ error: 'Invalid Token' })
  }
}

module.exports = { verifyToken }
