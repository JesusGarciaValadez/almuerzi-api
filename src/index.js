const app = require('express')()
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

mongoose.connect('', { useNewUrlParser: true, useUnifiedTopology: true })

app.use(bodyParser);

module.exports(app);
