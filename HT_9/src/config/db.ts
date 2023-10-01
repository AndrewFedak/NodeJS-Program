import mongoose from 'mongoose'

export async function connect(): Promise<void> {
  const connectStr = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}`

  try {
    await mongoose.connect(connectStr, {
      dbName: process.env.MONGO_DB_NAME,
    })
    console.log('Successfully connected to database')
  } catch (e) {
    console.log('DataBase connection failed. exiting now...')
    console.error(e)
    process.exit(1)
  }
}
