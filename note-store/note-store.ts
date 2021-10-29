import { makeAutoObservable, runInAction } from 'mobx'
import { nanoid } from 'nanoid'
import { INote } from '../types/note'
import { Json } from '../types/util'
import { doFetch } from '../utils/fetch'

export class NoteStore {
  byId: Map<string, Note>

  constructor() {
    makeAutoObservable(this, { hydrate: false })
    this.byId = new Map()
  }

  get notes() {
    return Array.from(this.byId.values()).sort(
      (a, b) => +b.updatedAt - +a.updatedAt,
    )
  }

  hydrate(items: Json<INote>[]) {
    items.forEach((j) => {
      const note = new Note(this, j)
      runInAction(() => this.byId.set(note.id, note))
    })
  }

  newNote(title: string, description: string) {
    const nowStr = new Date().toString()
    return new Note(this, {
      id: nanoid(8),
      title: title,
      description: description,
      createdAt: nowStr,
      updatedAt: nowStr,
    })
  }

  async loadNotes() {
    const { data: items } = await doFetch<Json<INote>[]>({
      method: 'GET',
      urlPath: '/notes',
    })
    this.hydrate(items)
  }

  async loadNote(noteId: string) {
    const { data: item, statusCode } = await doFetch<Json<INote>>({
      method: 'GET',
      urlPath: `/notes/${noteId}`,
    })
    statusCode == 200 && this.hydrate([item])
  }
}

export class Note implements INote {
  store: NoteStore

  id: string
  title: string
  description: string
  createdAt: Date
  updatedAt: Date

  constructor(store: NoteStore, j: Json<INote>) {
    makeAutoObservable(this, { store: false, json: false, copyWith: false })
    this.store = store
    this.id = j.id
    this.title = j.title
    this.description = j.description
    this.createdAt = new Date(j.createdAt)
    this.updatedAt = new Date(j.updatedAt)
  }

  get json(): Json<INote> {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      createdAt: this.createdAt.toString(),
      updatedAt: this.updatedAt.toString(),
    }
  }

  async save() {
    await doFetch({
      method: 'POST',
      urlPath: '/notes',
      body: this.json,
    })
    runInAction(() => this.store.byId.set(this.id, this))
  }

  async update() {
    await doFetch({
      method: 'PUT',
      urlPath: `/notes/${this.id}`,
      body: this.json,
    })
    runInAction(() => this.store.byId.set(this.id, this))
  }

  async delete() {
    await doFetch({
      method: 'DELETE',
      urlPath: `/notes/${this.id}`,
    })
    runInAction(() => this.store.byId.delete(this.id))
  }

  copyWith(obj: Partial<INote>) {
    return new Note(this.store, {
      id: this.id,
      title: obj.title ?? this.title,
      description: obj.description ?? this.description,
      createdAt: (obj.createdAt ?? this.createdAt).toString(),
      updatedAt: (obj.updatedAt ?? this.updatedAt).toString(),
    })
  }
}
