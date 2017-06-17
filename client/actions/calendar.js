export function switchDate (date) {
  return {
    type: 'SWITCH_DATE',
    date
  }
}

export function makeNewBooking (dateStart, dateEnd) {
  return {
    type: 'NEW_BOOKING',
    dateStart,
    dateEnd
  }
}
