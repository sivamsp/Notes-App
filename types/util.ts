import { NextComponentType, NextPageContext as PageContext_ } from 'next'
import { AppContext as AppContext_ } from 'next/app'
import { NoteStore } from '../note-store/note-store'

export interface AppContext extends AppContext_ {
  ctx: PageContext
  Component: NextComponentType<PageContext>
}

export interface PageContext extends PageContext_ {
  noteStore: NoteStore
}

// A utility-type to properly type a JSON object of a given Model
export type Json<T extends {}> = {
  [key in keyof T]: T[key] extends Date
    ? string
    : T[key] extends object
    ? Json<T[key]>
    : T[key]
}
