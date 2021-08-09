console.log("Database => " + process.env.DATABASE_URL);
module.exports = {
   "type": "postgres",
   "url" : process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      process.env.DEV_MODE = 1 ? "src/entity/**/*.ts" : "dist/entity/**/*.ts"
   ],
   "migrations": [
      process.env.DEV_MODE = 1 ? "src/migration/**/*.ts" : "dist/migration/**/*.ts"
   ],
   "subscribers": [
      process.env.DEV_MODE = 1 ? "src/subscriber/**/*.ts" : "dist/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
