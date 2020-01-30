require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const  { NODE_ENV, DATABASE_URL } = require('./config.js')
const woodsRouter = require('./woods/woods-router')
const authRouter = require('./auth/auth-router')
const usersRouter = require('./users/users-router')
const submissionsRouter = require('./submissions/submissions-router')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
app.use(cors())
app.use(helmet())

app.use('/api/woods', woodsRouter)
app.use('/api/auth', authRouter)
app.use('/api/users', usersRouter)
app.use('/api/submissions', submissionsRouter)

app.get('/', (req, res) => {

    res.send('Hello, world!')
})

app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error'}}
    } else {
        console.error(error)
        response = { message: error.message, error }
    }
    res.status(500).json(response)
})

module.exports = app