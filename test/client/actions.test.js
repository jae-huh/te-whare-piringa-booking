const test = require('ava')

import {makeNewBooking} from '../../client/actions/calendar'

test('test are running', t => {
  t.pass()
})

test('create actions for adding a new booking', t => {
  const dateStart = 1497844905633
  const dateEnd = 1497844905633
  const expected = {
    type: 'NEW_BOOKING',
    dateStart,
    dateEnd
  }
  const actual = makeNewBooking(dateStart, dateEnd)
  t.deepEqual(actual, expected)
})
