var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
app.use(bodyParser.json());
var util = require('util');

var Datastore = require('nedb');
var users = new Datastore({filename: 'db/users.db', autoload: true});

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

//object constructors

var User = function(user){
    var salt = crypto.randomBytes(16).toString('base64');
    var hash = crypto.createHmac('sha512', salt);
    hash.update(user.password);
    this.username = user.username;
    this.salt = salt;
    this.saltedHash = hash.digest('base64');
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

//check that the password provided is the correct password for the given user
var checkPassword = function(user, password){
        var hash = crypto.createHmac('sha512', user.salt);
        hash.update(password);
        return (user.saltedHash === hash.digest('base64'));
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

            //dont return the salt or saltedHash
            delete user.salt;
            delete user.saltedHash;
            return res.json(user);
		});
	});
});







app.use(function (req, res, next){
    console.log("HTTPS Response", res.statusCode);
    return next();
});

https.createServer(config, app).listen(3000, function () {
  console.log('App listening on port 3000');
});