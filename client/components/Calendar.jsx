import React from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import {connect} from 'react-redux'

import history from '../utils/history'
import {fetchBookings} from '../actions'

BigCalendar.momentLocalizer(moment)

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
