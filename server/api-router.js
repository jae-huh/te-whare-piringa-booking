const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const router = express.Router()
const nodemailer = require('nodemailer')
const jsonwt = require('jsonwebtoken')
const jwt = require('express-jwt')
const jwksRsa = require('jwks-rsa')

router.use(bodyParser.json())

router.get('/getbookings', (req, res) => {
  db.getAllBookings((err, result) => {
    if (err) return res.json({error: err})
    res.json({result: result})
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

router.get('/testing', (req, res) => {
  const decoded = jsonwt.decode(req.headers.token, {complete: true})
  res.send(decoded.payload.sub)
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
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })

  let subject = 'New Booking'
  let reciever = 'daffron92@gmail.com'
  let sender = 'user@gmail.com'
  const data = req.body

  let mailOptions = {
    from: sender,
    to: reciever,
    subject: subject,
    html: `<h1>New Booking from ${data.fullName}<h1>
    <a href="http://192.168.20.135:3000/admin"><h2>Click here to confirm<h2></a>
    <h3>Full Details</h3>
    Email: ${data.emailAddress}<br>
    Phone: ${data.phoneNumber}<br>
    Start: ${data.startDate}<br>
    End: ${data.endDate}<br>
    Purpose: ${data.purpose}<br>
    Number of Guests: ${data.guestNumber}
    `
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({message: error})
    } else {
      res.json({message: info.response})
    }
  })
})
module.exports = router
