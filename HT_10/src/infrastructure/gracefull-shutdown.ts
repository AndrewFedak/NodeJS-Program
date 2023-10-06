import { Server } from 'http'
import { Mongoose } from 'mongoose'
import { Socket } from 'net'
import util from 'util'

const debuglog = util.debuglog('gracefull_shutdown')

export function gracefullShutdown(server: Server, mongoose: Mongoose) {
  let connections: Socket[] = []

  server.on('connection', connection => {
    connections.push(connection)

    connection.on('close', () => {
      connections = connections.filter(
        currentConnection => currentConnection !== connection,
      )
    })
  })

  function shutdown() {
    debuglog('Received kill signal, shutting down gracefully')

    mongoose.connection.close().then(() => {
      debuglog('MongoDB connection successfully closed')
    })

    server.close(() => {
      debuglog('Closed out remaining connections')
      process.exit(0)
    })

    setTimeout(() => {
      debuglog('Could not close connections in time, forcefully shutting down')
      process.exit(1)
    }, 20000)

    connections.forEach(connection => connection.end())
    setTimeout(() => {
      connections.forEach(connection => connection.destroy())
    }, 10000)
  }

  process.on('SIGTERM', shutdown)
  process.on('SIGINT', shutdown)
}
