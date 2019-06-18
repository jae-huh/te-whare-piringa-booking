import React from 'react'
import moment from 'moment'
import {connect} from 'react-redux'

import HoursColumn from './HoursColumn'
import {validationError} from '../actions'
import {switchDate} from '../actions/calendar'
import ScheduleColumns from './ScheduleColumns'
import {checkBookingForOverlap, validateAgainstOpenHours} from '../../shared/validation'

class Schedular extends React.Component {
  constructor (props) {
    super(props)
    this.makeNewBooking = this.makeNewBooking.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.previousDay = this.previousDay.bind(this)
    this.nextDay = this.nextDay.bind(this)
  }

  previousDay () {
    const {date} = this.props
    const previous = new Date(moment(date).subtract(1, 'days'))
    this.props.switchDate(previous)
  }
  nextDay () {
    const {date} = this.props
    const next = new Date(moment(date).add(1, 'days'))
    this.props.switchDate(next)
  }

  makeNewBooking () {
    const booking = {
      startDate: this.props.startTime,
      endDate: this.props.endTime
    }

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
    window.localStorage.setItem('date', this.props.date)
    window.localStorage.setItem('startTime', this.props.startTime)
    window.localStorage.setItem('endTime', this.props.endTime)
  }

  render () {
    return (
      <div className='schedule-container'>
        <div className='schedule'>
          <div className='container'>
            <div className='col-md-2' />
          </div>
          <div className='row key-circles margin-upper'>
            <div className="col-xs-12">
              <table className="key-table">
                <tbody>
                  <tr>
                    <td className='schedule-indicator'>Available</td>
                    <td className='schedule-indicator'>Reserved</td>
                    <td className='schedule-indicator'>Booked</td>
                  </tr>
                  <tr>
                    <td><div className='available-key circle' /></td>
                    <td><div className='reserved-key circle' /></td>
                    <td><div className='booked-key circle' /></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='col-xs-12 login-book'>
              {this.props.user.authId && <p>
                <input type='button'
                  onClick={this.makeNewBooking}
                  className='setting-btn2'
                  value='Request booking' />
              </p>}

              {!this.props.user.authId && <p>
                <input type='button'
                  className='setting-btn2'
                  value='Register or login to request a booking' />
              </p>}
            </div>
          </div>

          <div className='schedule-navbar' />
          <div className='schedule-row'>
            <div className='col-xs-2 col-md-1 schedule-arrow'>
              <img src='./images/left.png' className='img-fluid' onClick={this.previousDay} />
            </div>
            <div className='col-md-10 schedule-inner-container'>
              <div className='schedule-header-container'>
                <div className='schedule-header time'>Timeslot</div>
                <div className='schedule-header yesterday'>{moment(this.props.date).subtract(1, 'days').format('ddd DD MMM')}</div>
                <div className='schedule-header'>{moment(this.props.date).format('ddd DD MMM')}</div>
                <div className='schedule-header tomorrow'>{moment(this.props.date).add(1, 'days').format('ddd DD MMM')}</div>
              </div>
              <div className='schedule-columns-container'>
                <HoursColumn />
                <ScheduleColumns />
              </div>
            </div>
            <div className='col-xs-2 col-md-1 schedule-arrow'>
              <img src='./images/right-arrow-icon.png' className='img-fluid' onClick={this.nextDay} />
            </div>
          </div>
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
