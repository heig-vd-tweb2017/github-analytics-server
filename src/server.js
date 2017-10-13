const express = require('express');
const cors = require('cors');

class Server {
  /**
   * The constructor.
   * @param {integer} port The port to listen to if no default one is specified in ENV.
   * @param {Agent} agent The agent to interrogate.
   */
  constructor(port, agent) {
    this.app = express();
    this.app.use(cors());

    this.port = port;
    this.agent = agent;

    this.app.get('/api/opened-issues/:owner/:repo', (req, res) => {
      const { owner, repo } = req.params;

      res.setHeader('Content-Type', 'application/json');

      function sendData(err, issues) {
        const usersArray = Array.from(issues.users);
        const datesArray = Array.from(issues.dates);

        res.write(JSON.stringify({ usersArray, datesArray }));
      }

      function endOfData() {
        res.end();
      }

      this.agent.getOpenedIssues(owner, repo, sendData, endOfData);
    });

    this.app.get('/api/closed-issues/:owner/:repo', (req, res) => {
      const { owner, repo } = req.params;

      res.setHeader('Content-Type', 'application/json');

      function sendData(err, issues) {
        const usersArray = Array.from(issues.users);
        const datesArray = Array.from(issues.dates);

        res.write(JSON.stringify({ usersArray, datesArray }));
      }

      function endOfData() {
        res.end();
      }

      this.agent.getClosedIssues(owner, repo, sendData, endOfData);
    });
  }

  /**
   * Start the server.
   */
  start() {
    this.app.listen(this.port, () => {
      console.log(`Our app is running on http://localhost:${this.port}`);
    });
  }
}

module.exports = Server;
