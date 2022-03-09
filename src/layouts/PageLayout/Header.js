import React, { useState, useEffect } from 'react'
import { NavLink, useHistory, useParams, useLocation } from 'react-router-dom'
import queryString from 'query-string'

import config from 'config/common'
import lib from 'lib/commons'

import Sidebar from './Sidebar'

const Header = ({
  lng,
  user = {},
}) => {
  let history = useHistory()

  const [sidebarOpened, setSidebarOpened] = useState(false)
  const parsed = queryString.parse(location.search)
  if(parsed.utm_source == 'client') {
    localStorage.setItem('is-ingame', '1')
  }

  return (
    <>
      <div id="header">
        <div className="top-menu">
          <NavLink to="/home" className="logo"><img src="/images/logo.png" alt=""/></NavLink>
        </div>
        <div className="login-area">
          {!user.id ? (
            <a href="#" onClick={event => {
              event.preventDefault()
              lib.showLogin()
            }}>{lng.signIn} <img src="/images/icon-power.png" alt="" className="icon-power"/></a>
          ) : (
            <>
              
              <a href="/connect/garena/logout"><span className="user-name">Hi {user.nickname}, </span> <img src="/images/icon-power.png" alt="" className="icon-power"/></a>
            </>
          )}
        </div>
      </div>
      <Sidebar sidebarOpened={sidebarOpened} setSidebarOpened={setSidebarOpened} lng={lng}/>
    </>
  )
}

export default Header