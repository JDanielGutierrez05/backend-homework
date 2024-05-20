function validationMessage(res, validation) {
  if (validation.error) {
    return res
      .status(400)
      .json({ error: validation.error.details.pop().message })
  }
}

module.exports = { validationMessage }
