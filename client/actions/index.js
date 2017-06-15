import {getBookings} from '../api'

export const RECEIVE_BOOKINGS = 'RECEIVE_BOOKINGS'
export const ERROR_MESSAGE = 'ERROR_MESSAGE'

export const fetchAllBookings = () => {
  return (dispatch, getState) => {
    // dispatch(waitingIndicator()) // replace waitingindicator
    const state = getState()
    if (state.images.length === 0) {
      getBookings((err, res) => {
        if (err) return dispatch(error(err.message))
        dispatch(receiveBookings(res.result))
        // dispatch(notWaiting()) //replace notwaiting
      })
    }
  }
}

export const receiveBookings = bookings => {
  return {
    type: RECEIVE_BOOKINGS,
    bookings
  }
}

export function error (message) {
  return {
    type: ERROR_MESSAGE,
    errorMessage: message
  }
}
