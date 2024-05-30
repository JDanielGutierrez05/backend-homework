'use strict'

const jwt = require('jsonwebtoken')
const { UnauthorizedError } = require('../errors/exceptions')

function verifyToken(req, res, next) {
  const token = req.header('Authorization')
  if (!token) throw new UnauthorizedError('Invalid Token')
  try {
    jwt.verify(token, process.env.TOKEN_SECRET)
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = verifyToken
