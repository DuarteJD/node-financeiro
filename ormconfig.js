module.exports = {
   "type": "postgres",
   "url" : process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      "dist/entity/**/*.ts"
   ],
   "migrations": [
      "dist/migration/**/*.ts"
   ],
   "subscribers": [
      "dist/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
