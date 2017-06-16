// const checkScopes = jwtAuthz(['read:messages']);

// app.get('/api/public', function(req, res) {
//   res.json({
//     message: "Hello from a public endpoint! You don't need to be authenticated to see this."
//   });
// });

// app.get('/api/private', checkJwt, checkScopes, function(req, res) {
//   res.json({
//     message: 'Hello from a private endpoint! You need to be authenticated and have a scope of read:messages to see this.'
//   });
// });

// app.listen(3001);
// console.log('Listening on http://localhost:3001');

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
  db.getAllBookings(req, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
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
  console.log(req.headers.token)
  const decoded = jsonwt.decode(req.headers.token, {complete: true})
  console.log(decoded)
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
    db.getUserDetails(authId, (err, userDetails) => {
    if (err) return res.json({error: err})
    res.json({user: userDetails})
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

router.get('/admin/getbookings', (req, res) => {
  db.adminGetAllBookings(req, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/admin/getunconfirmed', (req, res) => {
  db.adminGetAllBookings(req, (err, result) => {
    if (err) return res.json({error: err})
    db.filterUnconfirmed(result, filtered => {
      res.json(filtered)
    })
  })
})

router.post('/user/addbooking', (req, res) => {
  db.userAddBooking(req.body, res, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/admin/confirm/:id', (req, res) => {
  db.confirmBooking(req, (err, result) => {
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

  let subject = 'test email'
  let reciever = 'daffron92@gmail.com'
  let sender = 'user@gmail.com'

  let mailOptions = {
    from: sender,
    to: reciever,
    subject: subject,
    html: '<b>Hello world</b>'
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
