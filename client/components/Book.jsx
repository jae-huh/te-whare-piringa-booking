import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'
import moment from 'moment'

injectTapEventPlugin()

class Book extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      email: null,
      contactNum: null,
      date: null,
      eventStart: null,
      eventEnd: null
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleChangeDate = this.handleChangeDate.bind(this)
    this.handleChangeEvent = this.handleChangeEvent.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange (evt) {
    this.setState({
      [evt.target.name]: evt.target.value
    })
  }

  handleChangeDate (evt, date) {
    this.setState({
      date: moment(date).format('DD/MM/YYYY')
    })
  }

  handleChangeEvent (date, key) {
    this.setState({
      [key]: moment(date).format('h:mmA')
    })
  }

  handleSubmit (evt) {
    evt.preventDefault()
    // this.props.dispatch(saveNewCaption(this.state, (newCaptionId) => {
    //   this.props.routerProps.history.push(`/images/${this.state.imageId}/${newCaptionId}`)
    // }))
    console.log(this.state)
  }

  render () {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="email" name="email" placeholder="Email" onChange={this.handleChange} />
          <br />
          <input type="tel" name="contactNum" placeholder="Contact number" onChange={this.handleChange} />
          <MuiThemeProvider muiTheme={getMuiTheme()}>
            <div>
              <DatePicker
                hintText="Date"
                onChange={this.handleChangeDate}
              />
              <TimePicker
                format="ampm"
                hintText="Start"
                value={this.state.eventStart}
                onChange={(e, date) => this.handleChangeEvent(date, 'eventStart')}
              />
              <TimePicker
                format="ampm"
                hintText="End"
                value={this.state.eventEnd}
                onChange={(e, date) => this.handleChangeEvent(date, 'eventEnd')}
              />
            </div>
          </MuiThemeProvider>
          <input type='submit' value='Book' />
        </form>
      </div>
    )
  }
}

export default Book
