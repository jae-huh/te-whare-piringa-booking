const ObjectId = require('mongodb').ObjectID
const MongoClient = require('mongodb').MongoClient

function anonGetAllBookings (cb) {
  getAllBookings((err, bookings) => {
    bookings = bookings.map(filterOutDetails)
    cb(err, bookings)
  })
}

function userGetAllBookings (authId, cb) {
  getAllBookings((err, bookings) => {
    if (err) return cb(err)
    checkAdminStatus(authId, (err, admin) => {
      if (err) return cb(err)
      if (admin) return cb(null, bookings)
      bookings = bookings.map(booking => {
        if (booking.authId === authId) {
          return booking
        }
        return filterOutDetails(booking)
      })
      cb(null, bookings)
    })
  })
}

function getAllBookings (cb) {
  return getDatabase((err, db) => {
    if (err) return cb(err)
    return db.collection('bookings').find().toArray((err, bookings) => {
      if (err) return cb(err)
      cb(null, bookings)
    })
  })
}

function filterOutDetails (booking) {
  return {
    startDate: booking.startDate,
    endDate: booking.endDate,
    confirmed: booking.confirmed
  }
}

function checkAdminStatus (authId, cb) {
  getUserDetails(authId, (err, user) => {
    if (err) return cb(err)
    cb(null, user.admin)
  })
}

function userAddBooking (booking, authId, cb) {
  booking.confirmed = false
  booking.dateAdded = new Date()
  booking.deleteRequested = false
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').save(booking, (err, result) => {
      if (err) return cb(err)
      userGetAllBookings(authId, (err, bookings) => {
        if (err) return cb(err)
        cb(null, {booking, bookings})
      })
    })
  })
}

function confirmBooking (req, authId, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').update({_id: ObjectId(req.params.id)}, {$set: {'confirmed': true}}, (err, result) => {
      if (err) return cb(err)
      userGetAllBookings(authId, (err, bookings) => {
        if (err) return cb(err)
        cb(null, {result, bookings})
      })
    })
  })
}

function addUser (user, cb) {
  user.dateAdded = new Date()
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').save(user, (err, result) => {
      if (err) return cb(err)
      cb(null, result.ops[0])
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
      cb(err, db)
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

function deleteBooking (id, authId, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('bookings').remove({_id: ObjectId(id)}, (err, result) => {
      if (err) return cb(err)
      userGetAllBookings(authId, (err, bookings) => {
        if (err) return cb(err)
        cb(null, {result, bookings})
      })
    })
  })
}

function makeUserAdmin (email, cb) {
  getDatabase((err, db) => {
    if (err) return cb(err)
    db.collection('users').update({emailAddress: email}, {$set: {'admin': true}}, (err, result) => {
      if (err) return cb(err)
      return cb(null, result)
    })
  })
}

function validateBookingDetailsDetailsBasic (booking) {
  if (!booking) return 'No booking details found'
  if (!booking.fullName) return 'Please enter the contact person\'s name'
  if (!booking.emailAddress) return 'Please enter a contact email address'
  if (!booking.phoneNumber) return 'Please enter a contact phone number'
  if (!booking.purpose) return 'Please enter the purpose for the booking'
  if (!booking.startDate) return 'Please enter the time and date you want the booking from'
  if (!booking.endDate) return 'Please enter the time and date you want the booking until'
  if (booking.startDate > new Date()) return 'You cannot use a start date/time in the past'
  if (booking.startDate > booking.endDate) return 'Please enter an end date/time that is after the start date/time'
  if (booking.startDate.getMinutes() !== 0 && booking.startDate.getMinutes() !== 30) return 'Please enter a start date/time that is either on the hour or on the half hour'
  if (booking.endDate.getMinutes() !== 0 && booking.endDate.getMinutes() !== 30) return 'Please enter an end date/time that is either on the hour or on the half hour'
  if (booking.endDate.getHours() + booking.endDate.getMinutes() / 30 - booking.startDate.getHours() + booking.startDate.getMinutes() / 30 < 1) return 'You cannot make a booking for  is one hour'
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(booking.emailAddress)) return 'Please enter a valid email address'
  if (booking.phoneNumber.replace(/[^0-9]/g,"").length < 7) return 'Please enter a valid phone number'
  return 'ok'
}

function validateUserDetailsDetailsBasic (user) {
  if (!user) return 'No booking details found'
  if (!user.fullName) return 'Please enter your full name'
  if (!user.emailAddress) return 'Please enter a contact email address'
  if (!user.phoneNumber) return 'Please enter a contact phone number'
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(user.emailAddress)) return 'Please enter a valid email address'
  if (user.phoneNumber.replace(/[^0-9]/g,"").length < 7) return 'Please enter a valid phone number'
  return 'ok'
}

module.exports = {
  anonGetAllBookings,
  userGetAllBookings,
  userAddBooking,
  confirmBooking,
  addUser,
  getUsers,
  getUserDetails,
  deleteBooking,
  makeUserAdmin,
  validateBookingDetailsDetailsBasic,
  validateUserDetailsDetailsBasic
}
