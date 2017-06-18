import {login, getAllBookings} from '../api'

export const BOOKINGPOSTED = 'BOOKINGPOSTED'
export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS'
export const UNCONFIRMED = 'UNCONFIRMED'
export const GETTING_DATA = 'GETTING_DATA'
export const RECEIVED_DATA = 'RECEIVED_DATA'
export const ADMINSUCCESS = 'ADMINSUCCESS'
export const ERROR = 'ERROR'

export function newBooking (data) {
  return dispatch => {
    dispatch(gettingData())
    login('post', '/user/addbooking', data)
      .then(res => {
        dispatch(bookingPosted(res.body.booking))
        dispatch(receiveBookings(res.body.bookings))
        dispatch(receivedData())
        sendEmail(res.body.booking)
      })
  }
}

function sendEmail (data) {
  login('post', '/sendemail', data)
  .then()
}

function bookingPosted (booking) {
  booking.startDate = new Date(booking.startDate)
  booking.endDate = new Date(booking.endDate)
  return {
    type: BOOKINGPOSTED,
    booking
  }
}

export const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings: bookings.map(booking => {
      booking.startDate = new Date(booking.startDate)
      booking.endDate = new Date(booking.endDate)
      return booking
    })
  }
}

function errorHandler (error) {
  return {
    type: ERROR,
    error
<<<<<<< HEAD
=======

  }
}
export const fetchBookings = () => {
  return dispatch => {
    dispatch(gettingData())
    getAllBookings(res => {
      let arr = []
      for (let i = 0; i < res.length; i++) {
        const obj = {
          startDate: new Date(res[i].anonBooking.startDate),
          endDate: new Date(res[i].anonBooking.endDate),
          confirmed: res[i].anonBooking.confirmed

        }
        arr.push(obj)
      }
      if (arr.length < 1) return dispatch(errorHandler('No Bookings'))
      dispatch(receiveBookings(arr))
      dispatch(receivedData())
    })
>>>>>>> 394d0bfeebea8585f872e72368a8c4a520b3ea06
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

export function userBookings (authId) {
  return dispatch => {
    dispatch(gettingData())
    login('get', `/user/getbookings/${authId}`)
    .then(res => {
      dispatch(receiveBookings(res.body))
      dispatch(receivedData())
    })
  }
}

export function makeAdmin (email) {
  return dispatch => {
    dispatch(gettingData())
    login('put', `/admin/makeadmin/${email}`)
    .then(res => {
      dispatch(adminSuccess(res))
    })
  }
}

function adminSuccess (res) {
  return {
    type: ADMINSUCCESS,
    res
  }
}
