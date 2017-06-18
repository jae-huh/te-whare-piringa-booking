import React from 'react'
import {connect} from 'react-redux'
import {makeAdmin} from '../actions/index'

class Settings extends React.Component {
  constructor (props) {
    super(props)
    this.state = {}
    this.handleAdmin = this.handleAdmin.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handleAdmin (evt) {
    evt.preventDefault()
    this.props.dispatch(makeAdmin(this.state.adminEmail))
    this.setState({success: true})
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  render () {
    return (
      <div>
        <h2>Settings</h2>
        <form>
          <p>
            Email Address<input type="text" />
          </p>
          <button>Change</button>
        </form>
        <form onSubmit={this.handleAdmin}>
          <strong>Enter users email to make admin</strong>
          <p>Email Address<input type="text" name="adminEmail" onChange={this.handleChange} required/></p>
          <button>Make Admin</button>
        </form>
        {this.props.adminSuccess && <h2>Success</h2>}
      </div>
    )
  }
}
function mapStatetoProps (state) {
  return state.adminSuccess
}

export default connect(mapStatetoProps)(Settings)
