import {login} from '../api/index'

export const LOADING = 'LOADING'
export const BOOKINGPOSTED = 'BOOKINGPOSTED'

function loading () {
  return {
    type: LOADING
  }
}

export function newBooking (data) {
  return dispatch => {
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
