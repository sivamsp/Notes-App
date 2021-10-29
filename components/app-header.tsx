import Link from 'next/link'
import React from 'react'

const AppHeader: React.FC<{}> = () => {
  return (
    <div className="app-header">
      <div className="app-header__app-logo">Notes App</div>
      <div className="app-header__nav-menu">
        <Link href="/notes">
          <a className="app-header__nav-link">Home</a>
        </Link>
        <Link href="/about">
          <a className="app-header__nav-link">About</a>
        </Link>
      </div>
    </div>
  )
}

export default AppHeader
