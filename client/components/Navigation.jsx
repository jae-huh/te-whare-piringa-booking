import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Logout from './Logout'

const Navigation = props => {
  return (
    <header className="container container-fluid">
      <nav className="navbar navbar-fixed-top">
        <div className="row">
          <h2 className="nav-menu nav-home-link col-sm-6"><Link className="nav-main-link" to="/">Te Whare Piringa</Link></h2>
          <ul className="col-sm-6 nav navbar-nav">
            <li className="nav-menu"><Link className="nav-links" to="/calendar">Calendar</Link></li>
            <li className="nav-menu"><Link className="nav-links" to="/schedule">Schedule</Link></li>
            <li className="nav-menu"><Link className="nav-links" to="/book">Book</Link></li>
            <li className="nav-menu"><a className="nav-links" href="/#gallery">Gallery</a></li>
            <li className="nav-menu"><a className="nav-links" href="/#about">About</a></li>
            <li className="nav-menu"><a className="nav-links" href="/#contact">Contact</a></li>
            <li className="nav-menu"><Link className="nav-links" to="/profile">Profile</Link></li>
            <li className="nav-menu"><Link className="nav-links" to="/admin">Admin</Link></li>
            <li className="nav-menu">{!props.fullName && <Login />}</li>
            <li className="nav-menu">{props.fullName && <Logout />}</li>
            <li>{props.admin && <Link to="/admin">Admin</Link>}</li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

function mapStateToProps (state) {
  return state.user
}

export default connect(mapStateToProps)(Navigation)
