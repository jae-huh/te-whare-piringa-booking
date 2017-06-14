const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())
var ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient
let db
MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('admin')

//Everything inside here
})

module.exports = router