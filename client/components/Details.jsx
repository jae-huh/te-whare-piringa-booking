import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

//bare min component to avoid err

function Details (props) {

  return (
    <div>
      <table className='detailsTable'>
        <tr>
          <td><b>Name</b></td>
          <td>{props.booking.fullName}</td>
        </tr>
        <tr>
          <td><b>Email</b></td>
          <td>{props.booking.emailAddress}</td>
        </tr>
        <tr>
          <td><b>Phone</b></td>
          <td>{props.booking.phoneNumber}</td>
        </tr>
        <tr>
          <td><b>Purpose</b></td>
          <td>{props.booking.purpose}</td>
        </tr>
        <tr>
          <td><b>Requested on</b></td>
          <td>{moment(props.booking.dateAdded).format('YYYY-MM-DD HH:mm')}</td>
        </tr>
        <tr>
          <td><b>Booking Confirmed</b></td>
          <td>{props.booking.confirmed ? 'Yes' : 'No'}</td>
        </tr>
        <tr>
          <td><b>Delete Requested</b></td>
          <td>{props.booking.deleteRequested ? 'Yes' : 'No'}</td>
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

export default connect(mapStateToProps)(Details)
