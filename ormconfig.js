console.log(process.env.DATABASE_URL);
console.log(process.env.DEV_MODE);
console.log(process.env.DEV_MODE === 1 ? 'src/entity/**/*.ts' : 'dist/entity/**/*.js');
console.log("=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=");

module.exports = {
   "name" : "default",
   "type": "postgres",
   "url" : process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      process.env.DEV_MODE === 1 ? 'src/entity/**/*.ts' : 'dist/entity/**/*.js'
   ],
   "migrations": [
    process.env.DEV_MODE === 1 ? 'src/migration/**/*.ts' : 'dist/migration/**/*.js'
   ],
   "subscribers": [
    process.env.DEV_MODE === 1 ? 'src/subscriber/**/*.ts' : 'dist/subscriber/**/*.js'
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
