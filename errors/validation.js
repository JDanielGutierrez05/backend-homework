class ValidationError extends Error {
  message

  constructor(message) {
    super(message)
    this.message = message
  }
}

module.exports = ValidationError
