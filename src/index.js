const http = require('http');

const app = require('./app');
const config = require('./config/config');
const { socketInit } = require('./config/socket');

//Init Mongo
require('./config/db');

const PORT = config.PORT;

const server = http.createServer(app);

socketInit(server);

setImmediate(() => {
  server.listen(PORT, () => {
    console.log(`\🚀 Server is listening on ${PORT}`);
  });
});
