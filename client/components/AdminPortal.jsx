import React from 'react'
import {connect} from 'react-redux'
import {getUnconfirmed, confirm, deleteBooking} from '../actions/index'
import Setting from './Settings'

class AdminPortal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unconfirmed: []
    }
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
  }

  handleConfirmClick (id) {
    this.props.confirm(id)
  }

  handleDeleteClick (id) {
    this.props.deleteBooking(id)
  }

  render () {
    return (
      <div className="admin-portal container">
        <h1>Admin Portal</h1>
      <div className="row">
        <div className="col-md-8 unconfirmed-list">
          <h2>Unconfirmed Bookings</h2>
          {this.props.unconfirmed.map(item => {
            return (
              <div key={item._id}>
                {item.fullName}<br />
                {item.startDate} to {item.endDate}
                <button onClick={() => { this.handleConfirmClick(item._id) }}>Confirm</button>
                <button onClick={() => { this.handleDeleteClick(item._id) }}>Delete</button>
                <button>More</button>
              </div>
            )
          })}
        </div>
          <div className="col-md-4 text-center">
            <Setting />
          </div>
        </div>
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
    getUnconfirmed: dispatch(getUnconfirmed()),
    confirm: id => { dispatch(confirm(id)) },
    deleteBooking: id => { dispatch(deleteBooking(id)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
