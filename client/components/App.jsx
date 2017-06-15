import React from 'react'
import {connect} from 'react-redux'
import {Route, BrowserRouter} from 'react-router-dom'

import Auth from '../auth'
import Calendar from './Calendar'
import history from '../auth/history'
import Login from './Login'
import {checkLogin} from '../actions/auth'

function handleAuthentication (nextState, replace) {
  const auth = new Auth()
  if (/access_token|id_token|error/.test(nextState.location.hash)) {
    auth.handleAuthentication()
  }
}

function App (props) {
  return (
    <BrowserRouter history={history} component={App}>
      <div>
        <Route path="/" render={() => <Login />} />
        <Route path="/callback" render={() => handleAuthentication(props.checkLogin)} />
        }}/>
        <Calendar />
      </div>
    </BrowserRouter>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default connect(null, mapDispatchToProps)(App)
