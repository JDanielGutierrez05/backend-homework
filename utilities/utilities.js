function extractDataFromToken(req) {
  const token = req.header('Authorization')
  return JSON.parse(atob(token.split('.')[1]))
}

function validationMessage(res, validation) {
  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details.pop().message })
  }
}

module.exports = { extractDataFromToken, validationMessage }
