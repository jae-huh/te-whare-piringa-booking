import React from 'react'
import {Route, BrowserRouter} from 'react-router-dom'
import Login from './Login'
import Callback from './Callback'
import Auth from '../auth'
import history from '../auth/history'

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
        console.log('hi')
        handleAuthentication(props)
        return <Callback {...props} />
      }}/>
    </div>
  </BrowserRouter>
  )

export default App
