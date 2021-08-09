
module.exports = {
  "name" : "default",
  "type": "postgres",
  "url" : process.env.DATABASE_URL,
  "synchronize": false,
  "logging": false,
  "extra": {
    "ssl": {
      "rejectUnauthorized": false
    }
  },
  "entities": [
    process.env.DEV_MODE === 1 ? 'src/entity/**/*.ts' : 'dist/src/entity/**/*.js'
  ],
  "migrations": [
    process.env.DEV_MODE === 1 ? 'src/migration/**/*.ts' : 'dist/src/migration/**/*.js'
  ],
  "subscribers": [
    process.env.DEV_MODE === 1 ? 'src/subscriber/**/*.ts' : 'dist/src/subscriber/**/*.js'
  ],
  "cli": {
    "entitiesDir": "src/entity",
    "migrationsDir": "src/migration",
    "subscribersDir": "src/subscriber"
  }
}
