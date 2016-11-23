var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');
//connect to database
var con = mysql.createConnection({
  host  : 'localhost',
  user  : 'root',
  password: 'Password',
  database: 'petConnectDB'
});
con.connect(function(err){
  if(err){
    console.log('Error Connecting To The DataBase!');
    return;
  }
  console.log('Connection Established To The DataBase');
});

con.end(function(err){});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 80);

//just shows any incoming gets
app.get('/get',function(req,res){
  var qParams = [];
  for (var p in req.query){
    qParams.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.data = qParams;
  res.render('getList', context);
});

//just shows any incoming posts
app.post('/post', function(req,res){
  var qParams = [];
  for (var p in req.body){
    qParams.push({'name':p,'value':req.body[p]})
  }
  console.log(qParams);
  console.log(req.body);
  var context = {};
  context.data = qParams;
  res.render('postList', context);
});

//basic home page
app.get('/', function(req,res){
  res.render('home');
});

//basic user form page
app.get('/createNewUser', function(req,res){
  res.render('createNewUser');
});

//basic 404 page
app.use(function(req,res){
  res.status(404);
  res.render('404');
});
//basic 500 page
app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});


app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});
