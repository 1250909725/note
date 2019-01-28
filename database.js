var mysql = require('mysql');


/*
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'root',
	database : 'aaaaa'
});


module.exports = connection;
 */



var pool = mysql.createPool({
	host     : '127.0.0.1',
	user     : 'root',
	password : 'root',
	database : 'note'
});


module.exports = pool;
 
