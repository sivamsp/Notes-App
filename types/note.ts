export interface INote {
  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date
}

export type NotesPageQueryParams = {
  action?: NotesPageAction
  noteId?: string
  skipPageLoad?: boolean // used to change routes without loading necessary data
}

export type NotesPageAction = 'CREATE_NOTE' | 'SHOW_NOTE' | 'EDIT_NOTE'
