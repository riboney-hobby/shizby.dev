const express = require('express')
const timeout = require('connect-timeout')
require('express-async-errors')

const router = require('./router')
const mw = require('./middleware')

const app = express()

app.use(timeout(3000))
app.use(express.json())
app.use(mw.httpTimeout)
app.use(router)
app.use(mw.errorLogger)
app.use(mw.errorHandler)

module.exports = app