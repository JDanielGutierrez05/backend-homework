let express = require('express')
let logger = require('morgan')

const { userSchema } = require('./validation/schemas')

const swaggerUi = require('swagger-ui-express')
const swaggerSpec = require('./swaggerConfig')
const errorHandler = require('./middleware/error')
const extractDataFromToken = require('./middleware/request')
const validateFields = require('./middleware/validation')
const verifyToken = require('./middleware/auth')

let usersRouter = require('./routes/users')
let authRouter = require('./routes/auth')
let moviesRouter = require('./routes/movies')

let app = express()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))
app.use('/users', validateFields(userSchema), usersRouter)
app.use('/auth', authRouter)
app.use('/movies', [verifyToken, extractDataFromToken], moviesRouter)

app.use(errorHandler)

module.exports = app
