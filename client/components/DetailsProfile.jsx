import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

//bare min component to avoid err

function DetailsProfile (props) {

  return (
    <div className='details-profile-component'>
      <h2>Booking details</h2>
      <table className='detailsTableProfile'>
        <tr>
          <td><b>Request made for</b></td>
          <td>{props.booking.fullName}</td>
        </tr>
        <tr>
          <td><b>Contact email</b></td>
          <td>{props.booking.emailAddress}</td>
        </tr>
        <tr>
          <td><b>Contact number</b></td>
          <td>{props.booking.phoneNumber}</td>
        </tr>
        <tr>
          <td><b>Purpose of event</b></td>
          <td>{props.booking.purpose}</td>
        </tr>
        <tr>
          <td><b>Requested on</b></td>
          <td>{moment(props.booking.dateAdded).format('YYYY-MM-DD HH:mm')}</td>
        </tr>
      </table>
    </div>
  )
}

function mapStateToProps (state) {
  return {
    booking: state.booking
  }
}

export default connect(mapStateToProps)(DetailsProfile)
