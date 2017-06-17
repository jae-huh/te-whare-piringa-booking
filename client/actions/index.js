import {login, getAllBookings} from '../api'

export const BOOKINGPOSTED = 'BOOKINGPOSTED'
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS'
export const UNCONFIRMED = 'UNCONFIRMED'
export const GETTING_DATA = 'GETTING_DATA'
export const RECEIVED_DATA = 'RECEIVED_DATA'

export function newBooking (data) {
  return dispatch => {
    dispatch(gettingData())
    login('post', '/user/addbooking', data)
        .then(res => {
          dispatch(bookingPosted(res.body))
          dispatch(sendEmail(res.body))
          dispatch(receivedData())
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
    dispatch(gettingData())
    getAllBookings((err, res) => {
      if (err) return
      dispatch(receiveBookings(res))
      dispatch(receivedData())
    })
  }
}

export const gettingData = () => {
  return {
    type: GETTING_DATA
  }
}

export const receivedData = () => {
  return {
    type: RECEIVED_DATA
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

export function confirm (id) {
  return dispatch => {
    login('put', `/admin/confirm/${id}`)
    .then(res => {
      if (res.ok) return dispatch(getUnconfirmed())
    })
  }
}

export function deleteBooking (id) {
  return dispatch => {
    login('delete', `/admin/delete/${id}`)
    .then(res => {
      if (res) return dispatch(getUnconfirmed())
    })
  }
}

