import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import DetailsProfile from './DetailsProfile'
import {selectBooking, requestDelete} from '../actions/index'

class Profile extends React.Component {
  constructor (props) {
    super(props)
    this.saveBookingToStore = this.saveBookingToStore.bind(this)
  }

  saveBookingToStore (booking) {
    this.props.selectBooking(booking)
  }

  requestBookingToBeDeleted (id) {
    this.props.requestDelete(id)
  }

  showUserBookings () {
    return this.props.bookings.filter(booking => booking.authId).map((booking, i) => {
      return (
        <tr key={i} className="showUserBookingRow">
          <td>
            {moment(booking.startDate).format('ddd DD MMM YYYY')}
            <hr />
            {moment(booking.startDate).format('HH:mm a')} to {moment(booking.endDate).format('HH:mm a')}
            <hr />
            {booking.confirmed ? 'Confirmed' : 'Waiting for confirmation from admin'}
            <hr />
            {booking.deleteRequested ? 'Delete Requested' : 'You have not requested the event to be deleted'}
          </td>
          <td>
            <button onClick={() => this.saveBookingToStore(booking)}>View</button>
            {!booking.deleteRequested && <button onClick={() => this.requestBookingToBeDeleted(booking._id)}>Request Delete</button>}
          </td>
        </tr>
      )
    })
  }

  // <td>{moment(booking.startDate).format('HH:mm ddd DD MMM YYYY')}</td>
  // <td>{moment(booking.endDate).format('HH:mm ddd DD MMM YYYY')}</td>
  // <td>{booking.confirmed ? 'Confirmed' : 'Awaiting confirmation'}</td>
  // <td>{booking.deleteRequested ? 'Delete Requested' : 'No'}</td>
  // <td><button onClick={() => this.saveBookingToStore(booking)}>View</button></td>
  // <td>{!booking.deleteRequested && <button onClick={() => this.requestBookingToBeDeleted(booking._id)}>Request Delete</button>}</td>

  // {item.fullName}<hr />
  // {item.startDate.toString().substring(0, 16)} to {item.endDate.toString().substring(0, 16)}<hr />
  // {item.startDate.toString().substring(16, 21)} to {item.endDate.toString().substring(16, 21)}

  render () {
    return (
      <div className='profile-container'>
        <div className='profile'>
          <h2 className='profile-title'>Welcome, {this.props.user.fullName}</h2>
          <h3>Your Bookings</h3>
          <table className='profile-table'>
            {/* <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Confirmation Status</th>
                <th>Delete Requested</th>
              </tr>
            </thead> */}
            <tbody>
              {this.showUserBookings()}
            </tbody>
          </table>
        </div>
        {this.props.booking.fullName && <DetailsProfile />}
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    selectBooking: booking => dispatch(selectBooking(booking)),
    requestDelete: id => dispatch(requestDelete(id))
  }
}

function mapStateToProps (state) {
  return {
    booking: state.booking,
    bookings: state.bookings,
    authId: state.user.authId,
    user: state.user
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
