import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import NewBookingForm from './NewBookingForm'
import {setNewBooking} from '../actions/calendar'

class Schedular extends React.Component {
  constructor (props) {
    super(props)
    this.state = this.newState(this.props.newBooking.startDate, this.props.newBooking.startTime, this.props.newBooking.endDate, this.props.newBooking.endTime, false)
    this.clicked = this.clicked.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
  }

  updateSchedule (startTime, endTime) {
    this.setState({
      startTime,
      endTime
    })
  }

  clicked (e) {
    const dateString = e.target.id.substr(4)
    const date = new Date(moment(dateString, 'YYYY-MM-DD-HH-mm'))
    if (!this.state.mouseDown) {
      const startDate = moment(date).format('YYYY/MM/DD')
      const startTime = moment(date).format('HH:mm')
      const date2 = new Date(moment(date).add(30, 'minutes'))
      const endDate = moment(date2).format('YYYY/MM/DD')
      const endTime = moment(date2).format('HH:mm')
      this.props.setNewBooking({
        startDate,
        startTime,
        endDate,
        endTime
      })
      this.setState(this.newState(startDate, startTime, endDate, endTime, true))
    } else {
      let endDate = moment(date).format('YYYY/MM/DD')
      let endTime = moment(date).format('HH:mm')
      let startDate = this.props.newBooking.startDate
      let startTime = this.props.newBooking.startTime
      const newState = this.newState(startDate, startTime, endDate, endTime, false)
      if (newState.startTime > newState.endTime) {
        let temp = newState.startTime
        newState.startTime = newState.endTime
        newState.endTime = temp
        this.props.setNewBooking({
          startDate: endDate,
          startTime: endTime,
          endDate: startDate,
          endTime: startTime
        })
      } else {
        this.props.setNewBooking({
          startDate,
          startTime,
          endDate,
          endTime
        })
      }
      this.setState(newState)
    }
  }

  newState (startDate, startTime, endDate, endTime, mouseDown) {
    let dateString = startDate + '/' + startTime
    const startDateValue = new Date(moment(dateString, 'YYYY/MM/DD/HH:mm'))
    dateString = endDate + '/' + endTime
    const endDateValue = new Date(moment(dateString, 'YYYY/MM/DD/HH:mm'))
    return {
      startTime: startDateValue,
      endTime: endDateValue,
      mouseDown
    }
  }

  mouseEnter (e) {
    if (this.state.mouseDown) {
      const dateString = e.target.id.substr(4)
      const endTime = new Date(moment(dateString, 'YYYY-MM-DD-HH-mm'))
      if (endTime > this.state.selectedTime) {
        this.setState({
          startTime: this.state.selectedTime,
          endTime: new Date(moment(endTime).add(30, 'minutes'))
        })
      }
      if (endTime < this.state.selectedTime) {
        this.setState({
          startTime: endTime,
          endTime: new Date(moment(this.state.selectedTime).add(30, 'minutes'))
        })
      }
    }
  }

  render () {
    return (
      <div className='schedule'>
        {this.props.user.authId && <NewBookingForm history={this.props.history}/>}
        {!this.props.user.authId && <p>Please log in to make a booking</p>}
        <div className='container'>
          <h3>Key:</h3>
          <div className='row'>
            <div className='col-md-1'>Availible<div className='availible' /></div>
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
          <div className='schedule-hours-container'>
            {this.getHours()}
          </div>
          <div className='schedule-column-container yesterday'>
            {this.getTimeSlots(new Date(moment(this.props.date).subtract(1, 'days')))}
          </div>
          <div className='schedule-column-container today'>
            {this.getTimeSlots(new Date(moment(this.props.date)))}
          </div>
          <div className='schedule-column-container tomorrow'>
            {this.getTimeSlots(new Date(moment(this.props.date).add(1, 'days')))}
          </div>
        </div>
      </div>
    )
  }

  getHours () {
    const d = new Date()
    const hourArray = []
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 2; j++) {
        let selectedDate = d.setHours(i + 6, j * 3)
        let dateFormatted = moment(selectedDate).format('HH:mm')
        let divContents = ''
        let classNames = 'hour'
        if (j === 1) {
          classNames += ' half-hour'
        } else {
          classNames += ' full-hour'
          divContents = dateFormatted
        }
        hourArray.push(<div key={dateFormatted} className={classNames}>{divContents}</div>)
      }
    }
    return hourArray
  }

  getTimeSlots (d) {
    const dayArray = []
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 2; j++) {
        const selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), i + 6, j * 30)
        let classNames = 'slot'
        let ptag = ''
        if (j === 1) {
          classNames += ' half-hour'
        } else {
          classNames += ' full-hour'
        }
        const dateFormatted = moment(selectedDate).format('YYYY-MM-DD-HH-mm')
        if (selectedDate >= this.state.startTime && selectedDate < this.state.endTime) {
          classNames += ' selected'
        }
        if (this.props.bookings.find(booking => {
          return booking.startDate <= selectedDate && booking.endDate > selectedDate && booking.confirmed === false
        })) {
          classNames += ' reserved'
        }
        if (this.props.bookings.find(booking => {
          return booking.startDate <= selectedDate && booking.endDate > selectedDate && booking.confirmed === true
        })) {
          classNames += ' confirmed'
        }
        const toDisplay = this.props.bookings.find(booking => {
          return booking.startDate.getTime() === selectedDate.getTime()
        })
        if (toDisplay && toDisplay.fullName) {
          ptag = toDisplay.fullName + ' ' + toDisplay.purpose
        }
        dayArray.push(<div key={dateFormatted} id={'slot' + dateFormatted} className={classNames} onClick={this.clicked} onMouseOver={this.mouseEnter}>{ <div>{ptag}</div>}</div>)
      }
    }
    return dayArray
  }
}

function mapStateToProps (state) {
  return {
    date: state.display.date,
    bookings: state.bookings,
    user: state.user,
    newBooking: state.newBooking
  }
}

function mapDispatchToProps (dispatch) {
  return {
    setNewBooking: newDateAndTime => dispatch(setNewBooking(newDateAndTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedular)
