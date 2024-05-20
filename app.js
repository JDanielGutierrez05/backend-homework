let createError = require('http-errors')
let express = require('express')
let logger = require('morgan')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swaggerConfig')

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

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.send(err.message)
})

module.exports = app
