import React from 'react'
import {getUnconfirmed} from '../api/'

class AdminPortal extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      unconfirmed: []
    }
    this.handleClick = this.handleClick.bind(this)
    this.listUnconfirmed = this.listUnconfirmed.bind(this)
  }

  componentDidMount () {
    this.listUnconfirmed()
  }

  listUnconfirmed () {
    getUnconfirmed((err, res) => {
      if (err) this.setState({error: err.message})
      this.setState({
        unconfirmed: res
      })
    })
  }

  handleClick (id) {
    // confirm(id)
  }

  render () {
    return (
      <div className="admin-portal">
        <h1>Admin Portal</h1>
        {this.state.unconfirmed.map(item => {
          return (
            <div>
              {item.startDate} to {item.endDate}
              <button onClick={() => { this.handleClick(item.id) }}>Confirm</button>
            </div>
          )
        })}
      </div>
    )
  }
}

export default AdminPortal
