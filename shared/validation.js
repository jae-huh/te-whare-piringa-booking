const moment = require('moment')

const {openingHour, closingHour} = require('./vars')

function validateBookingDetails (booking) {
  if (!booking) return 'No booking details found'
  if (!booking.fullName) return 'Please enter the contact person\'s name'
  if (!booking.emailAddress) return 'Please enter a contact email address'
  if (!booking.phoneNumber) return 'Please enter a contact phone number'
  if (!booking.purpose) return 'Please enter the purpose for the booking'
  if (!booking.startDate) return 'Please enter the time and date you want the booking from'
  if (!booking.endDate) return 'Please enter the time and date you want the booking until'
  const startDate = new Date(booking.startDate)
  const endDate = new Date(booking.endDate)
  if (Object.prototype.toString.call(new Date(startDate)) !== '[object Date]') return 'Please end a start date/time which is in the correct format'
  if (Object.prototype.toString.call(new Date(endDate)) !== '[object Date]') return 'Please end an end date/time which is in the correct format'
  if (startDate < new Date()) return 'You cannot use a start date/time in the past'
  if (startDate > endDate) return 'Please enter an end date/time that is after the start date/time'
  if ((startDate.getMinutes() !== 0 && startDate.getMinutes() !== 30) || startDate.getSeconds() !== 0 || startDate.getMilliseconds() !== 0) return 'Please enter a start date/time that is either on the hour or on the half hour'
  if ((endDate.getMinutes() !== 0 && endDate.getMinutes() !== 30) || endDate.getSeconds() !== 0 || endDate.getMilliseconds() !== 0) return 'Please enter an end date/time that is either on the hour or on the half hour'
  if (endDate < new Date(moment(startDate).add(1, 'hours'))) return 'The minimum booking length is one hour'
  if (!checkEmailFormat(booking.emailAddress)) return 'Please enter a valid email address'
  if (booking.phoneNumber.replace(/[^0-9]/g, '').length < 7) return 'Please enter a valid phone number'
  return 'ok'
}

function validateAgainstOpenHours (booking) {
  const startDate = new Date(booking.startDate)
  const endDate = new Date(booking.endDate)
  if (startDate.getHours() + startDate.getMinutes() / 60 < openingHour) return 'You cannot make a booking that starts that early'
  if (startDate.getHours() + startDate.getMinutes() / 60 >= closingHour) return 'You cannot make a booking that starts that late'
  if (endDate.getHours() + endDate.getMinutes() / 60 <= openingHour) return 'You cannot make a booking that ends that early'
  if (endDate.getHours() + endDate.getMinutes() / 60 > closingHour) return 'You cannot make a booking that ends that late'
  return 'ok'
}

function validateUserDetails (user) {
  if (!user) return 'No booking details found'
  if (!user.fullName) return 'Please enter your full name'
  if (!user.emailAddress) return 'Please enter a contact email address'
  if (!user.phoneNumber) return 'Please enter a contact phone number'
  if (!checkEmailFormat(user.emailAddress)) return 'Please enter a valid email address'
  if (user.phoneNumber.replace(/[^0-9]/g, '').length < 7) return 'Please enter a valid phone number'
  return 'ok'
}

function checkEmailFormat (email) {
  const pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/
  return pattern.test(email)
}

function checkBookingForOverlap (booking, bookings) {
  bookings = bookings.filter(booking => !booking.deleteRequested)
  const startDate1 = (new Date(booking.startDate))
  const endDate1 = (new Date(booking.endDate)).getTime()
  if (bookings.find(compareHours)) return 'Your request overlaps with another booking'
  return 'ok'

  function compareHours (existingBooking) {
    const startDate2 = (new Date(existingBooking.startDate)).getTime()
    const endDate2 = (new Date(existingBooking.endDate)).getTime()
    return (endDate1 > startDate2 && (startDate1 < startDate2 || endDate1 <= endDate2)) || (startDate1 < endDate2 && (endDate1 > endDate2 || startDate1 >= startDate2))
  }
}

module.exports = {
  validateBookingDetails,
  validateUserDetails,
  checkBookingForOverlap,
  validateAgainstOpenHours
}
