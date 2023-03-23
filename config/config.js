require('dotenv').config();

class DatabaseConfig {
  constructor(dbUser, dbHost, dbName, dbPassword, dbPort, idleTimeoutMill, connectionTimeoutMillis) {
    this.dbUser = dbUser;
    this.dbHost = dbHost;
    this.dbName = dbName;
    this.dbPassword = dbPassword;
    this.dbPort = dbPort;
    this.idleTimeoutMill = idleTimeoutMill;
    this.connectionTimeoutMillis = connectionTimeoutMillis;
  }
}

const dbConfig = new DatabaseConfig(
  process.env.DB_USER,
  process.env.DB_HOST,
  process.env.DB_NAME,
  process.env.DB_PASSWORD,
  process.env.DB_PORT,
  process.env.IDLE_TIMEOUT_MILL,
  process.env.CONNECTION_TIMEOUT_MILL,
);

module.exports = dbConfig;
