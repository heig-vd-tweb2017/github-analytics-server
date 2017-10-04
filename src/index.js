const credentials = require('../src/github-credentials.json');

const Agent = require('./agent.js');
const Server = require('./server.js');

const port = process.env.PORT || 8080;

const agent = new Agent(credentials);
const server = new Server(port, agent);

server.setup();
server.start();
