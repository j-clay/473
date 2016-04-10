
var express 	= require('express');
var bodyParser 	= require('body-parser');
var redis	= require('redis');
var client 	= redis.createClient();
var app 	= express();

client.on('connect', function() {
	console.log('connected to redis server');
});

app.use(bodyParser.json());

app.get('/stats', function(req, res) {
	var loss = "0";
	var wins = "0";
	client.get('wins', function(err, reply) {
		
		if (reply != null) wins = reply;
	
	client.get('losses', function(err, reply) {
		if (reply != null) loss = reply;
		res.sendStatus(JSON.stringify({"losses":loss, "wins":wins}));
		client.del('wins');
		client.del('losses');
	
		});
	});

});

app.post('/flip', function(req, res) {
	var value = req.body.call;
	var rand_num = Math.floor((Math.random() * 2) + 1);
	var s_value = get_side(rand_num);

	if (value == s_value) {
		client.incr('wins');
		res.end(JSON.stringify({"result": "win"}));
	} else {
		client.incr('losses');
		res.end(JSON.stringify({"result":"loss"}));
	}
});

app.listen(8080, function () {
	console.log('App running on port 8080!');
});

function get_side(val) {
	if (val == 1) return "heads";
	else return "tails";

}
