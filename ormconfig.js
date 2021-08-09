module.exports = {
   "type": "postgres",
   "url" : process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      process.env.DEV_MODE = 0 ? "dist/entity/**/*.ts" : "src/entity/**/*.ts"
   ],
   "migrations": [
      process.env.DEV_MODE = 0 ? "dist/migration/**/*.ts" : "src/migration/**/*.ts"
   ],
   "subscribers": [
      process.env.DEV_MODE = 0 ? "dist/subscriber/**/*.ts" : "src/subscriber/**/*.ts"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}

console.log(process.env.DEV_MODE);
console.log(process.env.DEV_MODE = 0 ? "dist/entity/**/*.ts" : "src/entity/**/*.ts");
