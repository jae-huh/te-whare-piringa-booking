import {combineReducers} from 'redux'

import auth0 from './auth0'
import user from './user'
import redirectTo from './redirect'
import booking from './booking'
import display from './display'
import bookings from './bookings'
import unconfirmed from './unconfirmed'
import adminSuccess from './adminsuccess'
import error from './error'
import waiting from './waiting'

export default combineReducers({
  auth0,
  user,
  redirectTo,
  booking,
  display,
  bookings,
  unconfirmed,
  adminSuccess,
  error,
  waiting
})
