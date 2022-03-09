import React, { useState } from 'react'
import Modal from 'react-modal'
import Scrollbar from 'react-scrollbars-custom'

import config from 'config/common'
import lib from 'lib/commons'
import Spinner from 'components/Spinner'

Modal.setAppElement('#root');

const ModalX = ({ modalStatus, closeModal }) => {

  const afterOpenModal = () => {
  }

  const selfClose = (event) => {
    event.preventDefault()
    closeModal()
  }

  return (
    <Modal
      isOpen={modalStatus}
      onAfterOpen={afterOpenModal}
      onRequestClose={selfClose}
      contentLabel="Example Modal"
      portalClassName="ReactModalPortal"
      overlayClassName=""
      className="swal2-show modal-select"
    >
      <div className="modal-description">
        <h2>Modal Title</h2>

        <Scrollbar 
            style={ {height: 220} }
            noScrollX={true}>
          <p>Modal content</p>
        </Scrollbar>
      </div>
      <a onClick={event => selfClose(event)} className="close" data-dismiss="modal" aria-label="Close">
        ×
      </a>
    </Modal>
  )
}
export default ModalX