import {login, getAllBookings} from '../api'

export const POSTING_BOOKING = 'POSTING_BOOKING'
export const BOOKINGPOSTED = 'BOOKINGPOSTED'
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS'
export const UNCONFIRMED = 'UNCONFIRMED'

function postingBooking () {
  return {
    type: POSTING_BOOKING
  }
}

export function newBooking (data) {
  return dispatch => {
    dispatch(postingBooking())
    login('post', '/user/addbooking', data)
        .then(res => {
          dispatch(bookingPosted(res.body))
          dispatch(sendEmail(res.body))
        })
  }
}

function sendEmail (data) {
  login('post', '/sendemail', data)
  .then(f => f)
}

function bookingPosted (data) {
  return {
    type: BOOKINGPOSTED,
    data
  }
}

export const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings: bookings
  }
}

export const fetchBookings = () => {
  return dispatch => {
    getAllBookings((err, res) => {
      if (err) return
      dispatch(receiveBookings(res))
    })

export function getUnconfirmed () {
  return dispatch => {
    login('get', '/admin/getunconfirmed')
    .then(res => {
      dispatch(unconfirmed(res.body))
    })
  }
}

function unconfirmed (data) {
  return {
    type: UNCONFIRMED,
    data
  }
}
