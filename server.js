const http = require('http');
const app = require('./app');
const port = process.env.port || 3100;

const server = http.createServer(app);
// console.log("\n \n ", server)

server.listen(port, () => {
    console.log("Server restarted successfully")
});