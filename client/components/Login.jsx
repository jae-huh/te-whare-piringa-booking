import React from 'react'
import Auth from '../auth'

function LoginButton (props) {
  const auth = new Auth()
  return (
    <div>
      <h4>
        <a style={{cursor: 'pointer'}} onClick={auth.login}>
          Log In
        </a>
      </h4>
    </div>
  )
}

export default LoginButton
