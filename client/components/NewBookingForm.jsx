import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {makeNewBooking} from '../actions/calendar'

class NewBookingForm extends React.Component {
  constructor (props) {
    super(props)
    this.setState = {
      date: moment(this.state.startTime).format('DD/MM/YYYY'),
      startTime: moment(this.state.startTime).format('HH:mm'),
      endTime: moment(this.state.endTime).format('HH:mm')
    }
  }

  submitBooking () {

    this.props.makeNewBooking(this.state.startTime, this.state.endTime)
    this.props.history.push('/book')
  }

  render () {
    return (
      <div className='new-booking-form'>
      <p>Date: <input value={this.state.date} /></p>
      <p>Start Time: <input value={this.state.startTime} /></p>
      <p>End Time: <input value={this.state.endTime} /></p>
      <p><input type='submit' onClick={this.submitBooking} value='Book Now' /></p>
    </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    makeNewBooking: (dateStart, dateEnd) => dispatch(makeNewBooking(dateStart, dateEnd))
  }
}

export default connect(null, mapDispatchToProps)(NewBookingForm)
