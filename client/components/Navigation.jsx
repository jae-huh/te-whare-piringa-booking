import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Logout from './Logout'
import Waiting from './Waiting'

const Navigation = props => {
  return (
    <header className="navigation">
      <nav className="">
        <div className="navigation-div">
          <ul className="navigation-list-titles">
            <li className="navigation-list-title"><h2 className=""><Link className="navigation-home-link" to="/">Te Whare Piringa</Link></h2></li>
            <li className="navigation-list-title">{props.waiting && <Waiting /> }</li>
          </ul>
          <ul className="navigation-list">
            <Link className="navigation-list-link" to="/calendar"><li className="navigation-list-item">Calendar</li></Link>
            <Link className="navigation-list-link" to="/schedule"><li className="navigation-list-item">Schedule</li></Link>
            <Link className="navigation-list-link" to="/book"><li className="navigation-list-item">Book</li></Link>
            <a className="navigation-list-link" href="/#gallery"><li className="navigation-list-item">Gallery</li></a>
            <a className="navigation-list-link" href="/#about"><li className="navigation-list-item">About</li></a>
            <a className="navigation-list-link" href="/#contact"><li className="navigation-list-item">Contact</li></a>
            {props.user.fullName && <Link className="navigation-list-link" to="/profile"><li className="navigation-list-item">Profile</li></Link>}
            {props.user.admin && <Link className="navigation-list-link" to="/admin"><li className="navigation-list-item">Admin</li></Link>}
            {!props.user.fullName && <a className="navigation-list-link" style={{cursor: 'pointer'}}><Login /></a>}
            {props.user.fullName && <a className="navigation-list-link" style={{cursor: 'pointer'}}><Logout /></a>}
          </ul>
        </div>
      </nav>
    </header>
  )
}

function mapStateToProps (state) {
  return {
    user: state.user,
    waiting: state.waiting
  }
}

export default connect(mapStateToProps)(Navigation)
