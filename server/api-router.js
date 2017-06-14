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
  console.log('connected to:', db.s.databaseName)

  router.get('/getbookings', (req, res) => {
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return console.log (err)
      db.collection('bookings').find().toArray((err, results) => {
        if (err) return console.log(err)
        const testData = {
          id: 1,
          date: new Date().toLocaleDateString('en-GB')
        }
        res.json({testData})
      })
    })
  })
})
module.exports = router
