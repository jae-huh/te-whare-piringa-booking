const initialState = false

const waiting = (state = initialState, action) => {
  switch (action.type) {
    case 'WAITING':
      return true
    case 'NOT_WAITING':
      return false
    default:
      return state
  }
}

export default waiting
