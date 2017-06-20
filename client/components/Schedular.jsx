import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import HoursColumn from './HoursColumn'
import ScheduleColumns from './ScheduleColumns'
import {checkBookingForOverlap, validateAgainstOpenHours} from '../utils/vars'
import {validationError} from '../actions'
import {switchDate} from '../actions/calendar'

class Schedular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      modal: false
    }
    this.makeNewBooking = this.makeNewBooking.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.previousDay = this.previousDay.bind(this)
    this.nextDay = this.nextDay.bind(this)
  }

  previousDay () {
    const d = this.props.date
    const newD = new Date(moment(d).subtract(1, 'days'))
    this.props.switchDate(newD)
  }
  nextDay () {
    const d = this.props.date
    const newD = new Date(moment(d).add(1, 'days'))
    this.props.switchDate(newD)
  }

  makeNewBooking () {
    const booking = {startDate: this.props.startTime, endDate: this.props.endTime}
    let dataCheck = checkBookingForOverlap(booking, this.props.bookings)
    if (dataCheck !== 'ok') {
      return this.props.validationError(dataCheck)
    }
    dataCheck = validateAgainstOpenHours(booking)
    if (dataCheck !== 'ok') {
      return this.props.validationError(dataCheck)
    }
    this.props.history.push('/book')
  }

  handleClose () {
    this.setState({
      modal: false
    })
  }

  render () {
    return (
      <div className='schedule'>
        {this.props.user.authId && <p><input type='button' onClick={this.makeNewBooking} value='Make a Booking' /></p>}
        {!this.props.user.authId && <p>Please log in to make a booking</p>}
        <div className='container'>
          <h3>Key:</h3>
          <div className='row'>
            <div className='col-md-1'>Available<div className='availible' /></div>
            <div className='col-md-1'>Reserved<div className='reserved-key' /></div>
            <div className='col-md-1'>Booked<div className='booked-key' /></div>
          </div>
        </div>
        <div className='schedule-navbar'/>
        <div className='row'>
          <div className='col-md-1'>
          <img src='./images/left.png' height="70" onClick={this.previousDay} />
          </div>
          <div className='col-md-10'>
            </div>
          <div className='col-md-1'>
          <img src='./images/right-arrow-icon.png' height="70" onClick={this.nextDay} />
        </div>
        </div>
        <div className='schedule-header-container'>
          <div className='schedule-header time'>Timeslot</div>
          <div className='schedule-header'>{moment(this.props.date).subtract(1, 'days').format('DD MMMM YYYY')}</div>
          <div className='schedule-header'>{moment(this.props.date).format('DD MMMM YYYY')}</div>
          <div className='schedule-header'>{moment(this.props.date).add(1, 'days').format('DD MMMM YYYY')}</div>
        </div>
        <div className='schedule-columns-container'>
          <HoursColumn />
          <ScheduleColumns />
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    date: state.display.date,
    startTime: state.newBooking.startTime,
    endTime: state.newBooking.endTime,
    bookings: state.bookings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    validationError: message => dispatch(validationError(message)),
    switchDate: date => dispatch(switchDate(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedular)
