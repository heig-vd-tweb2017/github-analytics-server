require('./chai-config.js');

const request = require('superagent');
const { username, token } = require('../src/github-credentials.json');


describe('the GitHub API', () => {
  it('allows me to get a list of pull requests', (done) => {
    const owner = 'spring-projects';
    const repo = 'spring-kafka';
    const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
    request.get(url).auth(username, token).set('Accept', 'application/vnd.github.v3+json').end((err, res) => {
      err.should.be.undefined();
      res.should.not.be.undefined();
      done();
    });
  });
});
