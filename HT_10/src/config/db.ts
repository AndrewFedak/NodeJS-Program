import mongoose from 'mongoose'

export async function connect(): Promise<typeof mongoose> {
  const connectStr = `mongodb://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_HOST}/${process.env.MONGO_DB_NAME}?authSource=admin`

  try {
    const connection = await mongoose.connect(connectStr)
    console.log('Successfully connected to database')
    return connection
  } catch (e) {
    console.log('DataBase connection failed. exiting now...')
    console.error(e)
    process.exit(1)
  }
}
