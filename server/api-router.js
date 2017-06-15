const express = require('express')
const bodyParser = require('body-parser')
const db = require('./db')
const router = express.Router()
const nodemailer = require('nodemailer')

router.use(bodyParser.json())

router.get('/getbookings', (req, res) => {
  db.getAllBookings(req, res, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.get('/admin/getbookings', (req, res) => {
  db.adminGetAllBookings(req, res, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.post('/user/addbooking', (req, res) => {
  db.userAddBooking(req, res, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.put('/admin/confirm/:id', (req, res) => {
  db.confirmBooking(req, res, (err, result) => {
    if (err) return res.json({error: err})
    res.json(result)
  })
})

router.post('/user/adduser', (req, res) => {
  db.addUser(req, res, (err, result) => {
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
