require('dotenv').config();

const config = {
  DEV: process.env.NODE_ENV !== 'production',
  PORT: process.env.PORT || 3000,
  CORS: process.env.CORS,
  DB_URI: process.env.DB_URI
};

module.exports = config;
