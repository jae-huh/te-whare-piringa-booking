import React from 'react'
import {Link} from 'react-router-dom'

import Login from './Login'
import Logout from './Logout'

const Navigation = props => {
  return (
    <div>
      {!props.fullName && <Login />}
      {props.fullName && <Logout />}
      <Link to="/calendar">Bookings</Link>
      <Link to="/admin">Admin</Link>
      <Link to="/book">Book</Link>
    </div>
  )
}

export default Navigation
