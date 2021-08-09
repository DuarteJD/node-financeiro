console.log(process.env.DATABASE_URL);
console.log(process.env.DEV_MODE);
console.log(process.env.DEV_MODE === 1 ? 'src/entity/**/*.ts' : 'dist/entity/**/*.js');
console.log("=-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-==-=");

module.exports = {
   "type": "postgres",
   "url" : process.env.DATABASE_URL,
   "synchronize": false,
   "logging": false,
   "entities": [
      "dist/entity/**/*.js"
   ],
   "migrations": [
      "dist/migration/**/*.js"
   ],
   "subscribers": [
      "dist/subscriber/**/*.js"
   ],
   "cli": {
      "entitiesDir": "src/entity",
      "migrationsDir": "src/migration",
      "subscribersDir": "src/subscriber"
   }
}
