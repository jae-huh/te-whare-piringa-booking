const test = require('ava')
const moment = require('moment')

const validate = require('../../server/validation')

const today = new Date()
const tomorrow = new Date(moment(today).add(1, 'days'))
const exampleBooking = {
  fullName: 'Luke Warmwater',
  emailAddress: 'luke@luke.co.nz',
  phoneNumber: '1234567',
  startDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 10),
  endDate: new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 12),
  purpose: 'To do things',
  guestNumber: 1
}
const exampleUser = {
  fullName: 'Jae Bird',
  emailAddress: 'jae@jae.jae',
  phoneNumber: '9876543'
}

test('data validation tests are return a string', t => {
  const expected = 'string'
  const actual = typeof validate.validateBookingDetailsBasic()
  t.is(actual, expected, 'function should return a string')
})

test('check booking data validation returns "ok" when all booking data is valid', t => {
  const booking = Object.create(exampleBooking)
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'valid user data submitted')
})

test('error message returned if name is missing from booking', t => {
  const booking = Object.create(exampleBooking)
  booking.fullName = ''
  const expected = 'Please enter the contact person\'s name'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if phone number is missing from booking', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = ''
  const expected = 'Please enter a contact phone number'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('error message returned if phone number does not contain numbers', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = 'nine one one'
  const expected = 'Please enter a valid phone number'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('error message returned if phone number does not contain enough numbers', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '911'
  const expected = 'Please enter a valid phone number'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('validation passes if phone number is in format 01 234 5678', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '00 000 0000'
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('validation passes if phone number is in format 234 5678', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '000 0000'
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('validation passes if phone number is in format (01) 234 5678', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '(00) 000 0000'
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('validation passes if phone number is in format "01 234 4567 words"', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '078980894 but but please email instead'
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('validation passes if phone number is in format "021 123 4567"', t => {
  const booking = Object.create(exampleBooking)
  booking.phoneNumber = '0211111111'
  const expected = 'ok'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return correct message')
})

test('error message returned if email address is missing from booking', t => {
  const booking = Object.create(exampleBooking)
  booking.emailAddress = ''
  const expected = 'string'
  const actual = typeof validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if email address does not contain an "@" symbol', t => {
  const booking = Object.create(exampleBooking)
  booking.emailAddress = 'atgmaildotcom'
  const expected = 'Please enter a valid email address'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if email address contains a space', t => {
  const booking = Object.create(exampleBooking)
  booking.emailAddress = 'my email is garfield@gmail.com'
  const expected = 'Please enter a valid email address'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if purpose is missing from booking', t => {
  const booking = Object.create(exampleBooking)
  booking.purpose = ''
  const expected = 'Please enter the purpose for the booking'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if start date is missing', t => {
  const booking = Object.create(exampleBooking)
  booking.startDate = null
  const expected = 'Please enter the time and date you want the booking from'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if end date is missing', t => {
  const booking = Object.create(exampleBooking)
  booking.endDate = null
  const expected = 'Please enter the time and date you want the booking until'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if start date is in the past', t => {
  const booking = Object.create(exampleBooking)
  booking.startDate = new Date(99, 1, 1, 11)
  const expected = 'You cannot use a start date/time in the past'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if start date is after end date', t => {
  const booking = Object.create(exampleBooking)
  booking.startDate = new Date(tomorrow.getFullYear(), tomorrow.getMonth(), tomorrow.getDate(), 16)
  const expected = 'Please enter an end date/time that is after the start date/time'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if start date not a round number of minutes', t => {
  const booking = Object.create(exampleBooking)
  booking.startDate = new Date(moment(booking.startDate).add(23, 'minutes'))
  const expected = 'Please enter a start date/time that is either on the hour or on the half hour'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if end date not a round number of minutes', t => {
  const booking = Object.create(exampleBooking)
  booking.endDate = new Date(moment(booking.startDate).add(23, 'seconds'))
  const expected = 'Please enter an end date/time that is either on the hour or on the half hour'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if end date equals start date', t => {
  const booking = Object.create(exampleBooking)
  booking.endDate = booking.startDate
  const expected = 'The minimum booking length is one hour'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned for 30 minute booking', t => {
  const booking = Object.create(exampleBooking)
  booking.endDate = new Date(moment(booking.startDate).add(30, 'minutes'))
  const expected = 'The minimum booking length is one hour'
  const actual = validate.validateBookingDetailsBasic(booking)
  t.is(actual, expected, 'function should return a string')
})

test('check user validation returns "ok" message for a valid user registration', t => {
  const user = Object.create(exampleUser)
  const expected = 'ok'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('check user validation returns a string', t => {
  const user = {}
  const expected = 'string'
  const actual = typeof validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if user did not enter a full name', t => {
  const user = Object.create(exampleUser)
  user.fullName = ''
  const expected = 'Please enter your full name'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if user did not enter an email address', t => {
  const user = Object.create(exampleUser)
  user.emailAddress = ''
  const expected = 'Please enter a contact email address'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if user did not enter a phone number', t => {
  const user = Object.create(exampleUser)
  user.phoneNumber = ''
  const expected = 'Please enter a contact phone number'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if user did not enter a valid email address', t => {
  const user = Object.create(exampleUser)
  user.emailAddress = 'asdf'
  const expected = 'Please enter a valid email address'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})

test('error message returned if user did not enter a valid phone number', t => {
  const user = Object.create(exampleUser)
  user.phoneNumber = '98y3'
  const expected = 'Please enter a valid phone number'
  const actual = validate.validateUserDetailsBasic(user)
  t.is(actual, expected, 'function should return a string')
})