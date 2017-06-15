import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'

import Auth from '../auth'
import Calendar from './Calendar'
import Book from './Book'
import Callback from './Callback'
import history from '../auth/history'
import Login from './Login'

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
      <Route path="/book" component={Book} />
      <Calendar />
    </div>
  </BrowserRouter>
  )

export default App
