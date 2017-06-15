const initialState = { }

const bookings = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_BOOKINGS':
      return action.bookings

    default:
      return state
  }
}

export default bookings
