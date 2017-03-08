var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var util = require('util');
var request = require('request');

var Datastore = require(/*'mongodb'*/'nedb');
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

		//get all the active players
		var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/active_players.json'		
		var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='}
		request({url: url, headers: header}, function(error, response, body){
			if(!error){
				var active_players = JSON.parse(body).activeplayers.playerentry;

				//add the stats to the stats db
				if(active_players){
					var num_players = [];

					//insert each player into the db
					active_players.forEach(function(player){
						var player_stuff = {sport: sport, points: 0};

						//add the player info
						Object.keys(player.player).forEach(function(key){
							if(key === 'ID')
								player_stuff['playerID'] = player.player[key];

							//don't keep all of the player's info
							else if((key === 'LastName') || (key === 'FirstName') || (key === 'Position'))
								player_stuff[key] = player.player[key];
						});

						//add the player's team info
						if(player.team){
							Object.keys(player.team).forEach(function(key){
								if(key === 'ID')
									player_stuff['teamID'] = player.team[key];
								else
									player_stuff[key] = player.team[key];
							});
						}

						//if the player doesn't have a team
						else{
							player_stuff['teamID'] = "N/A";
							player_stuff["City"] = "N/A";
							player_stuff["Name"] = "N/A";
							player_stuff["Abbreviation"] = "N/A";
						}

						//add default player stats
						switch(sport){
							case 'nhl':
								if(player_stuff['Position'] === 'G'){
									player_stuff["Wins"] = '0'//{"@abbreviation":"W","#text":"0"};
									player_stuff["Losses"] = '0'//{"@abbreviation":"L","#text":"0"};
									player_stuff["GoalsAgainstAverage"] = '0'//{"@abbreviation":"GAA","#text":"0"};
									player_stuff["SavePercentage"] = '0'//{"@abbreviation":"Sv%","#text":"0"};
									player_stuff["Shutouts"] = '0'//{"@abbreviation":"SO","#text":"0"};
									player_stuff['Played'] = "No";
								}
								else{
									player_stuff["Goals"] = '0'//{"@abbreviation":"G","#text":"0"};
									player_stuff["Assists"] = '0'//{"@abbreviation":"A","#text":"0"};
									player_stuff["Points"] = '0'//{"@abbreviation":"Pts","#text":"0"};
									player_stuff["PlusMinus"] = '0'//{"@abbreviation":"+/-","#text":"0"};
									player_stuff['Played'] = "No"
								}
								break;
						}

						stats.update({playerID: player_stuff['playerID'], sport: sport}, player_stuff, {upsert: true}, function(){

							num_players.push(1);
							if(num_players.length === Object.keys(active_players).length)
								update_stats();
						});
					});
				}
			}
		});

		//update the players' stats for the given sport
		var update_stats = function(){

			//get the sport's stats
			var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/daily_player_stats.json?fordate=' + year + month + day;
			var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='}
			request({url: url, headers: header}, function(error, response, body){
				if(!error){
					var player_stats = JSON.parse(body).dailyplayerstats.playerstatsentry;

					//add the stats to the stats db
					if(player_stats){
						var team_points = {};
						var num_players = [];

						//calculate the points each player got for the day before
						player_stats.forEach(function(player){
							var player_stuff = {sport: sport, points: 0};
							player_stuff['playerID'] = player.player['ID'];

							//add the player's stats
							Object.keys(player.stats).forEach(function(key){
								switch(sport){
									case 'nhl':
										var goalie = (player.player['Position'] === 'G') && ((key === 'Wins') || (key === 'Losses') || (key === 'GoalsAgainstAverage') || (key === 'SavePercentage') || (key === 'Shutouts'))
										var skater = (player.player['Position'] !== 'G') && ((key == 'Goals') ||(key === 'Assists') || (key === 'Points') || (key === 'PlusMinus'))
										if(goalie || skater){
											player_stuff.Played = 'Yes';
											player_stuff[key] = player.stats[key]['#text']
										}

										//calculate the player's points
										if(goalie){
											switch(key){
												case 'Wins':
													player_stuff.points += player.stats[key]['#text'] * 3;
													break;
												case 'GoalsAgainstAverage':
													var GAA = parseInt(player.stats[key]['#text'])
													if((GAA >= 0) && (GAA <= 1))
														player_stuff.points += 3;
													else if((GAA > 1) && (GAA <= 2))
														player_stuff.points += 2;
													else if((GAA > 2) && (GAA <= 3))
														player_stuff.points += 1;
													break;
												case 'Shutouts':
													player_stuff.points += player.stats[key]['#text'] * 1;
													break;
											}
										}
										else if(skater){
											switch(key){
												case 'Goals':
													player_stuff.points += player.stats[key]['#text'] * 3;
													break;
												case 'Assists':
													player_stuff.points += player.stats[key]['#text'] * 1;
													break;
											}
										}
										break;
								}
							});

							//look for the player playing in their position
							var query = {};
							if(player.player['Position'] === 'D')
								query['$or'] = {'RD': parseInt(player_stuff['playerID']), 'LD': parseInt(player_stuff['playerID'])}
							else
								query[player.player['Position']] = parseInt(player_stuff['playerID']);

							//find the teams that had the specified player playing and give them the corresponding points
							teams.find(query, function(err, team){
								if(team){
									for(var i=0; i<team.length; i++){
										if(team_points[team[i]._id] === undefined)
											team_points[team[i]._id] = 0
										team_points[team[i]._id] += player_stuff.points;
									}
								}

								//update the player's stats
								stats.update({playerID: player_stuff['playerID']}, {$set: player_stuff}, function(){

									//update the teams points only after all the players have been iterated over
									num_players.push(1);
									if(num_players.length === Object.keys(player_stats).length){
										update_teams();
									}
								});
							});
						});

						//update each modified team
						var update_teams = function(){
							
							//compress the stats db file
							stats.persistence.compactDatafile();
	
///////////////////////////////for mongodb possibly do
///////////////////////////////stats.repairDatabase()



							if(Object.keys(team_points).length === 0)
								tell_users();

							//update each team who had their points change
							var i = []
							Object.keys(team_points).forEach(function(team_id){
								teams.update({_id: team_id}, {$inc: {score: team_points[team_id]}}, function(){
									
									//tell the users that the stats have been updated only after all stats have been updated
									i.push(1);
									if(i.length === Object.keys(team_points).length){
										tell_users();
									}
								});
							});
						}

						//tell the users that the stats have been calculated
						var tell_users = function(){
							
							//compress the teams file
							teams.persistence.compactDatafile();

//////////////////////////////for mongodb possibly do
//////////////////////////////teams.repairDatabase()


							
							//tell users that the nhl stats have been updated
							wss.clients.forEach(function(client){
								if (client.readyState === WebSocket.OPEN)
			        				client.send(sport + " stats updated");
							});
						}
					}
				}
			});
		}
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
	this.C = null;
	this.LW = null;
	this.RW = null;
	this.RD = null;
	this.LD = null
	this.G = null;
	this.bench = [];
	this.owner = user.username;
	this.league = league;
	this.score = 0;
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
			case 'type':
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

	if((req.body.username === undefined) || (req.body.password === undefined))
		return res.status(409).end("Invalid body, requires a username and password");

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

	if((req.body.name === undefined) || (req.body.sport === undefined) || (req.body.password === undefined))
		return res.status(409).end("Invalid body, requires a password, sport, name (league name)");

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

//adds a new user to the specified league, a league cannot have more than 10 users in it
app.post('/api/leagues/:league/', checkInput, function(req, res, next){

	if(req.body.password === undefined)
		return res.status(409).end("Invalid body, requires a password");

	if(!req.session.user)
		return res.status(401).end("Forbidden");

	//check if the league exists
	leagues.findOne({name: req.params.league}, function(err, result){
		if(err) return res.status(500).end(err);
		if(!result) return res.status(409).end("League " + req.params.league + " does not exist");

		//check that the user is authorized to enter the league
		if (!checkPassword(result, req.body.password))
        	return res.status(401).end("Unauthorized");

		//check that the number of users is not over 10
		teams.find({league: req.params.league},function(err, league_teams){
			if(err) return res.status(500).end(err);
			console.log(league_teams)
			if(league_teams.length >= 10)
				return res.status(409).end("The league " + req.params.league + " is full");

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
});

//add the player to the user's bench
app.post('/api/users/:user/sports/:sport/', function(req, res, next){
	if(req.body.playerID === undefined)
		return res.status(409).end("Invalid body, requires a playerID");

	if(!req.session.user)
		return res.status(401).end("Forbidden");

	//get the give user's info
	users.findOne({username: req.params.user}, function(err, result){
		if(err) return res.status(500).end(err);
		if(!result) return res.status(409).end("User " + req.params.user + " does not exist");
		var league;
		switch(req.params.sport){
			case 'nhl':
				if(result.nhl_league !== null)
					league = result.nhl_league;
				else
					return res.status(400).end("User does not have a league in the " + req.params.sport);
				break;
			default:
				return res.status(400).end("The " + req.params.sport + " is not supported");
				break;
		}

		//only the user can add to their team
		if (req.session.user.username !== req.params.user)
			return res.status(401).end("Unauthorized");

		//check that the given id is for a valid player in the sport
		stats.findOne({playerID: req.body.playerID.toString(), sport: req.params.sport}, function(err, player){
			if(err) return res.status(500).end(err);
			if(!player) return res.status(404).end("Player with id " + req.body.playerID + " does not exist in the " + req.params.sport);



			//check that they are not already on another users team in the same league (bench or playing)



			//add the player's id to the user's bench
			teams.update({owner: req.params.user, league: league}, {$push: {bench: player.playerID}}, function(err, team){
				if(err) return res.status(500).end(err);
				return res.json(team);
			});
		});
	});
});


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
app.get('/api/sports/:sport/players/:type/', checkInput, function(req, res, next){

	// /api/sports/:sport/players/(type)/?limit=(integer)&sort=(increasing or decreasing)&sortField=(string)LastName&firstPlayer=(playerid)
	// /api/sports/:sport/players/skater/?limit=10&sort=increasing&sortField=LastName&firstPlayer=4583
	//type can be G, Goalie, S, Skater (in any case)


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
		sort.LastName = -1;
	}

	//if a firstPlayer id was given start looking getting players after and including that
	var search_player = {};
	if(req.query.firstPlayer !== undefined){
		search_player.playerID = req.query.firstPlayer;
		if(isNaN(req.query.firstPlayer))
			return res.status(400).json("Must only contain numbers");
	}

	//check the type of player given
	switch(req.params.sport){
		case 'nhl':
			if((req.params.type.toLowerCase() === 'g') || (req.params.type.toLowerCase() === 'goalie')){
				query.Position = 'G';
				search_player.Position = 'G';
			}
			else if((req.params.type.toLowerCase() === 's') || (req.params.type.toLowerCase() === 'skater')){
				query['$not'] = {Position: 'G'};
				search_player['$not'] = {Position: 'G'};
			}
			else
				return res.status(400).json("Invalid type. type must be G, Goalie, S, or Skater for the " + req.params.sport + " (Case does not matter)");
			break;
	}

	//get the player with the given id
	stats.findOne(search_player).sort(sort).exec(function(err, player){
		if(!player)
			return res.status(400).end("Player with id " + req.query.firstPlayer + " does not exist as " + req.params.type.toLowerCase());


			//set the player to start looking with
			query[sortField] = {$gte: player[sortField]};
			if(sort_direction === 'decreasing')
				query[sortField] = {$lte: player[sortField]};

			//make the secondary sort by lastname
			if((req.query.firstPlayer !== undefined) && (player[sortField] !== undefined) && (sortField !== 'LastName')){
				query.LastName = {$gte: player.LastName}
				if(sort_direction === 'decreasing')
					query.LastName = {$lte: player.LastName}				
			}


		//get the data from the db
		stats.find(query).sort(sort).limit(limit).exec(function(err, result){
			if(err) return res.status(500).end(err);
			return res.json(result);
		});
	});
});



//Update

//update the user's password
app.patch('/api/users/:user/', checkInput, function(req, res, next){

	if((req.body.old_password === undefined) || (req.body.new_password === undefined))
		return res.status(409).end("Invalid body, requires a new_password, old_password");

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

	if((req.body.admin_password === undefined) || (req.body.password === undefined))
		return res.status(409).end("Invalid body, requires a password, admin_password");

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
	

//update the user's lineup (shifting players around on the team)















//Delete


app.use(function (req, res, next){
    console.log("HTTPS Response", res.statusCode);
    return next();
});

server.listen(3000, function () {
  console.log('App listening on port 3000');
});