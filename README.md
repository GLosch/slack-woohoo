This app was created for a code challenge. It pings the Slack web API to find instances of members writing ":woohoo:" in public chats. 

To run this locally:

- Clone this repo to your local machine
- run `npm install` to install dependencies
- get your Slack API token [here](https://api.slack.com/web)
- create a file called `config.env` within the `config` directory and add `API_KEY = ` + [your Slack API token] 
- run `nodemon server.js` to have the server watch for changes to files
(or)
- run `npm start` to simply start the server normally
- go to http://localhost:3000