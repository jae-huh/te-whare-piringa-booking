import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

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
    this.askToLogin = this.askToLogin.bind(this)
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

  askToLogin () {
    this.setState({
      modal: true
    })
  }

  handleClose () {
    this.setState({
      modal: false
    })
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
                {this.props.user.authId && <p><input type='button' onClick={this.makeNewBooking} value='Request booking' className='setting-btn2' /></p>}
                {!this.props.user.authId && <p><input type='button' onClick={this.askToLogin} value='Request booking' className='setting-btn2' /></p>}
                {this.state.modal && <ModalContainer onClose={this.handleClose} className='book-container'>
                  <ModalDialog onClose={this.handleClose} className='book-container'>
                    <div><h3>Please login to make a booking</h3></div>
                  </ModalDialog>
                </ModalContainer>}
              </div>
            </div>

            <div className='schedule-navbar' />
            <div className='schedule-row'>
              <div className='col-xs-2 col-md-1 schedule-arrow'>
                <img src='./images/left.png' className='img-fluid' onClick={this.previousDay} />
              </div>
              <div className='col-md-10'>
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
