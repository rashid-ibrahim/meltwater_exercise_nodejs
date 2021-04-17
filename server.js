
const http = require('http');
const app = require('./app');
const port = 8080;
const server = http.createServer(app);

server.listen(port, () => {
    //Normally I would write to a log file when the server is started, just to track when restarts happen.
    //For brevity, I am just console logging.
    console.log('Server started at:' + Date())
});