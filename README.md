# Project -Github Analytics
This project is conducted for the course "TWEB-2017, at HEIG-VD.

## What is this
This project proposes a repo github analyses, especially on issues management.
	
* Time analysis of open and closed issues.
* Enhancement of the three most active users on closing issues.
* Enhancement of the three most active users on opening isusses.
	
The trhee aspects are represented throught graphs and tables.
	
The information about the users is deliberately hidden in parts to avoid any competition. The only objective is mutal help and encouragement.
	
## Why is this
We wanted to create this tool to encourage people to improve their product by the following points:

We think that issues are a good measure to the activity and the progress of a project.

* People who open issues want to see new features in the product they use. 
* People who close issues and add new features to the product.

We think that issues should be opened. This proves the activity and contininous integration of the product as people want to see new features and people implement them.

## How is this
For this project, we used several librairies and technologies.
 
Client side:
* <a href="https://startbootstrap.com/template-overviews/sb-admin-2/">SB Admin 2</a> for the Bootstrap template.
* <a href="http://www.chartjs.org/">Chart.js</a> to display the infomations with graphics.
* <a href="http://oboejs.com/">Oboe.js</a> to retreive data from the server and display them as soon as new data are available.

Server side:
* <a href="https://nodejs.org/">Node.js</a> for the server runtime engine.</li>
* <a href="http://expressjs.com/">Express</a> for the WEB server.</li>
* <a href="https://developer.github.com/v3/">GitHub API</a> to get the data from GitHub.</li>
* <a href="https://github.com/visionmedia/superagent">SuperAgent</a> to query GitHub's API easily.</li>
* <a href="https://mochajs.org/">Mocha</a> for the unit tests.</li>
* <a href="http://chaijs.com/">Chai</a> as an assertion library used with Mocha</li>


On both side:
* <a href="https://eslint.org/">ESLint</a> for quality code control.

You can find all the sources for this project <a href="https://github.com/heig-vd-tweb2017">here</a> as everything is open source !

# Server
The server is in charge of retrieving the information from the github repo to be analyzed. The server side is broken down are two big parts, the agent and the server.

* The role of the agent: retrieve data about the repo via the github API. Processing of received data. The data is processed and transmitted as and when.

* The role of the server: intermediary between the agent and the client. It receives the client's request and uses the agent to retrieve the data to be sent back to the client.

## Deployment

### Before
It is necessary to create the file ```src/github-credentials.json``` containing the username and token.
This file is not default included in the .gitignore for security reasons.
For more information on github authentication, <a href="https://developer.github.com/v3/auth/">click here</a>!
```
{
     "username": "name"
     "token": "generated tocken on github"
} 
```
