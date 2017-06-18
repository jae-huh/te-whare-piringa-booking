import React from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'

import Login from './Login'
import Logout from './Logout'
import Waiting from './Waiting'

const Navigation = props => {
  return (
    // <header className="container container-fluid">
    //   <nav className="navbar navbar-fixed-top">
    //     <div className="row">
    //       <h2 className="nav-menu nav-home-link col-sm-6"><Link className="nav-main-link" to="/">Te Whare Piringa</Link>{props.waiting && <Waiting /> }</h2>
    //       <ul className="col-sm-6 nav navbar-nav">
    //         <li className="nav-menu"><Link className="nav-links" to="/calendar">Calendar</Link></li>
    //         <li className="nav-menu"><Link className="nav-links" to="/schedule">Schedule</Link></li>
    //         <li className="nav-menu"><Link className="nav-links" to="/book">Book</Link></li>
    //         <li className="nav-menu"><a className="nav-links" href="/#gallery">Gallery</a></li>
    //         <li className="nav-menu"><a className="nav-links" href="/#about">About</a></li>
    //         <li className="nav-menu"><a className="nav-links" href="/#contact">Contact</a></li>
    //         <li className="nav-menu"><Link className="nav-links" to="/profile">Profile</Link></li>
    //         <li className="nav-menu">{props.user.admin && <Link className="nav-links" to="/admin">Admin</Link>}</li>
    //         <li className="nav-menu">{!props.user.fullName && <Login />}</li>
    //         <li className="nav-menu">{props.user.fullName && <Logout />}</li>
    //       </ul>
    //     </div>
    //   </nav>
    // </header>
    <header className="navigation">
      <nav className="">
        <div className="navigation-div">
          <h2 className=""><Link className="navigation-home-link" to="/">Te Whare Piringa</Link>{props.waiting && <Waiting /> }</h2>
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
