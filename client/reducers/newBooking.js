const initialState = {
  startDate: new Date(),
  endDate: new Date()
}

const newBooking = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKING':
      return {
        startTime: action.startTime,
        endTime: action.endTime
      }
    default:
      return state
  }
}

export default newBooking
