import React from 'react'
import {connect} from 'react-redux'
import {getUnconfirmed} from '../actions/index'

class AdminPortal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unconfirmed: []
    }
    this.handleClick = this.handleClick.bind(this)
  }

  handleClick (id) {
    // confirm(id)
  }

  render () {
    return (
      <div className="admin-portal">
        <h1>Admin Portal</h1>
        {this.props.unconfirmed.map(item => {
          return (
            <div>
              {item.startDate} to {item.endDate}
              <button onClick={() => { this.handleClick(item.id) }}>Confirm</button>
            </div>
          )
        })}
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    unconfirmed: state.unconfirmed
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getUnconfirmed: dispatch(getUnconfirmed())
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
