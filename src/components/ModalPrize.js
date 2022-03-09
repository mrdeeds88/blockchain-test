import React, { useState } from 'react'
import Modal from 'react-modal'
import Scrollbar from 'react-scrollbars-custom'

import config from 'config/common'
import lib from 'lib/commons'
import Spinner from 'components/Spinner'

Modal.setAppElement('#root');

const ModalPrize = ({ lng, lngCode, prizeInfo, modalStatus, closeModal }) => {

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
      className={`animated fadeInDown faster modal-big modal-prize modal-prize--${prizeInfo.index}`}
    >
      <img src="/images/popup-bg.png" alt="" className="popup-bg"/>
      <div className={`popup-img popup-img--${prizeInfo.index}`}><img src={prizeInfo.image} alt=""/></div>
      <div className="popup-content">
        <div className="row align-items-center">
          <div className="col-6 offset-6">
            <div dangerouslySetInnerHTML={{__html: prizeInfo.content}}></div>
            {config.timelines[prizeInfo.index - 1].hash && (
              <a href="#" className="btn btn--dark" onClick={event => {
                lib.toEvent(lng, lngCode, event)
              }}>{lng.btnShareEventLabel}</a>
            )}
          </div>
        </div>
      </div>
      <a onClick={event => selfClose(event)} className="close" data-dismiss="modal" aria-label="Close">
        ×
      </a>
    </Modal>
  )
}
export default ModalPrize