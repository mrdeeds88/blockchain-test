import React, { useState, useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import useOutsideClick from "components/useOutsideClick"
import dayjs from 'dayjs'

import config from 'config/common'
import lib from 'lib/commons'

const Sidebar = ({
  sidebarOpened,
  setSidebarOpened,
  lng
}) => {
  const ref = useRef();

  useOutsideClick(ref, () => {
    setSidebarOpened(false)
  });

  return (
    <div className={`sidebar${sidebarOpened ? ' sidebar--opened' : ''}`} ref={ref}>
      <a href="#" className="menu-mobile" onClick={event => {
        event.preventDefault()
        setSidebarOpened(true)
      }}><img src="/images/menu-bar.png" alt=""/></a>
      
      <NavLink to="/home" className="logo-sidebar" onClick={event => setSidebarOpened(false)}><img src="/images/logo.png" alt="" /></NavLink> 

      <ul className="sidebar__menu">
        <li><NavLink to="/home" onClick={event => setSidebarOpened(false)}><span><em>{lng.menuHome}</em></span></NavLink></li>
      </ul>

      <a href="#" className="sidebar__close" onClick={event => {
        event.preventDefault()
        setSidebarOpened(false)
      }}><img src="/images/close.png" alt=""/></a>
    </div>
  )
}

export default Sidebar