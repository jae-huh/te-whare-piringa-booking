import {login} from '../api/index'

export const POSTING_BOOKING = 'POSTING_BOOKING'
export const BOOKINGPOSTED = 'BOOKINGPOSTED'

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
        })
  }
}

function bookingPosted (data) {
  return {
    type: BOOKINGPOSTED,
    data
  }
}
