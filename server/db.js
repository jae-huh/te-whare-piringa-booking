const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient

function getAllBookings (req, res, cb) {
  const filtered = []
  getDatabase((err, db) => {
    if (err) return console.log("err:", err)
    db.collection('bookings').find().toArray((err, results) => {
      if (err) return {error: err}
      for (let i = 0; i < results.length; i++) {
        filtered.push({anonBooking: {
          startDate: results[i].startDate,
          endDate: results[i].endDate,
          confirmed: results[i].confirmed}
        })
      }
      cb(null, filtered)
    })
  })
}
function adminGetAllBookings (req, res, cb) {
  getDatabase((err, db) => {
    if (err) return console.log("err:", err)
    db.collection('bookings').find().toArray((err, results) => {
      if (err) return {error: err}
      cb(null, results)
    })
  })
}

function userAddBooking (data, res, cb) {
  // if (!validate(req.body)) {
  //   return cb({error: 'imcomplete'})
  // }
  getDatabase((err, db) => {
    if (err) return console.log("err:", err)
  
    db.collection('bookings').save(data, (err, result) => {
      if (err) return res.json({error: err})
      cb(null, {id: result.ops[0]._id})
    })
  })
}

function confirmBooking (req, res, cb) {
  getDatabase((err, db) => {
    if (err) return console.log("err:", err)
    db.collection('bookings').update({_id: ObjectId(req.params.id)}, {$set: {'confirmed': true}}, (err, result) => {
      if (err) {
        return res.json({error: err})
      } else if (result.ok === 1) {
        cb({updated: true})
      }
    })
  })
}

function addUser (user, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').save(user, (err, result) => {
      if (err) return cb(err)
      console.log('result from db', result)
      cb(null, result.ops[0])
    })
  })
}

function filterUnconfirmed (data, cb) {
  const arr = []
  for (let i = 0; i < data.length; i++) {
    if (!data[i].confirmed) {
      arr.push(data[i])
    }
  }
  cb(arr)
}

function checkUsersForExisting (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      for (let i = 0; i < results.length; i++) {
        if (results[i].authId === id) {
          return cb(null, true)
        }
      }
      cb(null, false)
    })
  })
}

function getUsers (id, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      cb(null, results)
    })
  })
}

function getDatabase (cb) {
  MongoClient.connect(process.env.MONGODB_URI, (err, database) => {
    if (err) return cb(err)
    const db = database.db('admin') // To be changed before deployment to a database for production
    db.authenticate(process.env.DB_USER, process.env.DB_PW, (err, result) => {
      if (err) return {error: err}
      cb(null, db)
    })
  })
}

function getUserDetails (authId, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').find().toArray((err, results) => {
      if (err) return cb(err)
      const userDetails = results.find(user => user.authId === authId)
      return cb(null, userDetails)
    })
  })
}

function validate (obj) {
  Object.values.map(item => {
    if (item) {
      return true
    } else {
      return false
    }
  })
}

module.exports = {
  getAllBookings,
  adminGetAllBookings,
  userAddBooking,
  confirmBooking,
  addUser,
  filterUnconfirmed,
  checkUsersForExisting,
  getUsers,
  getUserDetails
}
