const request = require('superagent');

class Agent{
    constructor(credentials){
        this.credentials = credentials;
    }

    fetchAndProcessAllPullRequests(owner, repo, searchType, AllPullRequestsAreAvailable){
        const targetUrl =  `https://api.github.com/repos/${owner}/${repo}/${searchType}?state=all`
        let pullRequests = [];
        function fetchAndProcessPage(pageUrl, credentials){
            console.log(`Fetching ${pageUrl}`);
            request
                .get(pageUrl)
                .auth(credentials.username, credentials.token)
                .end((err, res) => {
                    pullRequests = pullRequests.concat(res.body);
                    if(res.links.next){
                        fetchAndProcessPage(res.links.next,credentials);
                    } else {
                        AllPullRequestsAreAvailable(null,pullRequests);
                    }
                });
        }
        fetchAndProcessPage(targetUrl,this.credentials);
    }
}

module.exports = Agent;