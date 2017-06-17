const initialState = {
  date: new Date(),
  dateStart: new Date(),
  dateEnd: new Date()
}

const display = (state = initialState, action) => {
  switch (action.type) {
    case 'SWITCH_DATE':
      return {
        date: action.date,
        dateStart: state.dateStart,
        dateEnd: state.dateEnd
      }
    case 'NEW_BOOKING':
      return {
        dateStart: action.dateStart,
        dateEnd: action.dateEnd,
        date: state.date
      }
    default:
      return state
  }
}

export default display
