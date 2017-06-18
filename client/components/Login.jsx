import React from 'react'
import Auth from '../auth'

function LoginButton (props) {
  const auth = new Auth()
  return (
    <li className="navigation-list-item" onClick={auth.login}>
      Log In
    </li>
  )
}

export default LoginButton
