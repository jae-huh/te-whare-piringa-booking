import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {clicked, setNewBooking} from '../actions/calendar'

class ScheduleColumn extends React.Component {
  constructor (props) {
    super(props)
    this.clicked = this.clicked.bind(this)
  }

  clicked (e) {
    const dateString = e.target.id.substr(4)
    const date = new Date(moment(dateString, 'YYYY-MM-DD-HH-mm'))
    if (!this.props.mouse.clicked) {
      const date2 = new Date(moment(date).add(30, 'minutes'))
      this.props.setNewBooking(date, date2)
    } else {
      if (this.props.startDate > date) {
        this.props.setNewBooking(date, this.props.startTime)
      } else {
        this.props.setNewBooking(this.props.startTime, date)
      }
    }
    this.props.clicked()
  }

  render () {
    return (
    <div className='schedule-column-container tomorrow'>
      {this.getTimeSlots(new Date(moment(this.props.date)))}
    </div>
    )
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
        if (selectedDate >= this.props.startTime && selectedDate < this.props.endTime) {
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
    startTime: state.newBooking.startTime,
    endTime: state.newBooking.endTime,
    mouse: state.mouse,
    bookings: state.bookings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    clicked: () => dispatch(clicked()),
    setNewBooking: (startTime, endTime) => dispatch(setNewBooking(startTime, endTime))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ScheduleColumn)
