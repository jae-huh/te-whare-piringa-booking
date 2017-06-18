import React from 'react'
import {connect} from 'react-redux'
import {confirm, deleteBooking, selectBooking} from '../actions/index'
import Setting from './Settings'
import Details from './Details'

class AdminPortal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      showSettings: false
    }
    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.saveBookingToStore = this.saveBookingToStore.bind(this)
    this.settingShow = this.settingShow.bind(this)
  }

  settingShow () {
    this.state.showSettings
    ? this.setState({showSettings: false})
    : this.setState({showSettings: true})
  }

  handleConfirmClick (id) {
    this.props.confirm(id)
  }

  handleDeleteClick (id) {
    this.props.deleteBooking(id)
  }

  saveBookingToStore (booking) {
    this.props.selectBooking(booking)
  }

  render () {
    return (
      <div className="admin-portal container">
        {this.props.admin ?
        <div>
          <h1>Admin Portal</h1>
        <div className="row">
          <div className="col-md-8 unconfirmed-list">
            <h2>Unconfirmed Bookings</h2>
            {this.props.bookings.filter(booking => !booking.confirmed).map(item => {
              return (
                <div key={item._id} className="row">
                  <div className="col-sm-8 list-of-unconfirmed">
                  {item.fullName}<br />
                  {item.startDate.toString().substring(0, 16)} to {item.endDate.toString().substring(0, 16)}
                  </div>
                  <div className="col-sm-4 buttons-of-unconfirmed text-center">
                    <span className="glyphicon glyphicon-ok confirm" onClick={() => { this.handleConfirmClick(item._id) }}></span>
                    <span className="glyphicon glyphicon-remove remove" onClick={() => { this.handleDeleteClick(item._id) }}></span>
                    <span className="glyphicon glyphicon-plus more" onClick={() => { this.saveBookingToStore(item) }}></span>
                  </div>
                </div>
              )
            })}
          </div>
            <div className="col-md-4 text-center">
              <button onClick={this.settingShow}>Settings</button>
              {this.state.showSettings && <Setting />}
              {this.props.booking && <Details />}
            </div>
          </div>
        </div>
        : <h1>Not authorised</h1>
        }
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    bookings: state.bookings,
    admin: state.user.admin
  }
}

function mapDispatchToProps (dispatch) {
  return {
    confirm: id => { dispatch(confirm(id)) },
    deleteBooking: id => { dispatch(deleteBooking(id)) },
    selectBooking: booking => { dispatch(selectBooking(booking)) }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
