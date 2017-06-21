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
  }

  render () {
    return (
      <div className='schedule-container'>
        <div className='schedule'>

          <div className='container'>
            <div className='row'>
              <div className='col-md-1' />
              <div className='col-md-1'>
                <h4 className='schedule-key'>Key:</h4>
              </div>
            </div>
            <div className='row key-circles'>
              <div className='col-md-1 col-xs-1'  />
              <div className='col-md-1 col-xs-1'>Available<div className='available' /></div>
              <div className='col-md-1 col-xs-1'>Reserved<div className='reserved-key' /></div>
              <div className='col-md-1 col-xs-1'>Booked<div className='booked-key' /></div>
              <div className='col-md-5 col-xs-5' />
              <div className='col-md-1 col-xs-1 login-book'>
                {this.props.user.authId && <p><input type='button' onClick={this.makeNewBooking} value='Request booking' className='setting-btn2' /></p>}
                {!this.props.user.authId && <p><input type='button' onClick={this.askToLogin} value='Request booking' className='setting-btn2' /></p>}
                {this.state.modal && <ModalContainer onClose={this.handleClose} className='book-container'>
                  <ModalDialog onClose={this.handleClose} className='book-container'>
                    <div><h3>Please login to make a booking</h3></div>
                  </ModalDialog>
                </ModalContainer>}
              </div>
            </div>

            <div className='schedule-navbar'/>
            <div className='row schedule-row'>
              <div className='col-xs-1 schedule-arrow'>
              <div><img src='./images/left.png' height="70" onClick={this.previousDay} /></div>
              </div>
              <div className='col-md-10'>
                <div className='schedule-header-container'>
                  <div className='schedule-header time'>Timeslot</div>
                  <div className='schedule-header'>{moment(this.props.date).subtract(1, 'days').format('dddd DD MMMM YYYY')}</div>
                  <div className='schedule-header'>{moment(this.props.date).format('dddd DD MMMM YYYY')}</div>
                  <div className='schedule-header'>{moment(this.props.date).add(1, 'days').format('dddd DD MMMM YYYY')}</div>
                </div>
                <div className='schedule-columns-container'>
                  <HoursColumn />
                  <ScheduleColumns />
                </div>
              </div>
              <div className='col-xs-1 schedule-arrow'>
              <div><img src='./images/right-arrow-icon.png' height="70" onClick={this.nextDay} /></div>
            </div>
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
