const Joi = require('joi')

const userSchema = Joi.object().keys({
  user: Joi.string().email(),
  password: [
    Joi.string()
      .min(10)
      .pattern(
        new RegExp(/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*\W)(?!.* ).{10,}$/)
      )
      .required()
      .messages({
        'string.min': 'Password must have at least 10 characters',
        'string.pattern.base':
          'Password must have at least 10 characters, one lowercase letter, one uppercase letter and one of the following characters: !, @, #, ? or ].',
      }),
  ],
})

const movieSchema = Joi.object().keys({
  name: Joi.string().min(5).required(),
  year: Joi.number().required(),
  director: Joi.string().min(5).required(),
  company: Joi.string().min(2).required(),
  private: Joi.boolean().required(),
})

module.exports = { movieSchema, userSchema }
