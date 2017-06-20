import moment from 'moment'

const initialState = {
  startDate: moment(new Date()).format('DD/MM/YYYY'),
  startTime: '10:00',
  endDate: moment(new Date()).format('DD/MM/YYYY'),
  endTime: '14:00'
}

const newBooking = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_BOOKING':
      return action.newDateAndTime
    default:
      return state
  }
}

export default newBooking
