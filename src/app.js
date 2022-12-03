const bodyParser = require('body-parser');
require('dotenv').config({ path: '.env' });
const express = require('express');
const cors = require('cors');
const http = require('http');
const { dbMongo,  keys } = require('./common');
// const routeParser = require('./parse-routes');
const { apiErrorHandler } = require('./utils');
const createError = require('http-errors');

const addCRMRoutes = require('./routes');
// const seedservice = require('./services/seed.service');

const app = express();
dbMongo();

app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));




app.use(cors());
addCRMRoutes(app);
// seedservice();

app.use((req, res, next) => {
  next(createError(404));
});

app.use(apiErrorHandler);

app.set('port', keys.port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

const onError = (error) => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string'
    ? `Pipe ${keys.port}`
    : `Port ${keys.port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const onListening = () => {
  const addr = server.address();
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`;
  console.info(`Listenign on `, bind);
};

server.listen(keys.port);
server.on('error', onError);
server.on('listening', onListening);

module.exports = server;