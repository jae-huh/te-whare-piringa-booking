const express = require('express')
const router = require('./api-router')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/', router)

module.exports = app
