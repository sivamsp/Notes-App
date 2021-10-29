import Router from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { Note } from '../note-store/note-store'

const NoteExpanded: React.FC<{ note: Note; editable: boolean }> = ({
  note,
  editable,
}) => {
  // Focus cursor on textarea the moment as soon as modal
  // is shown on the screen
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  useEffect(() => {
    const elem = textareaRef.current
    const textLen = note.description.length
    if (!!elem) {
      elem.focus()
      elem.setSelectionRange(textLen, textLen)
    }
  }, [])

  const [title, setTitle] = useState(note.title)
  const [description, setDescription] = useState(note.description)

  const closeModal = async () => {
    if (editable && !!note) {
      await note
        .copyWith({ title, description, updatedAt: new Date() })
        .update()
    }
    setTitle(''), setDescription(''), notesPageR()
  }

  return (
    <div className="note-expanded">
      <div className="note-expanded__overlay" onClick={closeModal} />
      <div className="note-expanded__modal">
        <form
          onSubmit={(e) => {
            e.preventDefault()
            closeModal()
          }}
        >
          <input
            placeholder="Title"
            className="note-expanded__title"
            value={title}
            onChange={(e) => {
              !editable && editNotePageR(note.id)
              setTitle(e.target.value)
            }}
          />
          <textarea
            rows={14}
            ref={textareaRef}
            placeholder="Note"
            className="note-expanded__description"
            value={description}
            onChange={(e) => {
              !editable && editNotePageR(note.id)
              setDescription(e.target.value)
            }}
          />
          <div className="note-expanded__actions">
            <button type="submit" className="note-expanded__close-button">
              CLOSE
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// change route to '/notes'
const notesPageR = () => Router.push('/notes')

// replace route with '/notes/[noteId]/edit'
const editNotePageR = (noteId: string) =>
  Router.replace(
    {
      pathname: '/notes',
      query: { noteId, action: 'EDIT_NOTE', skipPageLoad: true },
    },
    `/notes/${noteId}/edit`,
  )

export default NoteExpanded
