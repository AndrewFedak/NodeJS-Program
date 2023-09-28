import { MikroORM, Options } from '@mikro-orm/core';
import { PostgreSqlDriver } from "@mikro-orm/postgresql";

const config: Options<PostgreSqlDriver> = {
    entities: ['./dist/config/data-models'], // path to your JS entities (dist), relative to `baseDir`
    entitiesTs: ['./data-models'], // path to our TS entities (src), relative to `baseDir`
    migrations: {
        path: './dist/migrations', // path to the folder with migrations
        pathTs: './src/migrations', // path to the folder with TS migrations (if used, we should put path to compiled files in `path`)
    },
    type: 'postgresql',
};

export default config;