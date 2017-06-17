import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import {connect} from 'react-redux'

import history from '../utils/history'
import {fetchBookings} from '../actions'

BigCalendar.momentLocalizer(moment)
// const events = [
//   {
//     'title': 'All Day Event',
//     'allDay': true,
//     'start': new Date(2015, 3, 0),
//     'end': new Date(2015, 3, 1)
//   },
//   {
//     'title': 'Long Event',
//     'start': new Date(2015, 3, 7),
//     'end': new Date(2015, 3, 10)
//   },
//
//   {
//     'title': 'DTS STARTS',
//     'start': new Date(2016, 2, 13, 0, 0, 0),
//     'end': new Date(2016, 2, 20, 0, 0, 0)
//   },
//
//   {
//     'title': 'DTS ENDS',
//     'start': new Date(2016, 10, 6, 0, 0, 0),
//     'end': new Date(2016, 10, 13, 0, 0, 0)
//   },
//
//   {
//     'title': 'Some Event',
//     'start': new Date(2015, 3, 9, 0, 0, 0),
//     'end': new Date(2015, 3, 9, 0, 0, 0)
//   },
//   {
//     'title': 'Conference',
//     'start': new Date(2015, 3, 11),
//     'end': new Date(2015, 3, 13),
//     desc: 'Big conference for important people'
//   },
//   {
//     'title': 'Meeting',
//     'start': new Date(2015, 3, 12, 10, 30, 0, 0),
//     'end': new Date(2015, 3, 12, 12, 30, 0, 0),
//     desc: 'Pre-meeting meeting, to prepare for the meeting'
//   },
//   {
//     'title': 'Lunch',
//     'start': new Date(2015, 3, 12, 12, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 13, 0, 0, 0),
//     desc: 'Power lunch'
//   },
//   {
//     'title': 'Meeting',
//     'start': new Date(2015, 3, 12, 14, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 15, 0, 0, 0)
//   },
//   {
//     'title': 'Happy Hour',
//     'start': new Date(2015, 3, 12, 17, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 17, 30, 0, 0),
//     desc: 'Most important meal of the day'
//   },
//   {
//     'title': 'Dinner',
//     'start': new Date(2015, 3, 12, 20, 0, 0, 0),
//     'end': new Date(2015, 3, 12, 21, 0, 0, 0)
//   },
//   {
//     'title': 'Birthday Party',
//     'start': new Date(2015, 3, 13, 7, 0, 0),
//     'end': new Date(2015, 3, 13, 10, 30, 0)
//   }
// ]

class Calendar extends React.Component {
  constructor () {
    super()
    this.state = {
      redirectToBook: false
    }
  }
  redirect () {
    this.setState({
      redirectToBook: true
    })
  }

  componentDidMount () {
    this.props.fetchBookings()
  }

  render () {
    return (
      <div>
        <h3 className="callout">
          Click an event to see more info, or
          drag the mouse over the calendar to select a date/time range.
        </h3>
        {this.state.redirectToBook && history.push('/book')}
        <BigCalendar
          className="calendar"
          selectable
          views={['month', 'week']}
          events={this.props.bookings}
          defaultView='month'
          defaultDate={new Date()}
          onSelectEvent={event => alert(event.title)}
          onSelectSlot={this.redirect.bind(this)}
        />
      </div>
    )
  }
}

function mapDispatchToProps (dispatch) {
  return {
    fetchBookings: () => {
      dispatch(fetchBookings())
    }
  }
}

function mapStateToProps (state) {
  return {
    bookings: state.bookings
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Calendar)
