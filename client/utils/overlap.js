import moment from 'moment'

function compareSlotSelection (chosenSlots, takenSlots) {
  for (let i = 0; i < chosenSlots.length - 1; i++) {
    for (let j = 0; j < takenSlots.length; j++) {
      for (let k = 0; k < takenSlots[j].length - 1; k++) {
        if (chosenSlots[i] === takenSlots[j][k]) {
          return true
        }
      }
    }
  }
}

function takenTimesIntoIntervals (bookings) {
  let slotArr = bookings.map(obj => {
    return intervals(obj.startDate, obj.endDate)
  })
  return slotArr
}

function intervals (startTime, endTime) {
  const start = moment(startTime, 'YYYY-MM-DD hh:mm')
  const end = moment(endTime, 'YYYY-MM-DD hh:mm')

  // round starting minutes up to nearest 30 (26 --> 30, 32 --> 60)
  // note that 59 will round up to 60, and moment.js handles that correctly
  start.minutes(Math.ceil(start.minutes() / 30) * 30)

  const result = []

  const current = moment(start)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (current <= end) {
    result.push(current.format('YYYY-MM-DD HH:mm'))
    current.add(30, 'minutes')
  }

  return result
}

function numberOfIntervals (startTime, endTime) {
  const start = moment(startTime, 'YYYY-MM-DD hh:mm')
  const end = moment(endTime, 'YYYY-MM-DD hh:mm')
  let result = 0
  const current = moment(start)

  start.minutes(Math.ceil(start.minutes() / 60) * 60)

  // eslint-disable-next-line no-unmodified-loop-condition
  while (current <= end) {
    result++
    current.add(60, 'minutes')
  }

  return result
}

export {
  compareSlotSelection,
  takenTimesIntoIntervals,
  intervals,
  numberOfIntervals
}
