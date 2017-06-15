var mysql = require('mysql');

var con = mysql.createConnection({
	host: 'localhost',
	user: 'user',
	password: 'password',
	database: 'urlshort'
});

con.connect(function(err) {
	if(err) throw err;
	console.log("DB Connected");
});

module.exports = con;