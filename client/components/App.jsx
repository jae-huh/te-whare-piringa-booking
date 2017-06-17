import React from 'react'

import {Route, BrowserRouter} from 'react-router-dom'
import {connect} from 'react-redux'

import Auth from '../auth'
import Calendar from './Calendar'
import Book from './Book'
import Callback from './Callback'
import history from '../utils/history'
import AdminPortal from './AdminPortal'
import Registration from './Registration'
import Navigation from './Navigation'

import {checkLogin} from '../actions/auth'

function handleAuthentication (cb) {
  const auth = new Auth()
  // if (/access_token|id_token|error/.test(nextState.location.hash)) {
  auth.handleAuthentication(cb)
  // }
}

class App extends React.Component {

  componentDidMount () {
    handleAuthentication(this.props.checkLogin)
  }
  render () {
    return (
      <BrowserRouter history={history} component={App}>
        <div>
          <Route path='/' render={props => (
            <Navigation fullName={this.props.user.fullName} />
          )}/>
          <Route path="/callback" component={Callback} />
          <Route path='/admin' component={AdminPortal} />
          <Route path='/calendar' component={Calendar} />
          <Route path="/book" component={Book} />
          <Route path='/register' component={Registration} />
        </div>
      </BrowserRouter>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    checkLogin: () => dispatch(checkLogin())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
