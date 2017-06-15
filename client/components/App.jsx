import React from 'react'

import {Route, BrowserRouter, Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Auth from '../auth'
import Calendar from './Calendar'
import Book from './Book'
import Callback from './Callback'
import history from '../auth/history'
import Login from './Login'
import AdminPortal from './AdminPortal'

import {checkLogin} from '../actions/auth'

function handleAuthentication (nextState, replace) {
  const auth = new Auth()
  // if (/access_token|id_token|error/.test(nextState.location.hash)) {
  auth.handleAuthentication()
  // }
}

const App = props => (
  <BrowserRouter history={history} component={App}>
    <div>
      <Route path="/" render={() => <Login />} />
        <Route path="/callback" render={() => {
          handleAuthentication()
          props.checkLogin()
        }} />
      <Link to="/calender">Bookings</Link>
      <Link to="/admin">Admin</Link>
      <Route path='/admin' component={AdminPortal} />
      <Route path='/calender' component={Calendar} />
      <Route path="/book" component={Book} />
    </div>
  </BrowserRouter>
  )

function mapDispatchToProps (dispatch) {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default connect(null, mapDispatchToProps)(App)
