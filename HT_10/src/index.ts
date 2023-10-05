import { Express } from 'express'

import { bootstrap } from './server'
import { Socket } from 'net'

bootstrap().then((app: Express) => {
  const port = process.env.PORT

  const server = app.listen(port, () => {
    console.log(`Server running on port ${port}`)
  })
  let connections: Socket[] = [];

  server.on('connection', (connection) => {
    connections.push(connection);

    connection.on('close', () => {
      connections = connections.filter((currentConnection) => currentConnection !== connection);
    });
  });

  function shutdown() {
    console.log('Received kill signal, shutting down gracefully');

    server.close(() => {
      console.log('Closed out remaining connections');
      process.exit(0);
    });

    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 20000);

    connections.forEach((connection) => connection.end());

    setTimeout(() => {
      connections.forEach((connection) => connection.destroy());
    }, 10000);
  }

  process.on('SIGTERM', shutdown);
  process.on('SIGINT', shutdown);
})
