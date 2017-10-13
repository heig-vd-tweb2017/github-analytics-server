// const credentials = require('../src/github-credentials.json');

const Agent = require('./agent.js');
const Server = require('./server.js');

const port = process.env.PORT || 8080;

const username = process.env.USERNAME; // || credentials.username;
const token = process.env.TOKEN; // || credentials.token;

const agent = new Agent({ username, token });
const server = new Server(port, agent);

server.start();
