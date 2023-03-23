const { Pool } = require('pg');
// import dbConfig from "./config/config";

const dbConfig = require('../config/config');

// console.log(dbConfig.dbUser );
// console.log(dbConfig.dbHost );
// console.log(dbConfig.dbName );
// console.log(dbConfig.dbPassword );
// console.log(dbConfig.dbPort );
// console.log(dbConfig.idleTimeoutMill );
// console.log(dbConfig.connectionTimeoutMillis );

const pool = new Pool({
  user: dbConfig.dbUser,
  host: dbConfig.dbHost,
  database: dbConfig.dbName,
  password: dbConfig.dbPassword,
  port: dbConfig.dbPort,
  idleTimeoutMillis: dbConfig.idleTimeoutMill,
  connectionTimeoutMillis: 0
});


// const pool = new Pool({
//   user: 'postgres',
//   host: 'localhost',
//   database: 'db5',
//   password: 'postgres',
//   port: 5706,
//   idleTimeoutMillis: 2000,
//   connectionTimeoutMillis: 0,
// });

  // pool.query('SELECT * FROM users ORDER BY user_id ASC', (error, results) => {
  //   if (error) {
  //     throw error
  //   }
  //   console.log(results.rows);

  // })



 module.exports = pool;

