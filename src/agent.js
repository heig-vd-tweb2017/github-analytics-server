const request = require('superagent');

class Agent {
  /**
   * The constructor.
   * @param {JSON object with username and token} credentials The credentials to use
   * to query GitHub.
   */
  constructor(credentials) {
    this.credentials = credentials;
  }

  /**
   * Process the GitHub's API pages.
   * @param {string} targetUrl The GitHub's API URL.
   * @param {function} dataAreAvailable The function to call when data are available.
   * @param {function} endOfData The function to call when there are no more data.
   */
  processPage(targetUrl, dataAreAvailable, endOfData) {
    const dates = new Map();
    const users = new Map();

    /**
     * Function called until all the data are fetched.
     * @param {string} pageUrl The GitHub's API URL.
     * @param {JSON object with username and token} credentials  The credentials to use
     * to query GitHub.
     */
    function fetchAndProcessPage(pageUrl, credentials) {
      request
        .get(pageUrl)
        .auth(credentials.username, credentials.token)
        .end((err, res) => {
          res.body.forEach((record) => {
            const user = record.user.login;

            if (!users.has(user)) {
              users.set(user, 1);
            } else {
              users.set(user, users.get(user) + 1);
            }

            const date = new Date(record.created_at);
            date.setHours(0, 0, 0, 0);
            const time = date.getTime();

            if (!dates.has(time)) {
              dates.set(time, 1);
            } else {
              dates.set(time, dates.get(time) + 1);
            }
          });

          dataAreAvailable(null, { users, dates });

          if (res.links.next) {
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            endOfData();
          }
        });
    }

    fetchAndProcessPage(targetUrl, this.credentials);
  }

  /**
   * Get all the opened issues.
   * @param {string} owner The GitHub's owner of the repository
   * @param {string} repo The repository.
   * @param {function} dataAreAvailable The function to call when data are available.
   * @param {function} endOfData The function to call when there are no more data.
   */
  getOpenedIssues(owner, repo, dataAreAvailable, endOfData) {
    const targetUrl = `https://api.github.com/repos/${owner}/${repo}/issues?state=open`;

    this.processPage(targetUrl, dataAreAvailable, endOfData);
  }

  /**
   * Get all the closed issues.
   * @param {string} owner The GitHub's owner of the repository
   * @param {string} repo The repository.
   * @param {function} dataAreAvailable The function to call when data are available.
   * @param {function} endOfData The function to call when there are no more data.
   */
  getClosedIssues(owner, repo, dataAreAvailable, endOfData) {
    const targetUrl = `https://api.github.com/repos/${owner}/${repo}/issues?state=closed`;

    this.processPage(targetUrl, dataAreAvailable, endOfData);
  }
}

module.exports = Agent;
