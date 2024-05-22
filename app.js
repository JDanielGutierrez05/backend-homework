let express = require('express')
let logger = require('morgan')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swaggerConfig')
const { errorHandler } = require('./middleware/errorHandler')

const { verifyToken } = require('./middleware/auth')
const { extractDataFromToken } = require('./middleware/request')

let usersRouter = require('./routes/users')
let authRouter = require('./routes/auth')
let moviesRouter = require('./routes/movies')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/users', usersRouter)
app.use('/login', authRouter)

// TODO: add other middleware to extract user info and inject to the request
app.use('/movies', [verifyToken, extractDataFromToken], moviesRouter)

// error handler
app.use(errorHandler)

module.exports = app
