import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Logout from './Logout'

const Navigation = props => {
  return (
  <nav className="navbar">
    <div className="container-fluid">
      <div className="navbar-header">
        <a className="navbar-brand" href="#">Te Whare Piranga Hall</a>
      </div>
      <ul className="nav navbar-nav">
        <li className="active"> <Link to="/book">Book</Link></li>
        <li><Link to="/schedule">Schedule</Link></li>
        <li><Link to="/profile">profile</Link></li>
        <li><Link to="/calendar">Bookings</Link></li>
      </ul>
      <ul className="nav navbar-nav navbar-right">
        {!props.fullName && <Login />}
        {props.fullName && <Logout />}
        <li>{props.admin &&
        <Link to="/admin">Admin</Link>
          }
      </li>
      </ul>
    </div>
  </nav>
  )
}

function mapStateToProps (state) {
  return state.user
}

export default connect(mapStateToProps)(Navigation)
