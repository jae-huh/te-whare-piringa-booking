import React from 'react'
import {connect} from 'react-redux'

function ValidationError (props) {
  return (
    <p>
      {props.validationError}
    </p>
  )
}

function mapStateToProps (state) {
  return {
    validationError: state.validationError
  }
}

export default connect(mapStateToProps)(ValidationError)
