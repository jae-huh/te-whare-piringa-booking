import React from 'react'
import {Route, BrowserRouter, Link} from 'react-router-dom'

import Auth from '../auth'
import Calendar from './Calendar'
import Book from './Book'
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
<<<<<<< HEAD
      <Link to="/calender">Bookings</Link>
      <Link to="/admin">Admin</Link>
      <Route path='/admin' component={AdminPortal} />
      <Route path='/calender' component={Calendar} />
=======
      <Route path="/book" component={Book} />
      <Calendar />
>>>>>>> 460db19df16b96de5d6ac181860cb13129b68ad6
    </div>
  </BrowserRouter>
  )

export default App
