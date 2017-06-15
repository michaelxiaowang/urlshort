var express = require('express');
var app = express();
var path = require('path');
var util = require('util');
var server = app.listen('3000', function() {
	console.log("Server listening");
});
var io = require('socket.io')(server);
var db = require('./db');

//can set this as the domain name
process.env.HOSTNAME = 'urlshort.com'

app.use(express.static(path.join(__dirname, 'public')));

/*search the database for a short_url with :value
if it exists then redirect the user to the long_url
else send them to a default page for unfound short_urls*/
app.get('/:value', function(req,res) {
	var value = req.params.value;
	var sql = util.format('SELECT long_url FROM urls WHERE short_url = %s', value);
	db.query(sql, function(err, result) {
		if(err) throw err;
		if(result === undefined || result.length == 0) {
			res.sendFile(path.join(__dirname,"public/notfound.html"));
		} else {
			var page = result[0].long_url;
			res.redirect('http://' + page);
		}
	});
});

io.sockets.on('connect', function(socket) {
	socket.on('long url', function(data) {
		db.query('SELECT MAX(id) FROM urls', function(err, result) {
			if (err) throw err;
			
			/*Table ids are autoincremented so currID is 1 more than the last.
			Convert the id to base 36 ([0-9a-z]) to get the new url and then
			store the values into the database*/
			maxID = result[0]['MAX(id)'];
			if(maxID == null) {
				currID = 1;
			} else {
				currID = maxID + 1;
			}
			newUrl = toBase36(currID);

			//Insert a new row into the db with this data
			var sql = util.format('INSERT INTO urls (long_url, short_url) \
				VALUES ("%s", "%s")', data.oldUrl, newUrl);
			db.query(sql, function(err, result) {
				if(err) throw err;
				console.log('1 record inserted');
			});

			socket.emit('new url', {newUrl: process.env.HOSTNAME + '/' + newUrl});
		});
	});
});

var toBase36 = function(id) {
	var digits = '0123456789abcdefghijklmnopqrstuvwxyz';
	var result = '';
	while(id > 36) {
		result = digits.charAt(id % 36) + result;
		id /= 36;
	}
	result = digits.charAt(id) + result;
	return result;
};