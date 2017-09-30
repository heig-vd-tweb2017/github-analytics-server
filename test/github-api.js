const chai = require('chai');
const request = require('superagent');
const { username, token } = require('../github-credentials.json');

const should = chai.should();

describe('the GitHub API', () => {
    it('allows me to get a list of pull requests', (done) => {
        const owner = 'MichelaZucca';
        const repo = 'heig-vd_17_18';
        const url = `https://api.github.com/repos/${owner}/${repo}/pulls`;
        request.get(url).auth(username, token).set('Accept','application/vnd.github.v3+json').end((err, res) => {
                should.not.exist(err);
                should.exist(res);
                done();
        });
    });
});
