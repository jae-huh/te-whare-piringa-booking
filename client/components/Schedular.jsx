import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

import HoursColumn from './HoursColumn'
import ScheduleColumns from './ScheduleColumns'
import {makeNewBooking} from '../actions/calendar'

class Schedular extends React.Component {
  constructor (props) {
    super(props)
    this.makeNewBooking = this.makeNewBooking.bind(this)
  }

  makeNewBooking () {
    this.props.history.push('/book')
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
          <img src='./images/left.png' height="70"/>
          </div>
          <div className='col-md-10'>
            </div>
          <div className='col-md-1'>
          <img src='./images/right-arrow-icon.png' height="70"/>
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
    date: state.display.date
  }
}

function mapDispatchToProps (dispatch) {
  return {
    makeNewBooking: dispatch(makeNewBooking())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedular)
