const express = require('express')
const bodyParser = require('body-parser')
const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient

const router = express.Router()

router.use(bodyParser.json())
let db
MongoClient.connect('mongodb://localhost:27017', (err, database) => {
  if (err) return console.log(err)
  db = database.db('admin') // To be changed before deployment to a database for production

// Everything inside here
})
module.exports = router
