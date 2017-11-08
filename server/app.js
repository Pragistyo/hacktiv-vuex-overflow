var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');

// mongoose.connect(`mongodb://localhost/hactiv-overflow`,(err)=>{
mongoose.connect(`mongodb://ogi-overflow:ogitampan@cluster0-shard-00-00-nsxhr.mongodb.net:27017,cluster0-shard-00-01-nsxhr.mongodb.net:27017,cluster0-shard-00-02-nsxhr.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`, (err) => {
  if(!err){
    console.log('MONGOOSE connected');
  }else{
    console.log('NOT CONNECT mongooese '+ err);
  }
})

var index    = require('./routes/index');
var users    = require('./routes/users');
var question = require('./routes/question')
var answer   = require('./routes/answer')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(cors())
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);
app.use('/question', question);
app.use('/answer',answer);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404;
  next(err)
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
})

app.listen(process.env.PORT || 3000, ()=>{
  console.log('3000 ATK OF BLUE EYES WHITE DRAGON')
})

module.exports = app
