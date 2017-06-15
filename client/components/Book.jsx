import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import DatePicker from 'material-ui/DatePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class Book extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value12: null}
  }

  handleChangeTimePicker12 (event, date) {
    this.setState({value12: date})
  }

  render () {
    console.log(this.props.eventStart, this.props.eventEnd)
    return (
      <div>
        <input type="email" placeholder="Email"/>
        <br />
        <input type="tel" placeholder="Contact number" />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <DatePicker hintText="Date" />
            <TimePicker
              format="ampm"
              hintText="Start"
              value={this.state.value12}
              onChange={this.handleChangeTimePicker12}
            />
            <TimePicker
              format="ampm"
              hintText="End"
              value={this.state.value12}
              onChange={this.handleChangeTimePicker12}
            />
          </div>
        </MuiThemeProvider>
        {/* <button>Book</button> */}
        <input type='submit' value='Book' />
      </div>
    )
  }
}

export default Book
