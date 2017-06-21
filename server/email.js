const nodemailer = require('nodemailer')

function sendNewBookingEmail (req, res, email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })

  let subject = 'New Booking'
  let receiver = email
  let sender = 'user@gmail.com'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)
  let mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    html: `<h1>New Booking from ${data.fullName}<h1>
    <a href="http://192.168.20.135:3000/admin"><h2>Click here to confirm<h2></a>
    <h3>Full Details</h3>
    Email: ${data.emailAddress}<br>
    Phone: ${data.phoneNumber}<br>
    Start: ${data.startDate} &nbsp;${data.startTime}<br>
    End: ${data.endDate} &nbsp; ${data.endTime}<br>
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
}

function confirmedBookingEmail (req, res) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })
  let subject = 'Booking Confirmed'
  let receiver = req.body.emailAddress
  let sender = 'Te Whare Piranga'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)

  let mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    html: `<h1>Booking Confirmed, ${data.fullName}<h1>
    <h3>Full Details</h3>
    Email: ${data.emailAddress}<br>
    Phone: ${data.phoneNumber}<br>
    Start: ${data.startDate}  ${data.startTime}<br>
    End: ${data.endDate} ${data.endTime}<br>
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
}

function deleteRequestedEmail (req, res, email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASS
    }
  })
  let subject = 'Delete requested'
  let receiver = email
  let sender = 'Te Whare Piranga'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)

  let mailOptions = {
    from: sender,
    to: receiver,
    subject: subject,
    html: `<h1>Delete Requested for ${data.fullName}<h1>
    <h3>Full Details</h3>
    Email: ${data.emailAddress}<br>
    Phone: ${data.phoneNumber}<br>
    Start: ${data.startDate}  ${data.startTime}<br>
    End: ${data.endDate} ${data.endTime}<br>
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
}

module.exports = {
  sendNewBookingEmail,
  confirmedBookingEmail,
  deleteRequestedEmail
}
