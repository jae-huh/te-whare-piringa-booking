const initialState = {
  date: new Date()
}

const display = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_DATE':
      return {date: action.date}
    default:
      return state
  }
}

export default display
