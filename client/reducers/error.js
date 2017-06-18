import {ERROR} from '../actions'

const initialState = []

const error = (state = initialState, action) => {
  switch (action.type) {
    case ERROR:
      return action.error

    default:
      return state
  }
}

export default error
