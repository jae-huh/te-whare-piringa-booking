import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

function LogoutButton (props) {
  return (
    <li className="navigation-list-item" onClick={props.logout}>
      Log Out
    </li>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
