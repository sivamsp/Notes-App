import { observer } from 'mobx-react-lite'
import { NextPage } from 'next'
import React from 'react'
import AppHeader from '../components/app-header'
import CreateNote from '../components/create-note'
import Redirect from '../components/helpers/redirect'
import NoteCard from '../components/note-card'
import NoteExpanded from '../components/note-expanded'
import { useNoteStore } from '../note-store/note-store-provider'
import { NotesPageAction, NotesPageQueryParams } from '../types/note'
import { PageContext } from '../types/util'

const NotesPage: NextPage<{
  action?: NotesPageAction
  noteId?: string | null
}> = ({ action, noteId }) => {
  const noteStore = useNoteStore()
  const showNoteExpanded = action === 'SHOW_NOTE' || action == 'EDIT_NOTE'

  return (
    <div className="notes-page">
      <AppHeader />
      <div className="notes-page__content">
        <CreateNote formExpanded={action === 'CREATE_NOTE'} />

        {noteStore.notes.map((note) => (
          <NoteCard key={note.id} note={note} />
        ))}

        {noteStore.notes.length === 0 && (
          <div className="no-notes">
            <img src="/no-notes.png" className="no-notes__image" />
            <h2 className="no-notes__text">
              No Notes found, why not create one! ☝️
            </h2>
          </div>
        )}
      </div>

      {!!noteId &&
        showNoteExpanded &&
        (noteStore.byId.has(noteId) ? (
          <NoteExpanded
            note={noteStore.byId.get(noteId)!}
            editable={action === 'EDIT_NOTE'}
          />
        ) : (
          <Redirect href="/notes" />
        ))}
    </div>
  )
}

NotesPage.getInitialProps = async ({ noteStore, query }: PageContext) => {
  const q = query as unknown as NotesPageQueryParams
  if (!q.skipPageLoad) {
    !!q.noteId
      ? await noteStore.loadNote(q.noteId)
      : await noteStore.loadNotes()
  }
  return { action: q.action, noteId: q.noteId }
}

export default observer(NotesPage)
