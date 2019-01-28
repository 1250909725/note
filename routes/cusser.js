var express = require('express');
var router = express.Router();

var tool = require('../tool.js');
var poster = require('http-poster');

// var conn = require('../database.js');
var pool = require('../database.js');



// conn.connect();

router.get('/list', function (req, res, next) {


// 数据库链接-------------------------------
/*	var sql = 'select * from user';
	// var params = ['wangwu'];
	conn.query(sql, function (error, results) {
		if (error) throw error;
		// console.log('The solution is: ', results);

		res.render('list', {'list':results});

		// conn.end(function(err){
		// 	console.log('链接使用中');

		// });
		// conn.destroy();

	});
*/

// 数据库链接池-------------------------------

	pool.getConnection(function(err, connection){
		var sql = 'select * from user';
		connection.query(sql,  function(err, results){
			if(err)	{
				throw err;
			}else{
				for (var i = results.length - 1; i >= 0; i--) {
					results[i].registertime = tool(results[i].registertime);
				}
				res.render('list', {'list':results});
			}
		});

		connection.release();
	});






	/*res.render('list', {'list':[
			{'num':'10001','name':'张三','age':'18'},
			{'num':'10002','name':'李四','age':'18'},
			{'num':'10003','name':'王五','age':'18'}
		]});*/
});




router.post('/test', function (req, res, next) {

	var url = '';

	// 和风
	// url = 'https://free-api.heweather.net/s6/weather/hourly?location=luoyang&key=5fd0e93d90fd40f0a0f05142a80dc6dd';
	// 中国天气
	// url = 'http://m.weather.com.cn/data/101180901.html';
	// url = 'http://www.weather.com.cn/data/cityinfo/101180901.html';
	// url = 'http://www.weather.com.cn/data/cityinfo/101180901.html';
	// sojson
	// url = 'http://t.weather.sojson.com/api/weather/city/101180901';
	// 知心
	// url = 'https://api.seniverse.com/v3/weather/now.json?key=jijislksmkgwyomq&location=luoyang&language=zh-Hans&unit=c';
	// 小米
	// url = 'http://weatherapi.market.xiaomi.com/wtr-v2/weather?cityId=101180901';
	// url = 'http://wthrcdn.etouch.cn/weather_mini?city=洛阳';
	// 高德
	url = 'https://restapi.amap.com/v3/weather/weatherInfo?key=579c8b69443b29abe6e2168274e8be8a&city=410300';


	poster.get(url, function (err, resp, data) {
		// console.log(resp);
       	// console.log(data);
       	// data = data.toString();
		res.send(data);
		return;
	});

});



module.exports = router;