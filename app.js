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

//con.end(function(err){});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 80);
app.use(express.static('public'));








//home page
app.get('/', function(req,res){
  res.render('home');
});

//user signup form page
app.get('/signup', function(req,res){
  res.render('signup');
});

//user login page
app.get('/login', function(req,res){
  res.render('login');
});

//submit animal form page
app.get('/submitanimal', function(req,res){
  res.render('submitanimal');
});

//browse animals page
app.get('/browseanimals', function(req,res){
  res.render('browseanimals');
});

//view animal page
app.get('/viewanimal', function(req,res){
  res.render('viewanimal');
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
