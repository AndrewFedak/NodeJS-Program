import { gracefullShutdown } from './infrastructure/gracefull-shutdown'

import { bootstrap } from './server'

bootstrap().then(({ app, mongoose }) => {
  const port = process.env.PORT

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })

  gracefullShutdown(server, mongoose)
})
