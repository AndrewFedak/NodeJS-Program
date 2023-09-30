import mongoose from 'mongoose'

const connectStr = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`

export default mongoose
  .connect(connectStr, {
    dbName: process.env.MONGO_DB_NAME,
  })
  .then(() =>
    console.log(
      `You have been successfuly connected by: ${
        connectStr + '/' + process.env.MONGO_DB_NAME
      }`,
    ),
  )
