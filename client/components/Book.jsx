import React from 'react'
// import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import moment from 'moment'
import {connect} from 'react-redux'

import {newBooking} from '../actions/index'

injectTapEventPlugin()

class Book extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authId: '',
      fullName: '',
      email: '',
      phoneNumber: '',
      date: null,
      startTime: null,
      endTime: null,
      purpose: null,
      guestNumber: null

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeTime = this.handleChangeTime.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleChangeDate (evt, date) {
    this.setState({
      date: moment(date).format('YYYY-MM-DD-')
    })
  }

  handleChangeTime (evt, key) {
    this.setState({
      [key]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()

    const data = {
      fullName: this.state.fullName || this.props.fullName,
      emailAddress: this.state.email || this.props.emailAddress,
      phoneNumber: this.state.phoneNumber || this.props.phoneNumber,
      authId: this.props.authId,
      startDate: this.state.date + this.state.startTime,
      endDate: this.state.date + this.state.endTime,
      purpose: this.state.purpose,
      guestNumber: this.state.guestNumber,
      confirmed: false,
      dateAdded: new Date().toLocaleDateString('en-GB').substring(0, 8)}

    this.props.postNewBooking(data)
    this.props.history.push('/calendar')
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Full Name: <input name='fullName' placeholder={this.props.fullName} onChange={this.handleChange} />
          <br />
          Email Address: <input type='email' name='email' placeholder={this.props.emailAddress} onChange={this.handleChange} />
          <br />
          Contact Number: <input type='tel' name='phoneNumber' placeholder={this.props.phoneNumber} onChange={this.handleChange} />
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <DatePicker
                hintText='Date'
                onChange={this.handleChangeDate}
                required
              />

            </div>
          </MuiThemeProvider>
          Start time: <select name='startTime' defaultValue='SelectTime' required onChange={e => this.handleChangeTime(e, 'startTime')}>
            <option value='SelectTime' disabled>Select Time</option>
            {generateTimes(0)}
          </select>
          <br />
          End time: <select name='endTime' defaultValue='SelectTime' required onChange={e => this.handleChangeTime(e, 'endTime')}>
            <option value='SelectTime' disabled>Select Time</option>
            {generateTimes(1)}
          </select>
          <br />
          <textarea name='purpose' required placeholder='Purpose of hire' onChange={this.handleChange} />
          <br />
          <input type='number' min='0' name='guestNumber' placeholder='Number of guests' onChange={this.handleChange} required />
          <br />
          <input type='submit' value='Book' />
        </form>
      </div>
    )
  }
}

function generateTimes (num) {
  let times = []
  for (let i = 6 + num; i <= 21 + num; i++) {
    for (let j = 0; j <= 30; j += 30) {
      let time = <option key={i + j}>{i}:{j === 0 ? '00' : j}</option>
      if (num === 0 && i === 21 && j === 30) {
        return times
      } else if (num === 1 && i === 22 && j === 30) {
        return times
      } else {
        times.push(time)
      }
    }
  }
  return times
}

function mapStateToProps (state) {
  return state.user
}

function mapDispatchToProps (dispatch) {
  return {
    postNewBooking: data => {
      dispatch(newBooking(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
