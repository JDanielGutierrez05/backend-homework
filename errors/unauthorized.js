class UnauthorizedError extends Error {
  message

  constructor(message) {
    super(message)
    this.message = message
  }
}

module.exports = UnauthorizedError
