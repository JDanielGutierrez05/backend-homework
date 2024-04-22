const swaggerJsdoc = require('swagger-jsdoc')

const options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'Backend Homework',
      version: '1.0.0',
      description: 'By Juan Daniel Gutierrez Botero',
    },
  },
  apis: ['./routes/*.js'],
}

const swaggerSpec = swaggerJsdoc(options)

module.exports = swaggerSpec
