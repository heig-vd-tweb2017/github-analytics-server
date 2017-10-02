const request = require('superagent');

class Agent {
  constructor(credentials) {
    this.credentials = credentials;
  }

  /*
   * Requête a appeler pour lancer la construction du tableau des données
   * owner : nom de l'entreprise / utilisateur
   * repo : dossier git
   * searchType : type de la requetes, exemple les pullsrequest, les issues...
   */
  fetchAndProcessAllPullRequests(owner, repo, searchType, AllPullRequestsAreAvailable) {
    // construction de l'url
    const targetUrl = `https://api.github.com/repos/${owner}/${repo}/${searchType}?state=all`
    // tableau des résultats
    let pullRequests = [];
    // fonction utilisé en récursivité pour
    // récupérer le contenu de toutes les pages et le concaténer
    function fetchAndProcessPage(pageUrl, credentials) {
      console.log(`Fetching ${pageUrl}`);
      // requête a envoyer
      request
        .get(pageUrl)
        .auth(credentials.username, credentials.token)
        .end((err, res) => {
          pullRequests = pullRequests.concat(res.body);
          if (res.links.next) {
            // lancé l'appel récursif pour la prochaine page
            fetchAndProcessPage(res.links.next, credentials);
          } else {
            // fin de la récursion
            AllPullRequestsAreAvailable(null, pullRequests);
          }
        });
    }

    // première appel à la fonction de récursion
    fetchAndProcessPage(targetUrl, this.credentials);
  }
}

module.exports = Agent;
