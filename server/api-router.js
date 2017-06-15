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
      if (err) return res.json({error: err})
      db.collection('bookings').find().toArray((err, results) => {
        if (err) return res.json({error: err})
        const filtered = []
        for (let i = 0; i < results.length; i++) {
          filtered.push({anonBooking: {
            startDate: results[i].startDate,
            endDate: results[i].endDate,
            confirmed: results[i].confirmed
          }
          })
        }
        res.json({
          results: filtered
        })
      })
    })
  })

  router.get('/admin/getbookings', (req, res) => {
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return res.json({error: err})
      db.collection('bookings').find().toArray((err, results) => {
        if (err) return res.json({error: err})
        res.json(results)
      })
    })
  })

  router.post('/user/addbooking', (req, res) => {
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return res.json({error: err})
      db.collection('bookings').save(req.body, (err, result) => {
        if (err) return res.json({error: err})
        res.json({id: result.ops[0]._id})
      })
    })
  })

  router.put('/admin/confirm/:id', (req, res) => {
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return res.json({error: err})
      db.collection('bookings').update({_id: ObjectId(req.params.id)}, {$set: {'confirmed': true}}, (err, result) => {
        if (err) {
          return res.json({error: err})
        } else if (result.ok === 1) {
          res.json({updated: true})
        }
      })
    })
  })

  router.post('/user/adduser', (req, res) => {
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return res.json({error: err})
      db.collection('users').save(req.body, (err, result) => {
        if (err) return res.json({error: err})
        res.json({id: result.ops[0]._id})
      })
    })
  })
})
module.exports = router
