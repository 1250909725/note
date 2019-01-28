var express = require('express');
var router = express.Router();
var pool = require('../database.js');
var poster = require('http-poster');

/* GET home page. */
router.get('/', function(req, res, next) {

	pool.getConnection(function(err, connection){
		var sql = 'select lname,licon,href from left_list';
		
		connection.query(sql, function(err, results){
			if(err)	{
				throw err;
			}else{
				res.render('index', {'list':results});
			}
		});

		connection.release();
	});



});


router.post('/weather', function (req, res, next) {

	var url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=579c8b69443b29abe6e2168274e8be8a&city='+req.query.city;

	poster.get(url, function (err, resp, data) {
		// console.log(resp);
       	// console.log(data);
       	// data = data.toString();
		res.send(data);
		return;
	});

});


router.post('/users', function (req, res, next) {

	pool.getConnection(function(err, connection){
		var sql = 'select uid,uname,tel,ustatus from users where ustatus=?';
		var params = [0];
		connection.query(sql, params, function(err, results){
			if(err)	{
				throw err;
			}else{
				res.send(results);
			}
		});

		connection.release();
	});

});


router.post('/users/del', function (req, res, next) {

	var uid = req.query.uid;
	// console.log(uid);

	pool.getConnection(function(err, connection){
		var sql = 'update users set ustatus=1 where uid=?';
		var params = [uid];
		connection.query(sql, params, function(err, results){
			if(err)	{
				throw err;
			}else{
				res.send(results);
			}
		});

		connection.release();
	});

});




module.exports = router;
