import express, { Request, Response } from 'express'
import next from 'next'
import { ParsedUrlQuery } from 'querystring'
import { NotesPageQueryParams } from '../types/note'

type NextApp = ReturnType<typeof next>

export function newRouter(nextApp: NextApp) {
  const router = express.Router()
  const servePage = makeServePage(nextApp)
  const serveAssets = makeServeAssets(nextApp)

  // Home Page
  router.get('/', (req: Request, res: Response) => {
    res.redirect('/notes')
  })
  router.get('/home', (req: Request, res: Response) => {
    res.redirect('/notes')
  })

  // About Page
  router.get('/about', servePage('/about'))

  // Notes Page
  router.get('/notes', servePage('/notes'))

  router.get(
    '/notes/new',
    servePage(
      '/notes',
      (_req): NotesPageQueryParams => ({
        action: 'CREATE_NOTE',
      }),
    ),
  )

  router.get(
    '/notes/:noteId',
    servePage(
      '/notes',
      (req): NotesPageQueryParams => ({
        action: 'SHOW_NOTE',
        noteId: req.params.noteId,
      }),
    ),
  )

  router.get(
    '/notes/:noteId/edit',
    servePage(
      '/notes',
      (req): NotesPageQueryParams => ({
        action: 'EDIT_NOTE',
        noteId: req.params.noteId,
      }),
    ),
  )

  // Assets
  router.get('*', serveAssets())

  return router
}

function makeServePage(app: NextApp) {
  return (page: string, query?: (req: Request) => object) => {
    return (req: Request, res: Response) => {
      app.render(
        req,
        res,
        page,
        !!query ? (query(req) as unknown as ParsedUrlQuery) : {},
      )
    }
  }
}

function makeServeAssets(app: NextApp) {
  return () => {
    return (req: Request, res: Response) => {
      app.getRequestHandler()(req, res)
    }
  }
}
