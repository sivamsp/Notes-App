import { NextPage } from 'next'
import React from 'react'
import AppHeader from '../components/app-header'

const AboutPage: NextPage<{}> = () => {
  return (
    <div className="about-page">
      <AppHeader />
      <div className="about-page__content">
        <h1>About</h1>
        <p>Hi my name is Pavan. This is a take home assignment for position at Serokell.</p>
        <p>
          I love building sound type safe applications. The following is the
          source code for a full fledged podcast player{' '}
          <small>(called Phenopod)</small> that I built some time ago. I think
          it will give some opinion on how I write programs 😊.
        </p>
        <ul>
          <li>
            Web App <em>(React/Redux/Typescript)</em>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://github.com/VarmaMSP/lyre" target="_blank">
              Repo link
            </a>
          </li>
          <li>
            Mobile Appl <em>(Flutter/Dart)</em>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://github.com/VarmaMSP/piano" target="_blank">
              Repo link
            </a>{' '}
          </li>
          <li>
            API / RSS Crawler / Worker Server <em>(Go)</em>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://github.com/VarmaMSP/cello" target="_blank">
              Repo link
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default AboutPage
