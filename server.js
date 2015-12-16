var express = require('express');
var app = express();
var fs = require('fs');
require('dotenv').config({path: './config/config.env'});
var request = require('request');
var bodyParser = require('body-parser');
var Mustache = require('mustache');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', function(req, res){
	var html = fs.readFileSync("./views/index.html", "utf8");
	request.get('https://slack.com/api/search.messages?query=:woohoo:&token=' + process.env['API_KEY'], function(err, resp, body){
			if (!err){
				var results = JSON.parse(body);
			  Mustache.parse(html);
			  var stachBlock = [];
			  results.messages.matches.forEach(function(e){
			  	stachBlock.push({username: e.username, text: e.text, link: e.permalink});
			  });
			  var rendered = Mustache.render(html, {message: stachBlock});
  			res.send(rendered);
			} else {
				console.log("API call failed with the following error: " + err);
			}
		});
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
  var port = server.address().port;
  console.log('Listening at http://localhost:%s', port);
});
