var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  str = 'index' + " " + " original:" + req.originalUrl + " base:" + req.baseUrl + " path:" + req.path;
  res.send(str);
});

router.get('/user', function(req, res, next) {
  res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'});
  console.log('年龄:'+ req.query.age);
  res.write('名字:'+ req.query.name);
  res.write('<br>');
  res.end('index返回内容');
});

router.get('/template', function(req, res, next) {
  
  res.render('index', {'name':'yyy'});
});

module.exports = router;
