const express = require('express');

class Server {
  /**
   * The constructor.
   * @param {*} port The port to listen to if no default one is specified in ENV.
   * @param {*} agent The agent to interrogate.
   */
  constructor(port, agent) {
    this.app = express();

    this.port = port;
    this.agent = agent;
  }

  /**
   * Setup the server.
   */
  setup() {
    this.app.get('/api/all-issues/:owner/:repo', (req, res) => {
      const { owner, repo } = req.params;

      // agent.getAllIssues(owner, repo);

      res.send(`Analyse du repo ${repo} appartenant à ${owner} pour récupérer toutes les issues`);
    });

    this.app.get('/api/opened-issues/:owner/:repo', (req, res) => {
      const { owner, repo } = req.params;

      // agent.getOpenedIssues(owner, repo);

      res.send(`Analyse du repo ${repo} appartenant à ${owner} pour récupérer toutes les issues ouvertes`);
    });

    this.app.get('/api/closed-issues/:owner/:repo', (req, res) => {
      const { owner, repo } = req.params;

      // agent.getClosedIssues(owner, repo);

      res.send(`Analyse du repo ${repo} appartenant à ${owner} pour récupérer toutes les issues fermés`);
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
