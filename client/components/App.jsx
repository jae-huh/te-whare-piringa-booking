import React from 'react'
import {Route, BrowserRouter, Link} from 'react-router-dom'

import Auth from '../auth'
import Calendar from './Calendar'
import Callback from './Callback'
import history from '../auth/history'
import Login from './Login'
import AdminPortal from './AdminPortal'

const auth = new Auth()

const handleAuthentication = (nextState, replace) => {
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

const App = () => (
  <BrowserRouter history={history} component={App}>
    <div>
      <Route path="/" render={() => <Login auth={auth} />} />
      <Route path="/callback" render={props => {
        handleAuthentication(props)
        return <Callback {...props} />
      }}/>
      <Link to="/calender">Bookings</Link>
      <Link to="/admin">Admin</Link>
      <Route path='/admin' component={AdminPortal} />
      <Route path='/calender' component={Calendar} />
    </div>
  </BrowserRouter>
  )

export default App
