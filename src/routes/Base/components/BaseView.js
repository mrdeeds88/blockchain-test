import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import queryString from 'query-string'

import lib from 'lib/commons'
import config from 'config/common'

import ModalPrize from 'components/ModalPrize'

const BaseView = ({
  lng
}) => {

  let history = useHistory()  
  const [modalStatus, setModalStatus] = useState(false)
  const closeModal = () => setModalStatus(false)  

  return (
    <>
      <div className={`main-content main-base`}>
      
      </div>

      {modalStatus && (
        <ModalPrize
          lng={lng}
          popupIndex={popupIndex}
          modalStatus={modalStatus}
          closeModal={closeModal}
          setPopupIndex={setPopupIndex}
        />
      )}
    </>
  )
}

export default BaseView
