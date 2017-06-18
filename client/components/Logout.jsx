import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

function LogoutButton (props) {
  return (
    <a className="nav-links" style={{cursor: 'pointer'}} onClick={props.logout}>
      Log Out
    </a>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
