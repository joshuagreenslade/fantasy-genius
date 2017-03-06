var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var util = require('util');
var request = require('request');

var Datastore = require('nedb');
var users = new Datastore({filename: 'db/users.db', autoload: true});
var leagues = new Datastore({filename: 'db/leagues.db', autoload: true});
var teams = new Datastore({filename: 'db/teams.db', autoload: true});
var stats = new Datastore({filename: 'db/stats.db', autoload:true});

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
var server = https.createServer(config, app);
var WebSocket = require('ws');
var wss = new WebSocket.Server({ server });

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

//code in here will be run every day at 6am
schedule.scheduleJob(rule, function(){
	var date = new Date();

	//get yesterdays date
	date.setDate(date.getDate() - 1);

	var year = date.getFullYear();

	//make sure month and day are 2 digits
	var month = ("0" + (date.getMonth() + 1)).slice(-2);
	var day = ("0" + date.getDate()).slice(-2);

	//list of supported sports
	var sports = ['nhl'];
	sports.forEach(function(sport){

		//get the sport's stats
		var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/daily_player_stats.json?fordate=' + year + month + day;
		
		var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='}
		request({url: url, headers: header}, function(error, response, body){
			if(!error){
				var player_stats = JSON.parse(body).dailyplayerstats.playerstatsentry;

				//add the stats to the stats db
				if(player_stats){

					//insert each player into the db
					player_stats.forEach(function(player){
						//player.sport = sport;

						//turn the api's format into a custom format
						var player_stuff = {sport: sport};

						//add the player info
						Object.keys(player.player).forEach(function(key){
							if(key === 'ID')
								player_stuff['playerID'] = player.player[key];
							else
								player_stuff[key] = player.player[key];
						});

						//add the player's team info
						Object.keys(player.team).forEach(function(key){
							if(key === 'ID')
								player_stuff['teamID'] = player.team[key];
							else
								player_stuff[key] = player.team[key];
						});

						//add the player's stats
						Object.keys(player.stats).forEach(function(key){
							player_stuff[key] = player.stats[key]
						});

						player_stuff.date = date;
						stats.insert(player_stuff);
					});
	
					//tell users that the nhl stats have been updated
					wss.clients.forEach(function(client){
						if (client.readyState === WebSocket.OPEN)
	        				client.send(sport + " stats updated");
					});
				}
			}
		});
	});
});



//websocket that sends message to every user
wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    
    //send the message to all users active
    wss.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});


//maybe use sockets to inform other users what other users picked and that its their turn





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

var Team = function(user, league){
	this.center = null;
	this.left_wing = null;
	this.right_wing = null;
	this.left_defense = null;
	this.right_defense = null;
	this.goalie = null;
	this.bench = [];
	this.owner = user.username;
	this.league = league;
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
			case 'old_password':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
			case 'new_password':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
			case 'admin_password':
				req.checkBody(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
		}
	});

	Object.keys(req.params).forEach(function(arg){
		switch(arg){
			case 'sport':
				req.checkParams(arg, "Must only contain letters").notEmpty().isAlpha();
				break;
			default:
				req.checkParams(arg, "Must only contain numbers or letters").notEmpty().isAlphanumeric();
				break;
		}
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
        return res.json(user);
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
            return res.json(user);
		});
	});
});

//creates a new league for the given sport
app.post('/api/leagues/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

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

				//create a new team for the current user
				teams.insert(new Team(req.session.user, req.body.name));
				break;
			default:
				return res.status(400).end(req.body.sport + " is not a currently supported sport");
				break;
		}

		//create the league
		req.body.username = req.session.user.username;
		leagues.insert(new League(req.body), function(err, new_league){
            if (err) return res.status(500).end(err);
            return res.json(new_league);
		});
	});
});

//adds a new user to the specified league
app.post('/api/leagues/:league/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

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

				//create a new team for the current user
				teams.insert(new Team(req.session.user, req.params.league));
				break;
			default:
				return res.status(400).end(result.sport + " is not a currently supported sport");
				break;
		}
        return res.json(result);
	});
});

//add the player to the user's bench


//Read

//get the specified user
app.get('/api/users/:user/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

	//get the user
	users.findOne({username: req.session.user.username}, function(err, user){
		if(err) return res.status(500).end(err);
		if(!user) return res.status(409).end("User " + req.params.user + " does not exist");
		return res.json(user);
	});
});

//get the specified user's team for the specified league
app.get('/api/users/:user/leagues/:league/team/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

	//get the given user's team in the given league
	teams.findOne({owner: req.params.user, league: req.params.league}, function(err, team){
		if(err) return res.status(500).end(err);
		if(!team) return res.status(409).end("User " + req.params.user + " is not in league " + req.params.league);
		return res.json(team);
	});
});

//get the specified sports players
app.get('/api/sports/:sport/players/', checkInput, function(req, res, next){

// /api/sports/:sport/players/?limit=(integer)&sort=(increasing or decreasing)&sortField=(string)LastName&date=(mm-dd-yyyy)&firstPlayer=(playerid)
// /api/sports/:sport/players/?limit=10&sort=increasing&sortField=LastName&date=03-05-2017&firstPlayer=4583


//	if(!req.session.user)
//		return res.status(401).end("Forbidden");

	var query = {sport: req.params.sport};

	//default the limit to 10
	var limit = req.query.limit;
	if(limit === undefined)
		limit = 10;
	else if(Number.isInteger(limit))
		return res.status(400).json("Invalid arguments. Limit must be an integer and " + limit + " is not");

	//get the field to sort by
	var sortField = req.query.sortField;
	if(sortField === undefined)
		sortField = "LastName";

	//get the sort direction
	var sort_direction = req.query.sort;
	if((sort_direction !== 'increasing') && (sort_direction !== 'decreasing') && (sort_direction !== undefined))
		return res.status(400).json("Invalid arguments. sort must be 'increasing' or 'decreasing' and " + sort_direction + " is not");

	//set the sort
	sort = {};
	sort[sortField] = 1;
	sort.LastName = 1;
	if(sort_direction === 'decreasing'){
		sort[sortField] = -1;
		sort.Lastname = -1;
	}

	//get the first player sorted by date
	stats.findOne({}).sort({date: -1}).exec(function(err, player){

		//dates must in the form of month-day-year
		var date = req.query.date;
		var tomorrow;

		//if no date was given in url set it to today
		if(date !== undefined){
			date = new Date(date);

			if(isNaN(date))
				return res.status(400).end("Must be a date in the form of month-day-year");
			
			tomorrow = new Date()
			tomorrow.setDate(date.getDate() + 1);
			tomorrow.setHours(0);
		}

		//set the date to most recient date if none was provided
		if(player && (date === undefined)){
			var date = player.date;
			date.setHours(0);
			tomorrow = new Date()
			tomorrow.setDate(date.getDate() + 1);
			tomorrow.setHours(0);
		}

		query.date = {$gte: date, $lte: tomorrow}


		//if a firstPlayer id was given start looking getting players after and including that
		var search_player = {};
		if(req.query.firstPlayer !== undefined){
			search_player.playerID = req.query.firstPlayer;
			if(isNaN(req.query.firstPlayer))
				return res.status(400).json("Must only contain numbers");
		}

		//get the player with the given id
		stats.findOne(search_player).sort(sort).exec(function(err, player){
			if(!player)
				return res.status(400).end("Player with id " + req.query.firstPlayer + " does not exist");

			//set the player t o start looking with
			if(sort_direction === 'decreasing'){
				query[sortField] = {$lte: player[sortField]};
				query.LastName = {$lte: player.LastName}
			}
			else{
				query[sortField] = {$gte: player[sortField]};
				query.LastName = {$gte: player.LastName}
			}

			//get the data from the db
			stats.find(query).sort(sort).limit(limit).exec(function(err, result){
				if(err) return res.status(500).end(err);
				return res.json(result);
			})
		});
	});
});


//Update

//update the user's password
app.patch('/api/users/:user/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

	//update the user's password
	users.findOne({username: req.session.user.username}, function(err, user){
		if(err) return res.status(500).end(err);
		if(!user) return res.status(409).end("User " + req.params.user + " does not exist");

		var hash = crypto.createHmac('sha512', user.salt);

 		//make sure that the old password is correct
        hash.update(req.body.old_password);
        if(user.saltedHash !== hash.digest('base64'))
        	return res.status(401).end("Unauthorized");

		//put the new password's saltedHash in the db
		var hash = crypto.createHmac('sha512', user.salt);
	    hash.update(req.body.new_password);
	    var saltedHash = hash.digest('base64');
    	users.update({username: req.session.user.username}, {$set: {saltedHash: saltedHash}}, function(err, result){
    		if(err) return res.status(500).end(err);

    		user.saltedHash = saltedHash
    		req.session.user = user;
			return res.json(user);
    	});
	});	
});

//update the league's password
app.patch('/api/leagues/:league/', checkInput, function(req, res, next){
	if(!req.session.user)
		return res.status(401).end("Forbidden");

	leagues.findOne({name: req.params.league}, function(err, league){
		if(err) return res.status(500).end(err);
		if(!league) return res.status(409).end("League " + req.params.league + " does not exist");

		//only allow the league admin to change the password
		if(req.session.user.username !== league.admin)
			return res.status(403).end(req.session.user.username + " is not the admin for " + req.params.league);

 		//make sure that the admin password is correct
 		var hash = crypto.createHmac('sha512', req.session.user.salt);
        hash.update(req.body.admin_password);
        if(req.session.user.saltedHash !== hash.digest('base64'))
        	return res.status(401).end("Unauthorized");

		//put the new password's saltedHash in the db
		var hash = crypto.createHmac('sha512', league.salt);
	    hash.update(req.body.password);
	    var saltedHash = hash.digest('base64');
    	leagues.update({name: league.name}, {$set: {saltedHash: saltedHash}}, function(err, result){
    		if(err) return res.status(500).end(err);

    		league.saltedHash = saltedHash;
			return res.json(league);
    	});
	});
});
	

//Delete


app.use(function (req, res, next){
    console.log("HTTPS Response", res.statusCode);
    return next();
});

server.listen(3000, function () {
  console.log('App listening on port 3000');
});