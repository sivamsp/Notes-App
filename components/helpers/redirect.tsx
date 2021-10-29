import Router from 'next/router'
import React, { useEffect } from 'react'
import { UrlObject } from 'url'

const Redirect: React.FC<{
  href: string | UrlObject
  as?: string | UrlObject
}> = ({ href, as }) => {
  useEffect(() => {
    Router.replace(href, as)
  }, [])

  return <></>
}

export default Redirect
