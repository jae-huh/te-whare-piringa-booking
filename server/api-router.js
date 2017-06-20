const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const email = require('./email')
const router = express.Router()
const jsonwt = require('jsonwebtoken')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

router.use(bodyParser.json())

router.get('/getbookings', (req, res) => {
  db.anonGetAllBookings((err, bookings) => {
    if (err) return res.json({error: err})
    return res.json({bookings})
  })
})

const checkJwt = jwt({
  // Dynamically provide a signing key based on the kid in the header and the singing keys provided by the JWKS endpoint.
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: 'https://luke-davison.au.auth0.com/.well-known/jwks.json'
  }),

  // Validate the audience and the issuer.
  audience: 'WCPEyjdLQW37sKZfBMFYNNisB6oyrGdD',
  issuer: 'https://luke-davison.au.auth0.com/',
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

router.get('/checklogin', (req, res) => {
  const authId = getUserIdFromToken(req)
  return db.getUserDetails(authId, (err, user) => {
    if (err) return res.json({error: err})
    if (!user) {
      return db.anonGetAllBookings((err, bookings) => {
        if (err) return res.json({error: err})
        return res.json({user, bookings})
      })
    }
    return db.userGetAllBookings(authId, (err, bookings) => {
      if (err) return res.json({error: err})
      return res.json({user, bookings})
    })
  })
})

router.post('/user/adduser', (req, res) => {
  const user = req.body
  user.authId = getUserIdFromToken(req)
  return db.getUserDetails(user.authId, (err, userDetails) => {
    if (err) return res.json({error: err})
    // if (userDetails) return res.json({error: 'You are already registered', user: userDetails})
    return db.addUser(user, (err, userDetails) => {
      if (err) return res.json({error: err})
      return res.json({user: userDetails})
    })
  })
})

router.get('/user/getbookings', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.adminGetAllBookings((err, result) => {
    if (err) return res.json({error: err})
    const output = result.map(item => {
      if (item.authId === authId) {
        return item
      }
      return {
        startDate: item.startDate,
        endDate: item.endDate
      }
    })
    res.json(output)
  })
})

router.get('/admin/getbookings', (req, res) => {
  db.adminGetAllBookings((err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.post('/user/addbooking', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.userAddBooking(req.body, authId, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/admin/confirm/:id', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.confirmBooking(req, authId, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/user/requestdelete/:id', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.requestDelete(req, authId, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/admin/makeadmin/:email', (req, res) => {
  const email = req.params.email
  db.makeUserAdmin(email, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.delete('/admin/delete/:id', (req, res) => {
  const authId = getUserIdFromToken(req)
  db.deleteBooking(req.params.id, authId, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/user/profile', (req, res) => {
  db.getUsers(req.params.id, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.post('/sendemail', (req, res) => {
  db.getAlertEmail((err, result) => {
    if (err) return res.json({error: err})
    email.sendNewBookingEmail(req, res, result[0].email)
  })
})

router.post('/sendconfirm', (req, res) => {
  email.confirmedBookingEmail(req, res)
})

router.post('/admin/notificationemail', (req, res) => {
  db.newAlertEmail(req, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/admin/notificationemail', (req, res) => {
  const email = {
    email: Object.keys(req.body)[0]
  }
  db.editAlertEmail(email, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

module.exports = router
