const express = require('express')
const bodyParser = require('body-parser')
const jsonwt = require('jsonwebtoken')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

const db = require('./db')
const email = require('./email')
const {authDomain, authClientId} = require('../shared/vars')

const router = express.Router()
router.use(bodyParser.json())
module.exports = router

router.get('/getbookings', (req, res) => {
  db.getAnonymousBookings()
    .then(bookings => res.json({bookings}))
    .catch(err => res.status(500).json({error: err}))
})

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the
  // header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://${authDomain}/.well-known/jwks.json`
  }),

  // Validate the audience and the issuer.
  audience: authClientId,
  issuer: `https://${authDomain}/`,
  algorithms: ['RS256']
})

function getUserIdFromToken (req) {
  const token = req.headers.authorization.substr(7)
  const decodedToken = jsonwt.decode(token, {complete: true})
  return decodedToken.payload.sub
}

router.use(checkJwt)

router.use((err, req, res, next) => {
  if (err.name === 'UnauthorizedError') {
    res.status(401).send({error: 'Invalid or missing authorization token'})
  }
})

function sendError (res) {
  return err => res.status(500).json({error: err})
}

router.get('/checklogin', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.getUserDetails(authId)
    .then(user => {
      if (!user) {
        return db.getAnonymousBookings()
          .then(bookings => res.json({user, bookings}))
      }
      return db.getUserBookings(authId)
        .then(bookings => res.json({user, bookings}))
    })
    .catch(sendError(res))
})

router.post('/user/adduser', (req, res) => {
  const user = req.body
  user.authId = getUserIdFromToken(req)

  db.getUserDetails(user.authId)
    .then(details => {
      // if (details) return res.json({error: 'You are already registered', user: userDetails})
      return db.addUser(user)
        .then(userDetails => res.json({user: userDetails}))
    })
    .catch(sendError(res))
})

router.get('/user/getbookings', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.getAllBookings()
    .then(bookings => {
      return bookings.map(booking => {
        const {startDate, endDate} = booking
        return booking.authId === authId ? booking : {startDate, endDate}
      })
    })
    .catch(sendError(res))
})

router.get('/admin/getbookings', (req, res) => {
  db.getAllBookings()
    .then(bookings => res.json(bookings))
    .catch(sendError(res))
})

router.post('/user/addbooking', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.addBooking(req.body, authId)
    .then(bookings => res.json(bookings))
    .catch(sendError(res))

  // What is going on with getAlertEmail?
  // -----------------------------------------
  // db.addBooking(req.body, authId, (err, result) => {
  //   if (err) return res.json({error: err})
  //   res.json(result)
  //   db.getAlertEmail((err, result) => {
  //     if (err) return res.json({error: err})
  //   })
  // })
})

router.put('/admin/confirm/:id', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.confirmBooking(req.params.id, authId)
    .then(bookings => res.json(bookings))
    .catch(sendError(res))
})

router.put('/user/requestdelete/', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.requestDelete(req.body, authId)
    .then(({result, booking}) => res.json({result, booking}))
    .catch(sendError(res))
})

router.put('/admin/makeadmin/:email', (req, res) => {
  const email = req.params.email
  db.makeUserAdmin(email)
    .then(result => res.json(result))
    .catch(sendError(res))
})

router.delete('/admin/delete/', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.deleteBooking(req.body, authId)
    .then(({result, booking}) => res.json({result, booking}))
    .catch(sendError(res))
})

router.get('/user/profile', (req, res) => {
  db.getUsers(req.params.id)
    .then(users => res.json(users))
    .catch(sendError(res))
})

router.post('/sendconfirm', (req, res) => {
  email.confirmedBookingEmail(req, res)
})

router.post('/deleteemail', (req, res) => {
  db.getAlertEmail()
    .then(emails => email.deleteRequestedEmail(req, res, emails[0].email))
    .catch(sendError(res))
})

router.post('/sendemail', (req, res) => {
  db.getAlertEmail()
    .then(emails => email.sendNewBookingEmail(req, res, emails[0].email))
    .catch(sendError(res))
})

router.post('/admin/notificationemail', (req, res) => {
  db.newAlertEmail(req.body)
    .then(result => res.json(result))
    .catch(sendError(res))
})

router.put('/admin/notificationemail', (req, res) => {
  const email = {
    email: Object.keys(req.body)[0]
  }
  db.editAlertEmail(email)
    .then(result => res.json(result))
    .catch(sendError(res))
})
