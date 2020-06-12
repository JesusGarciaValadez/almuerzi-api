const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')
const config = require('./config/index')
const meals = require('./routes/meals')
const orders = require('./routes/orders')
const auth = require('./routes/auth')

mongoose.connect(config.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser.json())
app.use(cors())
app.use('/api/meals', meals)
app.use('/api/orders', orders)
app.use('/api/auth', auth)
app.listen(3000)

module.exports = app;
