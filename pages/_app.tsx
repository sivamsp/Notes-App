import { enableStaticRendering } from 'mobx-react-lite'
import { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import * as P from '../note-store/note-store-provider'
import '../styles/index.scss'
import { INote } from '../types/note'
import { AppContext, Json } from '../types/util'
import { isServer } from '../utils/env'

// Should be set in server to prevent memory leaks from mobx react
enableStaticRendering(isServer)

export default class extends React.Component<
  AppProps & { initialData?: Json<INote>[] }
> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const noteStore = P.getOrCreateNoteStore()

    let pageProps = {}
    if (!!Component.getInitialProps) {
      ctx.noteStore = noteStore
      pageProps = await Component.getInitialProps(ctx)
    }

    let initialData = undefined
    if (isServer) {
      initialData = noteStore.notes.map((n) => n.json)
    }

    return { pageProps, initialData }
  }

  render() {
    const noteStore = P.getOrCreateNoteStore(this.props.initialData)
    const { Component, pageProps } = this.props

    return (
      <>
        <Head>
          <title>Notes App</title>
        </Head>
        <P.NoteStoreProvider noteStore={noteStore}>
          <Component {...pageProps} />
        </P.NoteStoreProvider>
      </>
    )
  }
}
