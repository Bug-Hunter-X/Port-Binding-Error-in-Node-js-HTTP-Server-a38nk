const http = require('http');

const requestListener = function (req, res) {
  res.writeHead(200);
  res.end('Hello, World!');
};

const server = http.createServer(requestListener);

let port = 8080;
let retries = 0;
const maxRetries = 5;
const retryDelay = 1000; // 1 second

function startServer() {
  server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });

  server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
      if (retries < maxRetries) {
        console.error(`Port ${port} is already in use. Retrying in ${retryDelay / 1000} seconds...`);
        retries++;
        setTimeout(startServer, retryDelay * retries);
      } else {
        console.error(`Failed to start server after multiple retries.  Port ${port} is unavailable`);
        process.exit(1);
      }
    } else {
      console.error(`Server error: ${err}`);
      process.exit(1);
    }
  });
}

startServer();