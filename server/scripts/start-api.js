const http = require('http');
const app = require('../server/index');

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



