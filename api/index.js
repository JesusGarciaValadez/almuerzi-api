'use strict'
const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const serverless = require('serverless-http')
const config = require('./config/index')
const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(cors())
app.use('/.netlify/functions/api/meals', meals)
app.use('/.netlify/functions/api/orders', orders)
app.use('/.netlify/functions/api/auth', auth)

module.exports = app;
module.exports.handler = serverless(app)
