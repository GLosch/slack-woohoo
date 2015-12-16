var express = require('express');
var app = express();
var fs = require('fs');
var request = require('request');
var bodyParser = require('body-parser');
var Mustache = require('mustache');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use('jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/', function(req, res){
	var html = fs.readFileSync("./views/index.html", "utf8");
	request.get('https://slack.com/api/search.messages?query=:woohoo:&token=xoxp-16757291844-16762281921-16762613457-2327525d4e', function(err, resp, body){
			if (!err){
				var results = JSON.parse(body);
				console.log(results);
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
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
