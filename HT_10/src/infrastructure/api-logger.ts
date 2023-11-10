import { RequestHandler } from 'express'
import winston from 'winston'

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.printf(({ message }) => {
    return message
  }),
  transports: [new winston.transports.Console()],
})

export const ApiLoggerMiddleware: RequestHandler = (req, res, next) => {
  const startTime = Date.now()

  res.on('finish', () => {
    const endTime = Date.now()
    const elapsedTime = endTime - startTime

    logger.info(`${req.method} ${req.path} - ${elapsedTime}ms`)
  })

  next()
}
