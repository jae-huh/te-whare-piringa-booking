import React from 'react'
import Datetime from 'react-datetime'
import injectTapEventPlugin from 'react-tap-event-plugin'
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
      dateStart: this.props.display.dateStart,
      dateEnd: this.props.display.dateEnd,
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
      fullName: this.state.fullName || this.props.user.fullName,
      emailAddress: this.state.email || this.props.user.emailAddress,
      phoneNumber: this.state.phoneNumber || this.props.user.phoneNumber,
      authId: this.props.user.authId,
      startDate: this.state.dateStart,
      endDate: this.state.dateEnd,
      purpose: this.state.purpose,
      guestNumber: this.state.guestNumber,
      confirmed: false,
      dateAdded: new Date(),
      deleteRequested: false
    }
    this.props.postNewBooking(data)
    this.props.history.push('/calendar')
  }
  render () {
    return (
      <div className='book-container'>
        <form onSubmit={this.handleSubmit}>
          Full Name: <input name='fullName' placeholder={this.props.user.fullName} onChange={this.handleChange} />
          <br />
          Email Address: <input type='email' name='email' placeholder={this.props.user.emailAddress} onChange={this.handleChange} />
          <br />
          Contact Number: <input type='tel' name='phoneNumber' placeholder={this.props.user.phoneNumber} onChange={this.handleChange} /><br />
          Start Date and Time:
       <Datetime value={this.props.display.dateStart}
       onChange={this.handleChangeDateStart}
       timeConstraints={{hours: {min: 6, max: 22, step: 1}}}
       className="datepick"/>
          <br />
          End Date and time:
           <Datetime value={this.props.display.dateEnd}
       onChange={this.handleChangeDateEnd}
       className="datepick"/>
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
  return {
    user: state.user,
    display: state.display
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postNewBooking: data => {
      dispatch(newBooking(data))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
