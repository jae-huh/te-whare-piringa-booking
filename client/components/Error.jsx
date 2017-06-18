import React from 'react'
import {connect} from 'react-redux'

function Error (props) {
  return (
    <h1 className="error-container">{props.errorMessage}</h1>
  )
}

function mapStateToProps (state) {
  return {
    errorMessage: state.error
  }
}

export default connect(mapStateToProps)(Error)
