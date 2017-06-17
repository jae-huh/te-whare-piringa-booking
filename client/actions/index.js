import {login, getAllBookings} from '../api'

export const POSTING_BOOKING = 'POSTING_BOOKING'
export const BOOKINGPOSTED = 'BOOKINGPOSTED'
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS'

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
  }
}
