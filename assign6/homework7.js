
var express 	= require('express');
var bodyParser  = require('body-parser');
var mongoclient = require('mongodb').MongoClient;
var test	= require('assert');
var app 	= express();
var url 	= "mongodb://localhost:27017/test";
var col;

app.use(bodyParser.json());
app.listen(8080, function () {
	console.log('App running on port 8080!');
});

mongoclient.connect(url, function(err, db) {
	if (!err){ console.log("Connected to mongo db!");
	
	db.createCollection('c1');
	col = db.collection('c1');

	}
});

app.get('/links', function(req, res) {
	
	col.find().toArray(function(err, items) {res.send(items)});
});

app.get('/click/:url', function(req, res) {
	
	var name = req.params.url;
	console.log(name);
	col.findOne({"title":name}, function(err, item) {
		if (!err) {
			col.update({"title":name}, {$inc: {"clicks":1}});		
			console.log(item.link);
			res.redirect(item.link);	
		}
	});
});

app.post('/links', function(req, res) {
	var link = req.body.link;
	var title = req.body.title;
	doc = {'link':link, 'title':title, 'clicks':0};
	col.insert(doc);
	res.end();
});

