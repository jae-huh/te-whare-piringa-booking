import React from 'react'
import {connect} from 'react-redux'

import {userBookings} from '../actions'

class Profile extends React.Component {
  constructor () {
    super()
    this.showUserBookings = this.showUserBookings.bind(this)
  }

  componentDidMount () {
    this.props.userBookings(this.props.authId)
  }

  showUserBookings () {
    return this.props.bookings.map((booking, i) => {
      if (booking.authId) {
        return (
          <tr key={i}>
            <td>{booking.startDate}</td>
            <td>{booking.endDate}</td>
            <td>{booking.confirmed ? 'Confirmed' : 'Waiting to be confirmed'}</td>
          </tr>
        )
      }
    })
  }

  render () {
    return (
      <div className="profile-container">
        <h1>profile</h1>
        <div>
          <h2>Your Bookings</h2>
          <table>
            <thead>
              <tr>
                <th>Start Time</th>
                <th>End Time</th>
                <th>Confirmation Status</th>
              </tr>
            </thead>
            <tbody>
              {this.showUserBookings()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    userBookings: () => {
      dispatch(userBookings())
    }
  }
}

function mapStateToProps (state) {
  return {
    bookings: state.bookings,
    authId: state.user.authId
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Profile)
