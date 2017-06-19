import React from 'react'
import {connect} from 'react-redux'
import {ModalContainer, ModalDialog} from 'react-modal-dialog'

function Error (props) {
  function handleClose () {
    props.history.push('/')
  }

  return (
    <ModalContainer onClose={handleClose}>
        <ModalDialog onClose={handleClose}>
          <h1>{props.errorMessage}</h1>
        </ModalDialog>
    </ModalContainer>
  )
}

function mapStateToProps (state) {
  return {
    errorMessage: state.error
  }
}

export default connect(mapStateToProps)(Error)
