import React from 'react'
import { INote } from '../types/note'
import { Json } from '../types/util'
import { isServer } from '../utils/env'
import { NoteStore } from './note-store'

let noteStore: NoteStore | undefined
let noteStoreContext = React.createContext<NoteStore | undefined>(undefined)

export const getOrCreateNoteStore = (initialData?: Json<INote>[]) => {
  // In server, store is created twice
  //  1. _app.getInitialProps without initial data
  //  2. _app.render with initial data
  if (isServer) {
    const noteStore = new NoteStore()
    !!initialData && noteStore.hydrate(initialData)
    return noteStore
  }

  // In client, store is created once
  //  1. _app.render with initial data
  //  2. and reused there after
  if (!noteStore) {
    noteStore = new NoteStore()
    !!initialData && noteStore.hydrate(initialData)
  }

  return noteStore
}

export const NoteStoreProvider: React.FC<{
  noteStore: NoteStore
  children: JSX.Element | JSX.Element[]
}> = ({ noteStore, children }) => {
  return React.createElement(
    noteStoreContext.Provider,
    { value: noteStore },
    children,
  )
}

export const useNoteStore = () => {
  const context = React.useContext(noteStoreContext)
  if (!context) {
    throw new Error('useNoteStore must be used within a NoteStoreProvider')
  }
  return context
}
