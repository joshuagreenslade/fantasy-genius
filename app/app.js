var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var util = require('util');

var Datastore = require('nedb');
var users = new Datastore({filename: 'db/users.db', autoload: true});
var leagues = new Datastore({filename: 'db/leagues.db', autoload: true});

var crypto = require('crypto');
var session = require('express-session');
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: {secure: true, sameSite: true}
}));

var privateKey = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.crt');
var config = {
        key: privateKey,
        cert: certificate
};

var validator = require('express-validator');
app.use(validator());

app.use(express.static('frontend'));

app.use(function (req, res, next){
    console.log("HTTPS request", req.method, req.url, req.body);
    return next();
});

var schedule = require('node-schedule');
var rule = new schedule.RecurrenceRule();
rule.hour = 6;
rule.minute = 0;

schedule.scheduleJob(rule, function(){
  //code in here will be run every day at 6am





});


//object constructors

var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
    this.nhl_league = null;
};

var League = function(league){
	var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(league.password);
    this.name = league.name;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
    this.sport = league.sport;
    this.admin = league.username;
};

//verify and sanitize req.body and req.params
var checkInput = function(req, res, next){
	Object.keys(req.body).forEach(function(arg){
		switch(arg){
			case 'username':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
			case 'password':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
			case 'name':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
			case 'sport':
				req.checkBody(arg, "Must only contain letters").notEmpty().isAlpha();
				break;
			case 'admin':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
		}
	});

	Object.keys(req.params).forEach(function(arg){
		req.checkParams(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
	});

	req.getValidationResult().then(function(result) {
        if (!result.isEmpty())
        	return res.status(400).end('Validation errors: ' + util.inspect(result.array()));
        else return next();    
	});
};


//Authentication

//check that the password provided is the correct password for the given object
var checkPassword = function(object, password){
        var hash = crypto.createHmac('sha512', object.salt);
        hash.update(password);
        return (object.saltedHash === hash.digest('base64'));
};


//signin, signout

//sign the user in and put the user into the session
app.post('/api/signin/', checkInput, function (req, res, next) {

    //look for the user in the db and confirm that the given password is correct
    users.findOne({username: req.body.username}, function(err, user){
        if (err) return res.status(500).end(err);
        if (!user || !checkPassword(user, req.body.password))
        	return res.status(401).end("Unauthorized");
        req.session.user = user;

        //dont return the salt or saltedHash
        delete user.salt;
        delete user.saltedHash;
        res.json(user);
        return next();
    });
});

//sign the user out and destroy the session
app.get('/api/signout/', checkInput, function (req, res, next) {
    req.session.destroy(function(err) {
        if (err) return res.status(500).end(err);
        return res.status(200).end("signed out");
    });
});


//Create

//creates a new user and put the user into the session
app.post('/api/users/', checkInput, function(req, res, next){

	//check if the user already exists
	users.findOne({username: req.body.username}, function(err, user){
		if(err) return res.status(500).end(err);
		if(user) return res.status(409).end("Username " + req.body.username + " already exists");

		users.insert(new User(req.body), function(err, user){
            if (err) return res.status(500).end(err);
            req.session.user = user;

            //dont return the salt or saltedHash
            delete user.salt;
            delete user.saltedHash;
            return res.json(user);
		});
	});
});

//creates a new league for the given sport
app.post('/api/leagues/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(403).end("Forbidden");

	//check if the league exists
	leagues.findOne({name: req.body.name}, function(err, league){
		if(err) return res.status(500).end(err);
		if(league) return res.status(409).end("League " + req.body.name + " already exists");

		//set the user's corresponding league variable to the new league's name
		switch(req.body.sport){
			case 'nhl':

				//check that the user is not already in a league
				if(req.session.user.nhl_league !== null)
					return res.status(403).end(req.session.user.username + " is already in a league for the " + req.body.sport);

				req.session.user.nhl_league = req.body.name;
				users.update({username: req.session.user.username}, {$set: {nhl_league: req.body.name}});
				break;
			default:
				return res.status(400).end(req.body.sport + " is not a currently supported sport");
				break;
		}

		//create the league
		req.body.username = req.session.user.username;
		leagues.insert(new League(req.body), function(err, new_league){
            if (err) return res.status(500).end(err);

            //dont return the salt or saltedHash
            delete new_league.salt;
            delete new_league.saltedHash;
            return res.json(new_league);
		});
	});
});

//adds a new user to the specified league
app.post('/api/leagues/:league/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(403).end("Forbidden");

	//check if the league exists
	leagues.findOne({name: req.params.league}, function(err, result){
		if(err) return res.status(500).end(err);
		if(!result) return res.status(409).end("League " + req.params.league + " does not exist");

		//check that the user is authorized to enter the league
		if (!checkPassword(result, req.body.password))
        	return res.status(401).end("Unauthorized");

		//set the user's corresponding league variable to the specfied league
		switch(result.sport){
			case 'nhl':

				//check that the user is not already in a league
				if(req.session.user.nhl_league !== null)
					return res.status(403).end(req.session.user.username + " is already in a league for the " + result.sport);

				req.session.user.nhl_league = req.params.league;
				users.update({username: req.session.user.username}, {$set: {nhl_league: req.params.league}});
				break;
			default:
				return res.status(400).end(result.sport + " is not a currently supported sport");
				break;
		}

        //dont return the salt or saltedHash
        delete result.salt;
        delete result.saltedHash;
        return res.json(result);
	});
});

//Read
//Update
//Delete


app.use(function (req, res, next){
    console.log("HTTPS Response", res.statusCode);
    return next();
});

https.createServer(config, app).listen(3000, function () {
  console.log('App listening on port 3000');
});