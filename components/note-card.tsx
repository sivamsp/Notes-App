import Link from 'next/link'
import React, { useState } from 'react'
import usePopper from '../hooks/use-popper'
import { Note } from '../note-store/note-store'
import Portal from './helpers/portal'

const NoteCard: React.FC<{ note: Note }> = ({ note }) => {
  const [showOptions, setShowOptions] = useState(false)
  const [reference, popper] = usePopper({
    placement: 'bottom-start',
    modifiers: [{ name: 'offset', options: { offset: [0, 5] } }],
    strategy: 'absolute',
  })

  return (
    <Link
      href={{
        pathname: '/notes',
        query: { noteId: note.id, action: 'SHOW_NOTE' },
      }}
      as={`/notes/${note.id}`}
    >
      <a className="note-card">
        {note.title !== '' && (
          <div className="note-card__title">{note.title}</div>
        )}

        {note.description !== '' && (
          <div className="note-card__description">{note.description}</div>
        )}

        {note.title === '' && note.description === '' && (
          <div className="note-card__placeholder-text">Empty note 😐</div>
        )}

        <div className="note-card__bottom-menu">
          <div className="note-card__edited-on">
            {`last edited on ${note.updatedAt.toLocaleString('en-US')}`}
          </div>

          <div
            ref={reference.ref}
            className="note-card__more-options"
            onClick={(e) => {
              e.preventDefault()
              setShowOptions(!showOptions)
            }}
          >
            <div
              style={{
                width: '24px',
                height: '24px',
                backgroundImage: "url('/more-options.svg')",
              }}
            />
          </div>

          {showOptions && (
            <Portal>
              <div
                ref={popper.ref}
                style={popper.styles}
                className="note-card__options-dropdown"
              >
                <div
                  className="note-card__options-dropdown__option"
                  onClick={async (e) => {
                    e.preventDefault()
                    await note.delete()
                  }}
                >
                  Delete Note
                </div>
              </div>
            </Portal>
          )}
        </div>
      </a>
    </Link>
  )
}

export default NoteCard
