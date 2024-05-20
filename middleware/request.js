function extractDataFromToken(req, res, next) {
  const token = req.header('Authorization')
  req.userInfo = JSON.parse(atob(token.split('.')[1]))
  next()
}

module.exports = { extractDataFromToken }
