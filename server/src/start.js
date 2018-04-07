const http = require('http');
const app = require('./index.js');

const DEV = process.env.NODE_ENV === 'development';
const PROD = process.env.NODE_ENV === 'production';

const port = process.env.PORT || 8080;

const server = http.createServer(app)

server.listen(port, () => {
  if (process.env.NODE_ENV === 'development') {
    console.log(`
      Stacks API is up and running!
      Port: ${port}...
    `);
  }
});


process.on('SIGINT', function onSigint () {
  console.info('Got SIGINT (aka ctrl-c in docker). Graceful shutdown ', new Date().toISOString());
  shutdown();
});

// quit properly on docker stop
process.on('SIGTERM', function onSigterm () {
  console.info('Got SIGTERM (docker container stop). Graceful shutdown ', new Date().toISOString());
  shutdown();
})

// shut down server
function shutdown() {
  server.close(function onServerClosed (err) {
    if (err) {
      console.error(err);
      process.exitCode = 1;
    }
    process.exit();
  })
}