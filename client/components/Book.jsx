import React from 'react'
// import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import moment from 'moment'
import {connect} from 'react-redux'

import {postNewBooking} from '../api'

injectTapEventPlugin()

class Book extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      fullName: this.props.user.fullName,
      email: this.props.user.email,
      phoneNumber: this.props.user.phoneNumber,
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
      date: moment(date).format('YYYY/MM/DD')
    })
  }

  handleChangeTime (evt, key) {
    console.log(evt.target.value)
    this.setState({
      [key]: evt.target.value
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    // this.props.postNewBooking(this.state)
    // postNewBooking(this.state, (err, res) => {
    //   if (err) {
    //     console.log(err)
    //   } else {
    //     console.log(res)
    //   }
    // })
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input name='fullName' placeholder='Full name' onChange={this.handleChange} required />
          <br />
          <input type='email' name='email' placeholder='Email' onChange={this.handleChange} required />
          <br />
          <input type='tel' name='phoneNumber' placeholder='Contact number' onChange={this.handleChange} required />
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <DatePicker
                hintText='Date'
                onChange={this.handleChangeDate}
                required
              />

              {/* <TimePicker
                format='ampm'
                hintText='Start'
                onChange={(e, date) => this.handleChangeEvent(date, 'startTime')}
              />
              <TimePicker
                format='ampm'
                hintText='End'
                onChange={(e, date) => this.handleChangeEvent(date, 'endTime')}
              /> */}
            </div>
          </MuiThemeProvider>
          Start time: <select name='startTime' required onChange={e => this.handleChangeTime(e, 'startTime')}>
            <option value='' disabled selected>Select Time</option>
            {generateTimes(0)}
          </select>
          <br />
          End time: <select name='endTime' required onChange={e => this.handleChangeTime(e, 'endTime')}>
            <option value='' disabled selected>Select Time</option>
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
  return {
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postNewBooking: booking => {
      dispatch(postNewBooking(booking))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
