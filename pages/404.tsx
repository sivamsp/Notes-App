import { NextPage } from 'next'
import Link from 'next/link'
import React from 'react'
import AppHeader from '../components/app-header'

const ErrorPage: NextPage<{}> = () => {
  return (
    <div className="error-page">
      <AppHeader />
      <div className="error-page__content">
        <img src="/404.png" className="error-page__image" />
        <h2 className="error-page__text">
          We couldn't find the page you are looking for 😔.
        </h2>
        <Link href="/notes">
          <a>Go to notes</a>
        </Link>
      </div>
    </div>
  )
}

export default ErrorPage
