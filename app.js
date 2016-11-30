var express = require('express');
var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var mysql = require('mysql');

//connect to database template
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

//*************************
//view single animal page
//************************
app.get('/viewanimal', function(req,res){


  res.render('viewanimal');
});

//*****************************
//populates animal browse list
//*****************************
app.post('/populateAnimals',function(req,res,next){ 

  var rBody= req.body;

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

  con.query('SELECT * FROM animalInDistress WHERE animalType=? AND animalState=?', [rBody.animalReq,rBody.stateReq], function(err, rows, fields){
    if(err){
    next(err);
    return;
    }
    var context = {};
    context = JSON.stringify(rows);
    res.send(context);
  });

  con.end(function(err){});  
});



//*****************************
//create new profile (not a temp profile)
//*****************************
app.get('/insert', function(req,res,next){
	
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
	
	
	var newProfileId = null;
	
 	console.log("creating new profile");
	 con.query("INSERT INTO profile (`fname`, `lname`, `city`, `profileState`, `phone`, `email`, `facebookURL`, `username`, `password`, `isTemp`) VALUES (?,?,?,?,?,?,?,?,?,?)", [req.query.fname, req.query.lname, req.query.city, req.query.state, req.query.phone, req.query.email, 
	 req.query.facebook, req.query.uname, req.query.pw, 0], function(err, result){
		if(err){
		  next(err);
		  return;
		}

		//get just-generated userID and store to variable for subsequent db queries
		newProfileId = result.insertId;
		
		//if user selected to host a dog, add to willHost table with user ID variable
		if(req.query.hostDog == "true")
		{
		con.query("INSERT INTO willHost (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Dog"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}	

		//if user selected to host a cat, add to willHost table with user ID variable
		if(req.query.hostCat == "true")
		{
		con.query("INSERT INTO willHost (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Cat"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}
		
		//if user selected to host a bird, add to willHost table with user ID variable
		if(req.query.hostBird == "true")
		{
		con.query("INSERT INTO willHost (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Bird"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}

		//if user selected to host a horse, add to willHost table with user ID variable
		if(req.query.hostHorse == "true")
		{
		con.query("INSERT INTO willHost (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Horse"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}		

		//if user selected to help a dog, add to willhelp table with user ID variable
		if(req.query.helpDog == "true")
		{
		con.query("INSERT INTO willHelp (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Dog"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}	

		//if user selected to help a cat, add to willhelp table with user ID variable
		if(req.query.helpCat == "true")
		{
		con.query("INSERT INTO willHelp (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Cat"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}
		
		//if user selected to help a bird, add to willhelp table with user ID variable
		if(req.query.helpBird == "true")
		{
		con.query("INSERT INTO willHelp (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Bird"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}

		//if user selected to help a horse, add to willhelp table with user ID variable
		if(req.query.helpHorse == "true")
		{
		con.query("INSERT INTO willHelp (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Horse"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}

		//if user selected to Adopt a dog, add to willAdopt table with user ID variable
		if(req.query.adoptDog == "true")
		{
		con.query("INSERT INTO willAdopt (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Dog"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}	

		//if user selected to Adopt a cat, add to willAdopt table with user ID variable
		if(req.query.adoptCat == "true")
		{
		con.query("INSERT INTO willAdopt (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Cat"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}
		
		//if user selected to Adopt a bird, add to willAdopt table with user ID variable
		if(req.query.adoptBird == "true")
		{
		con.query("INSERT INTO willAdopt (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Bird"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}

		//if user selected to Adopt a horse, add to willAdopt table with user ID variable
		if(req.query.adoptHorse == "true")
		{
		con.query("INSERT INTO willAdopt (`userID`, `animalType`) VALUES (?,?)", [newProfileId, "Horse"], function(err, result){
		if(err){
			next(err);
			return;
		}
		}); 
		}			
	
	  con.end(function(err){}); 
		
	});
	res.status(200).json({status:"ok"})

});


//*****************************
//create new animal in distress
//*****************************
app.get('/insertanimal', function(req,res,next){
	
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
	
	
	
 	console.log("creating animal");
	con.query("INSERT INTO animalInDistress (`animalType`, `description`, `address`, `city`, `animalState`, `finderID`, `status`) VALUES (?,?,?,?,?,?,?)", [req.query.animalType, req.query.description, req.query.address, req.query.city, req.query.state, 
	 1, "Found"], function(err, result){
		if(err){
		  next(err);
		  return;
		}
	
	con.end(function(err){}); 
	
	});


});





//*****************************
//login user and product matched animals
//*****************************
app.post('/loginuser',function(req,res,next)
{ 
	var context = {};
	var rBody= req.body;

	var con = mysql.createConnection({
	host  : 'localhost',
	user  : 'root',
	password: 'Password',
	database: 'petConnectDB'
	});
	con.connect(function(err)
	{
		if(err){
			console.log('Error Connecting To The DataBase!');
			return;
		}
	console.log('Connection Established To The DataBase');
	});

	console.log(rBody.uname);
	console.log(rBody.pw);


//get id and password from mySQL that corresponds to the username that was entered
	con.query('SELECT id, password FROM profile WHERE username=?', [rBody.uname], function(err, rows, fields)
	{
   
   		if(err)
		{
			next(err);
			return;
    	}
    	context.uid = rows[0].id;
    	context.uname = rBody.uname;
    	context.pass = rows[0].password;
	//check if pw is valid
	if(rBody.pw == rows[0].password)
	{
		con.query('SELECT animalInDistress.* FROM animalInDistress JOIN (SELECT DISTINCT willHost.animalType AS animalType FROM willHost JOIN willHelp ON willHost.userID=willHelp.userID JOIN willAdopt ON willAdopt.userID=willHelp.userID WHERE willHost.userID=?) T1 ON T1.animalType=animalInDistress.animalType INNER JOIN (SELECT city FROM profile WHERE profile.id=?) T2 ON T2.city=animalInDistress.city', 
		[rows[0].id, rows[0].id], function(err, rows, fields)
		{
			if(err)
			{
				next(err);
				return;
			}
		
			
			context.animal = rows;

			res.send(JSON.stringify(context));
			console.log(context);
		});
	}
		  
	else 
	{
		res.status(401).send({status:401, message: 'unauthorized', type:'internal'}); 
		console.log("incorrect un pw combination");
		return;	
	}
	
	con.end(function(err){}); 
	});	
	
});




//*****************************
//host animal: accepts payload.animalID, payload.uname, and payload.pw
//updates finderID of animal to new host Id. deletes old finder profile if was temp account
//returns context object with contact info of finder/host
//*****************************
app.post('/hostanimal',function(req,res,next)
{ 

	var rBody= req.body;

	var con = mysql.createConnection({
	host  : 'localhost',
	user  : 'root',
	password: 'Password',
	database: 'petConnectDB'
	});
	con.connect(function(err)
	{
		if(err){
			console.log('Error Connecting To The DataBase!');
			return;
		}
	console.log('Connection Established To The DataBase');
	});


	//get existing FinderID of animal
	con.query('SELECT finderID FROM animalInDistress WHERE id=?', [rBody.animalID], function(err, rows, fields)
	{
		if(err)
		{
			next(err);
			return;
		}
		
		var oldFinder = rows[0].finderID;

		
		//get id corresponding to un and pw provided by hoster and verify password
		con.query('SELECT id, password FROM profile WHERE username=?', [rBody.uname], function(err, rows, fields)
		{
			if(err)
			{
				next(err);
				return;
			}
			

			var newFinder = rows[0].id;
			console.log("id");
			console.log(rows[0].id);
			console.log(rows[0].password);
			
			//check if pw is valid
			if(rBody.pw == rows[0].password)
			{	
				//update finderID to new user ID
				con.query('UPDATE animalInDistress SET finderID=? WHERE id=?', [rows[0].id, rBody.animalID], function(err, rows, fields)
				{
					if(err)
					{
						next(err);
						return;
					}
					
					
					else
					{
						//get old finder contact info and send in context to client, delete old finder if temp
						con.query('SELECT * FROM profile WHERE id=?', [oldFinder], function(err, rows, fields)
						{
							console.log("host updated");
							
							if(err)
							{
								next(err);
								return;
							}
							
							else
							{
								console.log("Contact info returned");
								
								//check if temp profile
								if(rows[0].isTemp == 1)
								{
									//delete temp profile
									con.query('DELETE FROM profile WHERE id=?', [oldFinder], function(err, rows, fields)
									{
										if(err)
										{
											next(err);
											return;
										}
										console.log("temp account deleted");
									});
								}
								
								//send contact info back to client
								var context = {};
								context = rows;
								res.send(JSON.stringify(context));
							}	
							
						});
					}	
					
				});
			}
				  
			else 
			{
				res.status(401).send({status:401, message: 'unauthorized', type:'internal'}); 
				console.log("incorrect un pw combination");
				return;	
			}
			
		});

	});	
});





//*****************************
//help animal: accepts payload.animalID
//returns context object with contact info of finder/host
//*****************************
app.post('/helpanimal',function(req,res,next)
{ 

	var rBody = req.body;

	var con = mysql.createConnection({
	host  : 'localhost',
	user  : 'root',
	password: 'Password',
	database: 'petConnectDB'
	});
	con.connect(function(err)
	{
		if(err){
			console.log('Error Connecting To The DataBase!');
			return;
		}
	console.log('Connection Established To The DataBase');
	});


	//get existing FinderID of animal
	con.query('SELECT finderID FROM animalInDistress WHERE id=?', [rBody.animalID], function(err, rows, fields)
	{
		if(err)
		{
			next(err);
			return;
		}
		console.log(rows);
		var oldFinder = rows[0].finderID;
		console.log("old finder " + rows[0].finderID)
		
		//get id corresponding to un and pw provided by hoster and verify password
		con.query('SELECT * FROM profile WHERE id=?', [oldFinder], function(err, rows, fields)
		{
			
			if(err)
			{
				next(err);
				return;
			}
			
			else
			{
				console.log("Contact info returned");
				
				//send contact info back to client
				var context = {};
				context = rows[0];
				res.send(JSON.stringify(context));
			}	
			
		});
	});
});




//*****************************
//adopt animal: accepts payload.animalID, payload.uname, and payload.pw
//deletes animal record (since its adopted and out of system now) deletes old finder profile if was temp account
//returns context object with contact info of finder/host
//*****************************
app.post('/adoptanimal',function(req,res,next)
{ 

	var rBody= req.body;

	var con = mysql.createConnection({
	host  : 'localhost',
	user  : 'root',
	password: 'Password',
	database: 'petConnectDB'
	});
	con.connect(function(err)
	{
		if(err){
			console.log('Error Connecting To The DataBase!');
			return;
		}
	console.log('Connection Established To The DataBase');
	});


	//get existing FinderID of animal
	con.query('SELECT finderID FROM animalInDistress WHERE id=?', [rBody.animalID], function(err, rows, fields)
	{
		if(err)
		{
			next(err);
			return;
		}
		
		var oldFinder = rows[0].finderID;

		
		//get id corresponding to un and pw provided by hoster and verify password
		con.query('SELECT id, password FROM profile WHERE username=?', [rBody.uname], function(err, rows, fields)
		{
			if(err)
			{
				next(err);
				return;
			}
			
		
			//check if pw is valid
			if(rBody.pw == rows[0].password)
			{	
				//DELETE animal record since its getting adopted
				con.query('DELETE FROM animalInDistress WHERE id=?', [rBody.animalID], function(err, rows, fields)
				{
					if(err)
					{
						next(err);
						return;
					}
					
					
					else
					{
						//get old finder contact info and send in context to client, delete old finder if temp
						con.query('SELECT * FROM profile WHERE id=?', [oldFinder], function(err, rows, fields)
						{
							console.log("animal adopted");
							
							if(err)
							{
								next(err);
								return;
							}
							
							else
							{
								console.log("Contact info returned");
																
								//send contact info back to client
								var context = {};
								context = rows;
								res.send(JSON.stringify(context));
							}	
							
						});
					}	
					
				});
			}
				  
			else 
			{
				res.status(401).send({status:401, message: 'unauthorized', type:'internal'}); 
				console.log("incorrect un pw combination");
				return;	
			}
			
		});

	});	
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
