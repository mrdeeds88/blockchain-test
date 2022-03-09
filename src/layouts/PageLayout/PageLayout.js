import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router'
import config from 'config/common'
import queryString from 'query-string'
import request from 'lib/request'

import {
  getCurrentUser
} from 'authentication/actions'

import Header from './Header'

const PageLayout = ({ lng, currentUser, getCurrentUser, location, children }) => {

  return (
    <>
      <section id="main-body" className={`page-${location.pathname != '/' ? location.pathname.replace('/', '') : ''}`}>
        <>
          {children}
        </>
      </section>
    </>
  )
}

const mapDispatchToProps = {
  getCurrentUser
}

const mapStateToProps = (state) => ({
  currentUser: state.currentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(PageLayout))
