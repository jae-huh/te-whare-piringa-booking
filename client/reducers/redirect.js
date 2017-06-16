const initialState = ''

const redirectTo = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN':
      return 'calendar'
    case 'NO_USER':
      return 'register'
    default:
      return state
  }
}

export default redirectTo
