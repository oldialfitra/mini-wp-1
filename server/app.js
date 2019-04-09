require('dotenv').config()
const express = require('express'),
    app = express(),
    port = process.env.PORT || 5000,
    mongoose = require('mongoose'),
    routerIndex = require('./routes/index')
cors = require('cors')

mongoose.connect('mongodb://localhost:27017/miny-wp-new', { useNewUrlParser: true })
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())

app.use('/', routerIndex)

app.listen(port, function () {
    console.log('Listening on port:', port)
})