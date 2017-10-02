const request = require('superagent');

class Agent {
  /**
   * The constructor.
   * @param {*} credentials The credentials to use to query GitHub.
   */
  constructor(credentials) {
    this.credentials = credentials;
  }

  /**
   * Request to query to fetch the data.
   * @param {*} owner The owner of the repo (organization or person).
   * @param {*} repo The repository to analyze.
   * @param {*} searchType The searching type/term.
   * @param {*} allPullRequestsAreAvailable The function to call to fetch the data.
   */
  fetchAndProcessAllPullRequests(owner, repo, searchType, allPullRequestsAreAvailable) {
    // The URL
    const targetUrl = `https://api.github.com/repos/${owner}/${repo}/${searchType}?state=all`;

    // The results
    let pullRequests = [];

    // Function called until all the data are fetched
    function fetchAndProcessPage(pageUrl, credentials) {
      request
        .get(pageUrl)
        .auth(credentials.username, credentials.token)
        .end((err, res) => {
          pullRequests = pullRequests.concat(res.body);
          if (res.links.next) {
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            allPullRequestsAreAvailable(null, pullRequests);
          }
        });
    }

    fetchAndProcessPage(targetUrl, this.credentials);
  }
}

module.exports = Agent;
