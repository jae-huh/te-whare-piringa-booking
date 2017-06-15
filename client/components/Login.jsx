import React, {Component} from 'react'

class Login extends Component {
  login () {
    this.props.auth.login()
  }
  logout () {
    this.props.auth.logout()
  }
  render () {
    const {isAuthenticated} = this.props.auth
    return (
      <div className="container">
        {
          isAuthenticated() && (
              <h4>
                You are logged in! 
                <a 
                  style={{cursor: 'pointer'}}
                  onClick={this.logout.bind(this)}>
                  Log out
                </a>
              </h4>
            )
        }
        {
          !isAuthenticated() && (
              <h4>
                You are not logged in! Please{' '}
                <a
                  style={{cursor: 'pointer'}}
                  onClick={this.login.bind(this)}
                >  Log In
                </a>
                {' '}to continue.
              </h4>
            )
        }
      </div>
    )
  }
}

export default Login
