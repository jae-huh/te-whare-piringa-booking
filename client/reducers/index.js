import {combineReducers} from 'redux'

import auth0 from './auth0'
import user from './user'
import redirectTo from './redirect'
import booking from './booking'
import bookings from './bookings'

export default combineReducers({
  auth0,
  user,
  redirectTo,
  booking,
  bookings
})
