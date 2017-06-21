import React from 'react'
import {Redirect} from 'react-router-dom'
import {connect} from 'react-redux'

class Callback extends React.Component {
  render () {
    const style = {
      position: 'absolute',
      display: 'flex',
      justifyContent: 'center',
      height: '100vh',
      width: '100vw',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: 'white'
    }

    return (
      <div className="callback-container" style={style}>
        {this.props.redirectTo && <Redirect to={`/${this.props.redirectTo}`} />}
        <p>Loading</p>
      </div>
    )
  }
}

function mapStateToProps (state) {
  return {
    redirectTo: state.redirectTo
  }
}

export default connect(mapStateToProps)(Callback)
