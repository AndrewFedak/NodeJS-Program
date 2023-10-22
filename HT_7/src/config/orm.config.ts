import { Options } from '@mikro-orm/core'
import { PostgreSqlDriver } from '@mikro-orm/postgresql'

const config: Options<PostgreSqlDriver> = {
  entities: ['./dist/config/data-models'], // path to your JS entities (dist), relative to `baseDir`
  entitiesTs: ['./data-models'], // path to our TS entities (src), relative to `baseDir`
  migrations: {
    path: './dist/migration', // path to the folder with migrations
    pathTs: './src/migration', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
  },
  type: 'postgresql',
  debug: true,
}

export default config
