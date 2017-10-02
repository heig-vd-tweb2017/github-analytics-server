const should = require('./chai-config.js');
const credentials = require('../src/github-credentials.json');

const Agent = require('../src/agent.js');

describe('agent', () => {
  it('should fetch pull requests', (done) => {
    const owner = 'spring-projects';
    const repo = 'spring-kafka';
    const searchType = 'pull';
    const agent = new Agent(credentials);
    agent.fetchAndProcessAllPullRequests(owner, repo, searchType, (err, pullRequests) => {
      should.not.exist(err);
      pullRequests.should.be.an('array');
      done();
    });
  });
});
