import React from 'react'
import Datetime from 'react-datetime'
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
      dateStart: null,
      dateEnd: null,
      purpose: null,
      guestNumber: null,
      deletedRequested: false
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDateStart = this.handleChangeDateStart.bind(this)
    this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  
  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleChangeDateStart (date) {
    this.setState({
      dateStart: date._d
    })
  }

  handleChangeDateEnd (date) {
    this.setState({
      dateEnd: date._d
    })
  }




  handleSubmit (evt) {
    evt.preventDefault()

    const data = {
      fullName: this.state.fullName || this.props.fullName,
      emailAddress: this.state.email || this.props.emailAddress,
      phoneNumber: this.state.phoneNumber || this.props.phoneNumber,
      authId: this.props.authId,
      startDate: this.state.dateStart,
      endDate: this.state.dateEnd,
      purpose: this.state.purpose,
      guestNumber: this.state.guestNumber,
      confirmed: false,
      dateAdded: new Date()}

    this.props.postNewBooking(data)
    console.log(data)
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
          Contact Number: <input type='tel' name='phoneNumber' placeholder={this.props.phoneNumber} onChange={this.handleChange} /><br />
          Start Date and Time:
       <Datetime
       onChange={this.handleChangeDateStart}
       timeConstraints={{hours: {min: 6, max: 22, step: 1}}}/>
          <br />
          End Date and time:
           <Datetime
       onChange={this.handleChangeDateEnd}/>
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
