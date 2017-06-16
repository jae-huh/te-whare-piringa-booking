import React from 'react'
import {connect} from 'react-redux'
import {logout} from '../actions/auth'

function LogoutButton (props) {
  return (
    <div>
      <h4>
        <a style={{cursor: 'pointer'}} onClick={props.logout}>
          Log Out
        </a>
      </h4>
    </div>
  )
}

function mapDispatchToProps (dispatch) {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null, mapDispatchToProps)(LogoutButton)
