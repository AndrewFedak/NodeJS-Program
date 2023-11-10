import mongoose from 'mongoose'

export async function connect(): Promise<typeof mongoose> {
  const { MONGO_USER, MONGO_PASSWORD, MONGO_HOST, MONGO_PORT, MONGO_DB_NAME } =
    process.env
  const connectStr = `mongodb://${MONGO_USER}:${MONGO_PASSWORD}@${MONGO_HOST}:${MONGO_PORT}/${MONGO_DB_NAME}?authSource=admin`

  try {
    const connection = await mongoose.connect(connectStr)
    console.log('Successfully connected to database')
    return connection
  } catch (e) {
    console.log('mongodb string', connectStr)
    console.log('DataBase connection failed. exiting now...')
    console.error(e)
    process.exit(1)
  }
}
