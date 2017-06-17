import React from 'react'
import {connect} from 'react-redux'
import moment from 'moment'

import {makeNewBooking} from '../actions/calendar'

class Schedular extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      date: null,
      startTime: null,
      endTime: null,
      mouseDown: false
    }
    this.mousePressed = this.mousePressed.bind(this)
    this.mouseReleased = this.mouseReleased.bind(this)
    this.mouseEnter = this.mouseEnter.bind(this)
    this.submitBooking = this.submitBooking.bind(this)
  }
  submitBooking () {
    this.props.makeNewBooking(this.state.startTime, this.state.endTime)
    this.props.history.push('/book')
  }

  mousePressed (e) {
    const dateString = e.target.id.substr(4)
    const startTime = new Date(moment(dateString, 'YYYY-MM-DD-HH-mm'))
    this.setState({
      selectedTime: startTime,
      startTime,
      endTime: new Date(moment(startTime).add(30, 'minutes')),
      mouseDown: true
    })
  }

  mouseReleased (e) {
    this.setState({
      mouseDown: false
    })
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
        <div className='new-booking-form'>
          <p>Date: <input value={moment(this.state.startTime).format('DD/MM/YYYY')} /></p>
          <p>Start Time: <input value={moment(this.state.startTime).format('HH:mm')} /></p>
          <p>End Time: <input value={moment(this.state.endTime).format('HH:mm')} /></p>
          <p><input type='submit' onClick={this.submitBooking} value='Book Now' /></p>
        </div>
        <div className='schedule-navbar' />
        <div className='schedule-header-container'>
          <div className='schedule-header'>Timeslot</div>
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
        const selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), i + 6, j * 30)
        const divContents = moment(selectedDate).format('HH:mm')
        hourArray.push(<div className={'hour'}>{divContents}</div>)
      }
    }
    return hourArray
  }

  getTimeSlots (d) {
    const dayArray = []
    for (let i = 0; i < 16; i++) {
      for (let j = 0; j < 2; j++) {
        const selectedDate = new Date(d.getFullYear(), d.getMonth(), d.getDate(), i + 6, j * 30)
        const divId = 'slot' + moment(selectedDate).format('YYYY-MM-DD-HH-mm')
        let selected = ''
        if (selectedDate >= this.state.startTime && selectedDate < this.state.endTime) {
          selected = ' selected'
        }
        dayArray.push(<div id={divId} className={'slot' + selected} onMouseDown={this.mousePressed} onMouseUp={this.mouseReleased} onMouseOver={this.mouseEnter} />)
      }
    }
    return dayArray
  }
}

function mapStateToProps (state) {
  return {
    date: state.display.date
  }
}

function mapDispatchToProps (dispatch) {
  return {
    makeNewBooking: (dateStart, dateEnd) => dispatch(makeNewBooking(dateStart, dateEnd))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Schedular)
