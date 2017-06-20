import React from 'react'
import {connect} from 'react-redux'

function ValidationError (props) {
  return (
    <div>
      {props.validationError &&
      <p>
        {props.validationError}
      </p>}
    </div>
  )
}

function mapStateToProps (state) {
  return {
    validationError: state.errors.message
  }
}

export default connect(mapStateToProps)(ValidationError)
