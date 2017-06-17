import {login} from '../api/index'

export const POSTING_BOOKING = 'POSTING_BOOKING'
export const BOOKINGPOSTED = 'BOOKINGPOSTED'
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
