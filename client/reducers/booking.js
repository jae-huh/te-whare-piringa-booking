import {BOOKINGPOSTED} from '../actions/index'
const initialState = {}

const booking = (state = initialState, action) => {
  switch (action.type) {
    case BOOKINGPOSTED:
      return action.data
    default:
      return state
  }
}

export default booking