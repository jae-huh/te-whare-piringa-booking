import React from 'react'
import Datetime from 'react-datetime'
import injectTapEventPlugin from 'react-tap-event-plugin'
import {connect} from 'react-redux'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'
import {newBooking} from '../actions/index'
import moment from 'moment'
import {validateBookingDetails, checkBookingForOverlap} from '../utils/vars'
import {validationError} from '../actions'

injectTapEventPlugin()

class Book extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      authId: '',
      fullName: this.props.user.fullName,
      emailAddress: this.props.user.emailAddress,
      phoneNumber: this.props.user.phoneNumber,
      dateStart: this.props.startTime,
      dateEnd: this.props.endTime,
      purpose: null,
      guestNumber: null,
      message: ''
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDateStart = this.handleChangeDateStart.bind(this)
    this.handleChangeDateEnd = this.handleChangeDateEnd.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleClose = this.handleClose.bind(this)
    this.message = this.message.bind(this)
    this.redirect = this.redirect.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleClose () {
    this.props.history.push('/schedule')
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
      fullName: this.state.fullName,
      emailAddress: this.state.emailAddress,
      phoneNumber: this.state.phoneNumber,
      authId: this.props.user.authId,
      startDate: moment(this.state.dateStart),
      endDate: moment(this.state.dateEnd),
      purpose: this.state.purpose,
      guestNumber: this.state.guestNumber,
      dateAdded: new Date()
    }
    let message = validateBookingDetails(data)
    if (message !== 'ok') return this.props.validationError(message)
    message = checkBookingForOverlap(data, this.props.bookings)
    if (message !== 'ok') return this.props.validationError(message)
    this.props.postNewBooking(data)
    this.message()
  }

  redirect () {
    this.setState({message: ''})
    this.props.history.push('/schedule')
  }

  message () {
    this.setState({
      message: "Thank you for your booking. We'll contact you soon to confirm the details"
    })
    setTimeout(this.redirect, 4000)
  }

  render () {
    return (
      <div className='book-container'>
        <ModalContainer onClose={this.handleClose} className='book-container'>
          <ModalDialog onClose={this.handleClose} className='book-container'>
            {!this.state.message &&
            <form onSubmit={this.handleSubmit}>
              <div className="form-group row">
                <label className="col-xs-3">Full Name:</label>
                <div className="col-xs-9">
                  <input name='fullName' className="form-control col-md-10" value={this.state.fullName} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group row">
                  <label className="col-xs-3">Email Address:</label>
                  <div className="col-xs-9">
                    <input type='email' name='emailAddress' className="form-control" value={this.state.emailAddress} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group row">
                <label className="col-xs-3">Contact Number:</label>
                  <div className="col-xs-9">
                    <input type='tel' name='phoneNumber' className="form-control" value={this.state.phoneNumber} onChange={this.handleChange} />
                  </div>
                </div>
                <div className="form-group row">
                <label className="col-xs-3">Start Date and Time:</label>
                  <div className="col-xs-9">
                    <Datetime value={this.state.dateStart}
                    onChange={this.handleChangeDateStart}
                    timeConstraints={{hours: {min: 6, max: 22, step: 1}, minutes: {step: 30}}}
                    className="datepick"/>
                  </div>
                </div>
                <div className="form-group row">
                <label className="col-xs-3">End Date and Time:</label>
                <div className="col-xs-9">
                <Datetime value={this.state.dateEnd}
                onChange={this.handleChangeDateEnd}
                className="datepick"/>
              </div>
            </div>
              <div className="form-group row">
                <label className="col-xs-3">Purpose:</label>
                <div className="col-xs-9">
                  <textarea name='purpose' required placeholder='Purpose of hire' className="form-control" onChange={this.handleChange} />
              </div>
            </div>
            <div className="form-group row">
              <label className="col-xs-3">Number of Guests:</label>
              <div className="col-xs-9">
                <input type='number' min='0' name='guestNumber' placeholder="Type '0' if unknown" className="form-control number-guest" onChange={this.handleChange} required />
              </div>
            </div>
            <div className="form-group row text-center">
              <input type='submit' value='Book' className="setting-btn" />
            </div>
          </form>
            }
          {this.state.message && <h3 className="confirm-message">{this.state.message}</h3>}
        </ModalDialog>
      </ModalContainer>
    </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user,
    startTime: state.newBooking.startTime,
    endTime: state.newBooking.endTime,
    bookings: state.bookings
  }
}

function mapDispatchToProps (dispatch) {
  return {
    postNewBooking: data => {
      dispatch(newBooking(data))
    },
    validationError: message => dispatch(validationError(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Book)
