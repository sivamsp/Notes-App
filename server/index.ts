import jsonServer from 'json-server'
import next from 'next'
import path from 'path'
import { newRouter } from './routes'

const port = +(process.env.PORT ?? '4000')
const nextApp = next({ dev: process.env.NODE_ENV !== 'production' })
const dbFilePath = path.join(__dirname, 'db.json')

nextApp
  .prepare()
  .then(() => {
    const server = jsonServer.create()
    const nextRouter = newRouter(nextApp)

    server
      .use(jsonServer.bodyParser)
      .use('/api', jsonServer.router(dbFilePath))
      .use('/', nextRouter)
      .listen(port, () => {
        console.log(`Server running on port ${port}`)
      })
  })
  .catch(console.error)
