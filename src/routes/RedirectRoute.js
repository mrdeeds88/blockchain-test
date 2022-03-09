import React from 'react'
import { Redirect } from 'react-router'
import queryString from 'query-string'

const RedirectRoute = () => {

  let url = '/home'
  const parsed = queryString.parse(location.search);
  
  if(parsed.redirect_page) {
    url = parsed.redirect_page
  }

  return (
    <Redirect to={url + location.search}/>
  )
}

export default RedirectRoute
