import React from 'react'
import {connect} from 'react-redux'

import {makeNewBooking, setNewBooking} from '../actions/calendar'

class NewBookingForm extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      startDate: this.props.startDate,
      startTime: this.props.startTime,
      endDate: this.props.endDate,
      endTime: this.props.endTime
    }
    this.handleChange = this.handleChange.bind(this)
    this.submitBooking = this.submitBooking.bind(this)
  }

  submitBooking () {
    this.props.makeNewBooking(this.state.startDate, this.state.endDate)
    this.props.history.push('/book')
  }

  handleChange (e) {
    this.setState({[e.target.name]: e.target.value}, () => {
      this.props.setNewBooking(this.state)
    })
  }

  render () {
    return (
      <div className='new-booking-form'>
      <p>Start Date: <input name='startDate' value={this.props.startDate} onChange={this.handleChange} /></p>
      <p>Start Time: <input name='startTime' value={this.props.startTime} onChange={this.handleChange} /></p>
      <p>End Date: <input name='endDate' value={this.props.endDate} onChange={this.handleChange} /></p>
      <p>End Time: <input name='endTime' value={this.props.endTime} onChange={this.handleChange} /></p>
      <p><input type='submit' onClick={this.submitBooking} value='Make a booking' /></p>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return state.newBooking
}

function mapDispatchToProps (dispatch) {
  return {
    makeNewBooking: (dateStart, dateEnd) => dispatch(makeNewBooking(dateStart, dateEnd)),
    setNewBooking: dateAndTime => dispatch(setNewBooking(dateAndTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewBookingForm)
