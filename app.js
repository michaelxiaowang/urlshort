var app = require('express')();
var path = require('path');
var server = require('http').Server(app);
var io = require('socket.io')(server);

app.listen('3000', function() {
	console.log("Connected");
});

app.get('/', function(req, res) {
	res.sendFile(path.join(__dirname, 'public/index.html'));
})

app.post('/', function(req,res) {
	io.sockets.emit('newurl', {data: "new url"});
});