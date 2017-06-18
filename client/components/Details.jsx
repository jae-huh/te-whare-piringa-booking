import React from 'react'
import {connect} from 'react-redux'

//bare min component to avoid err

function Details (props) {

  return (
    <div>
      <p>Name: {props.booking.fullName}</p>
      <p>Email: {props.booking.emailAddress}</p>
      <p>Phone number: {props.booking.phoneNumber}</p>
      <p>Purpose: {props.booking.purpose}</p>
      <p>Status: {checkStatus(props.booking.confirmed)}</p>
      <p>Date request made: {props.booking.dateAdded}</p>
    </div>
  )
}

function checkStatus (status) {
  if (status) {
    return <p>Approved</p>
  } else {
    return <p>Awaiting review</p>
  }
}

function mapStateToProps (state) {
  return {
    booking: state.booking
  }
}

export default connect(mapStateToProps)(Details)
