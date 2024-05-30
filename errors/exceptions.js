class BaseError extends Error {
  constructor(message) {
    super(Array.isArray(message) ? message.join(', ') : message)

    this.messageArray = Array.isArray(message) ? message : [message]
  }

  get message() {
    return this.messageArray.join(', ')
  }

  getMessages() {
    return this.messageArray
  }
}

class UnauthorizedError extends BaseError {}

class ValidationError extends BaseError {}

class DuplicatedError extends BaseError {}

module.exports = { DuplicatedError, UnauthorizedError, ValidationError }
