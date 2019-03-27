import React from 'react'
import {connect} from 'react-redux'

import Details from './Details'
import {confirm, deleteBooking, selectBooking, requestDelete} from '../actions/index'
// import Setting from './Settings'
// import {ModalContainer, ModalDialog} from 'react-modal-dialog'

class AdminPortal extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      showSettings: false,
      currentFilter: 'unconfirmed',
      modal: false,
      sure: false
    }

    this.handleConfirmClick = this.handleConfirmClick.bind(this)
    this.handleDeleteClick = this.handleDeleteClick.bind(this)
    this.saveBookingToStore = this.saveBookingToStore.bind(this)
    this.settingShow = this.settingShow.bind(this)
    this.applyFilter = this.applyFilter.bind(this)
    this.isInFilter = this.isInFilter.bind(this)
    this.handleClose = this.handleClose.bind(this)
  }

  settingShow () {
    this.setState({showSettings: !this.state.showSettings})
  }

  handleConfirmClick (id) {
    this.props.confirm(id)
    this.setState({
      modal: false
    })
  }

  handleDeleteClick (booking) {
    this.props.deleteBooking(booking)
    this.setState({
      modal: false,
      sure: false
    })
  }

  saveBookingToStore (booking) {
    this.props.selectBooking(booking)
    this.setState({
      modal: true
    })
  }

  handleClose () {
    this.setState({
      modal: false,
      showSettings: false,
      sure: false
    })
    this.props.history.push('/admin')
  }

  applyFilter (currentFilter) {
    this.setState({
      currentFilter
    })
  }

  isInFilter (booking) {
    const current = this.state.currentFilter
    if (current === 'unconfirmed' && !booking.confirmed && booking.endDate > new Date()) {
      return true
    }
    if (current === 'confirmed' && booking.confirmed && booking.endDate > new Date()) {
      return true
    }
    if (current === 'delete' && booking.deleteRequested && booking.endDate > new Date()) {
      return true
    }
    if (current === 'all' && booking.endDate > new Date()) {
      return true
    }
    if (current === 'history' && booking.endDate < new Date()) {
      return true
    }
    return false
  }

  requestBookingToBeDeleted (booking) {
    this.props.requestDelete(booking)
    this.handleClose()
  }

  render () {
    return (
      <div className="admin-portal container">
        <div>
          <h2>Welcome, {this.props.user.fullName}</h2>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10">
              <h2>Bookings</h2>
              <div>
                <p className="admin-radio-container">
                  <div>
                    <input type="radio" name="filter" id="Show All" onClick={() => this.applyFilter('all') } />
                    &nbsp;
                    <label htmlFor="Show All">All</label>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div>
                    <input type="radio" name="filter" id="Show Unconfirmed" onClick={() => this.applyFilter('unconfirmed')} defaultChecked/>
                    &nbsp;
                    <label htmlFor="Show Unconfirmed">Unconfirmed</label>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div>
                    <input type="radio" name="filter" id="Show Confirmed" onClick={() => this.applyFilter('confirmed')} />
                    &nbsp;
                    <label htmlFor="Show Confirmed">Confirmed</label>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div>
                    <input type="radio" name="filter" id="Show Delete Requested" onClick={() => this.applyFilter('delete')} />
                    &nbsp;
                    <label htmlFor="Show Delete Requested">Delete Requested</label>
                    &nbsp;&nbsp;&nbsp;
                  </div>
                  <div>
                    <input type="radio" name="filter" id="Show History" onClick={() => this.applyFilter('history')} />
                    &nbsp;
                    <label htmlFor="Show History">History</label>
                    &nbsp;
                  </div>
                </p>
              </div>
              <div className="unconfirmed-list">
              {this.props.bookings.filter(this.isInFilter).map(item => {
                return (
                  <div key={item._id} className="row">
                    <div className="col-sm-12">
                      <div className="list-of-unconfirmed" onClick={() => { this.saveBookingToStore(item) }}>
                        {item.fullName}<hr />
                        {item.startDate.toString().substring(0, 16)} to {item.endDate.toString().substring(0, 16)}<hr />
                        {item.startDate.toString().substring(16, 21)} to {item.endDate.toString().substring(16, 21)}
                      </div>
                    </div>
                  </div>
                )
              })}
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-md-1" />
            <div className="col-md-10 text-center">
              {this.props.admin && (
                <div>
                  <button onClick={this.settingShow} className="setting-btn">Settings</button>
                </div>
              )}
              {this.props.booking.fullName && this.state.modal &&
                <div>
                  <h3>Details</h3>
                  <Details />
                  {!this.props.admin && !this.state.sure && <div className="text-center"> <button onClick={() => this.setState({sure: true})}>Request Delete</button></div>}
                  {!this.props.admin && this.state.sure &&
                    <div className="text-center">
                      <p className="sure">Are you sure?</p>
                      <button onClick={() => this.requestBookingToBeDeleted(this.props.booking)}>Yes, Request Delete</button>
                    </div>
                  }
                  {this.props.admin &&
                    <div className="modal-admin">
                      {!this.state.sure &&
                        <div className="text-center">
                          {!this.props.booking.confirmed && <span className="glyphicon glyphicon-ok confirm" onClick={() => { this.handleConfirmClick(this.props.booking._id) }}></span>}
                          <span className="glyphicon glyphicon-trash remove" onClick={() => this.setState({sure: true})}></span>
                        </div>
                      }
                      {this.state.sure &&
                        <div className="text-center">
                          <p className='sure'>Are you sure you want to delete?</p>
                          <button className="setting-button" onClick={() => { this.handleDeleteClick(this.props.booking) }}>Yes</button>
                          <button className="setting-button" onClick={() => { this.handleClose() }} defaultValue>No</button>
                        </div>
                      }
                    </div>
                  }
                </div>
              }
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    bookings: state.bookings.filter(booking => booking.authId),
    admin: state.user.admin,
    booking: state.booking,
    user: state.user
  }
}

function mapDispatchToProps (dispatch) {
  return {
    confirm: id => { dispatch(confirm(id)) },
    deleteBooking: id => { dispatch(deleteBooking(id)) },
    selectBooking: booking => { dispatch(selectBooking(booking)) },
    requestDelete: id => dispatch(requestDelete(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AdminPortal)
