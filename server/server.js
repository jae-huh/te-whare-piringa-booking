const express = require('express')
const router = require('./api-router')
const path = require('path')
const bodyParser = require('body-parser')
const cors = require('cors')

const app = express()

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, '../public')))
app.use('/api/v1/', router)

app.use(cors())

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../public/index.html'))
})

module.exports = app
 
