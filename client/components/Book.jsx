import React from 'react'
import TimePicker from 'material-ui/TimePicker'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import injectTapEventPlugin from 'react-tap-event-plugin'

injectTapEventPlugin()

class Book extends React.Component {

  constructor (props) {
    super(props)
    this.state = {
      value24: null,
      value12: null}
  }

  handleChangeTimePicker24 (event, date) {
    this.setState({value24: date})
  }

  handleChangeTimePicker12 (event, date) {
    this.setState({value12: date})
  }

  render () {
    console.log(this.props.eventStart, this.props.eventEnd)
    return (
      <div>
        <input type="email" placeholder="Email"/>
        <input type="tel" placeholder="Contact number" />
        <MuiThemeProvider muiTheme={getMuiTheme()}>
          <div>
            <TimePicker
              format="ampm"
              hintText="12hr Format"
              value={this.state.value12}
              onChange={this.handleChangeTimePicker12}
            />
            <TimePicker
              format="ampm"
              hintText="12hr Format"
              value={this.state.value12}
              onChange={this.handleChangeTimePicker12}
            />
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}

export default Book
