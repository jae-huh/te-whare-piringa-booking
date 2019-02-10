const nodemailer = require('nodemailer')

const credentials = {
  user: process.env.GMAIL_ADDRESS,
  pass: process.env.GMAIL_PASSWORD
}

function sendNewBookingEmail (req, res, email) {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: credentials
  })

  const subject = 'New Booking'
  const receiver = email
  const sender = 'user@gmail.com'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)
  const mailOptions = {
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
    auth: credentials
  })
  const subject = 'Booking Confirmed'
  const receiver = req.body.emailAddress
  const sender = 'Te Whare Piranga'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)

  const mailOptions = {
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
    auth: credentials
  })
  const subject = 'Delete requested'
  const receiver = email
  const sender = 'Te Whare Piranga'
  const data = req.body
  data.startDate = data.startDate.toString().substring(0, 16)
  data.endDate = data.endDate.toString().substring(0, 16)
  data.startTime = req.body.startDate.toString().substring(16, 21)
  data.endTime = req.body.endDate.toString().substring(16, 21)

  const mailOptions = {
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
