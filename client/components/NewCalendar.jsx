import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {switchDate} from '../actions/calendar'

class Calendar extends React.Component {
  constructor (props) {
    super(props)
    this.previousMonth = this.previousMonth.bind(this)
    this.nextMonth = this.nextMonth.bind(this)
    this.selectDate = this.selectDate.bind(this)
  }
  previousMonth () {
    const d = this.props.date
    const newD = new Date(moment(d).subtract(1, 'months'))
    this.props.switchDate(newD)
  }
  nextMonth () {
    const d = this.props.date
    const newD = new Date(moment(d).add(1, 'months'))
    this.props.switchDate(newD)
  }

  selectDate (e) {
    const dateString = e.target.id.substr(3)
    const dateSelected = new Date(moment(dateString, 'YYYY-MM-DD'))
    if (dateSelected < new Date().setHours(0, 0, 0, 0)) return
    this.props.switchDate(dateSelected)
    this.props.history.push('/schedule')
  }

  render () {
    return (
      <div className='calendar'>
        <div className='calendar-navbar'>
          <div className='calendar-previous'><a onClick={this.previousMonth} >Previous Month </a> </div>
          <div className='calendar-next'><a onClick={this.nextMonth} >Next Month </a> </div>
        </div>
        <div className='calendar-title'>
          <h2>{moment(this.props.date).format('MMMM YYYY')}</h2>
        </div>
        <div className="calendar-container">
          <div className='calendar-header-container'>
            <div className='calendar-header'>Sunday</div>
            <div className='calendar-header'>Monday</div>
            <div className='calendar-header'>Tuesday</div>
            <div className='calendar-header'>Wednesday</div>
            <div className='calendar-header'>Thursday</div>
            <div className='calendar-header'>Friday</div>
            <div className='calendar-header'>Saturday</div>
          </div>
          <div className='calendar-date-container' >
            {this.getDates(this.props.date, this.props.bookings)}
          </div>
        </div>
      </div>
    )
  }

  getDates (d, bookings) {
    const firstDay = new Date(d.getFullYear(), d.getMonth(), 1).getDay()
    const lastDate = new Date(d.getFullYear(), d.getMonth() + 1, 0).getDate()
    const lastDay = new Date(d.getFullYear(), d.getMonth(), lastDate).getDay()
    const dateArray = []
    let today = new Date()
    today = new Date(today.getFullYear(), today.getMonth(), today.getDate())



    let i = 0
    while (i < firstDay) {
      const thisDate = new Date(d.getFullYear(), d.getMonth(), 1 - firstDay + i)
      const thisDateFormatted = moment(thisDate).format('YYYY-MM-DD')
      dateArray.push(<div key={thisDateFormatted} id={'day' + thisDateFormatted} className='calendar-date last-month' onClick={this.selectDate}>{thisDate.getDate()} </div>)
      i++
    }
    i = 1
    while (i <= lastDate) {
      const thisDate = new Date(d.getFullYear(), d.getMonth(), i)
      const thisDateFormatted = moment(thisDate).format('YYYY-MM-DD')
      let classNames = 'calendar-date this-month'
      if (thisDate.getTime() === today.getTime()) {
        classNames += ' currentDay'
      }
      if (thisDate.getTime() < today.getTime()) {
        classNames += ' calendar-inactive'
      }
      dateArray.push(<div key={thisDateFormatted} id={'day' + thisDateFormatted} className={classNames} onClick={this.selectDate}>{thisDate.getDate()} </div>)
      i++
    }
    i = 1
    while (i < 7 - lastDay) {
      const thisDate = new Date(d.getFullYear(), d.getMonth() + 1, i)
      const thisDateFormatted = moment(thisDate).format('YYYY-MM-DD')
      dateArray.push(<div key={thisDateFormatted} id={'day' + thisDateFormatted} className='calendar-date next-month' onClick={this.selectDate}>{thisDate.getDate()} </div>)
      i++
    }
    isThereABooking(dateArray, bookings)
    return dateArray
  }
}

function isThereABooking (dates, bookings) {
  for (let i=0; i < dates.length; i++) {
    for (let j=0; j < bookings.length; j++) {
      if (moment(bookings[j].startDate).isSame(dates[i], 'day')) {
        console.log(bookings[j].startDate)
        // classNames += ' calendar-booked'
      }
    }
  }
}
//     if (bookings.find(booking => {moment(booking.startDate).isSame(dates[i], 'day')})) {
//       classNames += ' calendar-booked'
//       console.log(booking.startDate)
//     }
//   }
// }

function mapStateToProps (state) {
  return {
    date: state.display.date,
    bookings: state.bookings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    switchDate: date => dispatch(switchDate(date))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
