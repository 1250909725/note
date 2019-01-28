var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var http = require('http');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var index = require('./routes/index.js');



var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.engine('html', require('ejs').renderFile);
app.set('view engine','html');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', usersRouter);


app.use('/index', index);

app.use('/cusser', require('./routes/cusser.js'));




app.use('/', function(req, res){
	var path = req.path;
	// console.log(path);
	if (path === '' || path === '/' || path === 'index') {
        res.redirect('index');
	} else {
		// res.send('页面不存在');
		res.status(404).send('没有这个页面！');
	}
});


// catch 404 and forward to error handler
/*app.use('/', function(req, res, next) {
  res.render('index', {'name':'不存在'});
  // next(createError(404));
});*/

// error handler
/*app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
*/
module.exports = app;
app.listen(3000);
