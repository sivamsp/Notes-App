import Router from 'next/router'
import React, { useState } from 'react'
import { useNoteStore } from '../note-store/note-store-provider'

const CreateNote: React.FC<{ formExpanded: boolean }> = ({ formExpanded }) => {
  const noteStore = useNoteStore()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  return (
    <div className="create-note">
      <form
        className="create-note__form"
        onSubmit={async (e) => {
          e.preventDefault()
          if (!!title.trim() || !!description.trim()) {
            await noteStore.newNote(title, description).save()
          }
          setTitle(''), setDescription(''), notesPageR()
        }}
      >
        {formExpanded && (
          <input
            className="create-note__title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
          />
        )}

        <textarea
          className="create-note__description"
          placeholder="Take a note..."
          rows={!formExpanded ? 1 : 3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onFocus={newNotePageR}
        />

        {formExpanded && (
          <div className="create-note__actions">
            <button type="submit" className="create-note__close-button">
              CLOSE
            </button>
          </div>
        )}
      </form>
    </div>
  )
}

// replace route with '/notes'
const notesPageR = () =>
  Router.replace(
    {
      pathname: '/notes',
      query: { skipPageLoad: true },
    },
    '/notes',
  )

// replace route with '/notes/new'
const newNotePageR = () =>
  Router.replace(
    {
      pathname: '/notes',
      query: { action: 'CREATE_NOTE', skipPageLoad: true },
    },
    '/notes/new',
  )

export default CreateNote
