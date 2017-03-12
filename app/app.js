var express = require('express');
var app = express();
var fs = require('fs');
var https = require('https');

var bodyParser = require('body-parser');
app.use(bodyParser.json());
var util = require('util');
var request = require('request');

var mongo = require('mongodb');
mongo.MongoClient.connect('mongodb://localhost:27017/db', function(err, db){
	if(err) throw err;

	var users = db.collection('users');
	var leagues = db.collection('leagues');
	var teams = db.collection('teams');
	var stats = db.collection('stats');
	var trades = db.collection('trades');

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

	//run update every day at 6am
	schedule.scheduleJob(rule, function(){
		get_updates(['nhl']);
	});

	//updates the stats database and updates the teams' stats
	var get_updates = function(sports){
console.log("start")
		var date = new Date();

		//get yesterdays date
		date.setDate(date.getDate() - 1);

		var year = date.getFullYear();

		//make sure month and day are 2 digits
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);
		
		sports.forEach(function(sport){

			//get all the active players
			var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/active_players.json'		
			var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='}
			request({url: url, headers: header}, function(error, response, body){
				if(!error){
					var active_players = JSON.parse(body).activeplayers.playerentry;

					//add the stats to the stats db
					if(active_players){

						//insert each player into the db
						var promises = [];
						active_players.forEach(function(player){

							//create a promise for each player that resolves when their stats update
							promises.push(new Promise(function(resolve, reject){
								var player_stuff = {sport: sport}

								//add the player info
								Object.keys(player.player).forEach(function(key){
									if(key === 'ID')
										player_stuff['playerID'] = player.player[key];

									//don't keep all of the player's info
									else if((key === 'LastName') || (key === 'FirstName') || (key === 'Position')){
										var forwards = ['C', 'RW', 'LW'];
										if((key === 'Position') && (forwards.includes(player.player[key])))
											player.player[key] = 'F';
										player_stuff[key] = player.player[key];
									}
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
											player_stuff["Wins"] = '0';
											player_stuff["Losses"] = '0';
											player_stuff["GoalsAgainstAverage"] = '0';
											player_stuff["SavePercentage"] = '0';
											player_stuff["Shutouts"] = '0';
											player_stuff['Played'] = "No";
										}
										else{
											player_stuff["Goals"] = '0';
											player_stuff["Assists"] = '0';
											player_stuff["Points"] = '0';
											player_stuff["PlusMinus"] = '0';
											player_stuff['Played'] = "No";
										}
										break;
								}
								stats.update({playerID: player_stuff['playerID'], sport: sport}, {$set: player_stuff, $inc: {points: 0}}, {upsert: true}, function(){
									resolve();
								});
							}));
						});

						//olny update stats when all players have been initialized
						Promise.all(promises).then(function(){
						
							//get the sport's stats
							var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/daily_player_stats.json?fordate=' + year + month + day;
							var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='}
							request({url: url, headers: header}, function(error, response, body){
								if(!error){
									var player_stats = JSON.parse(body).dailyplayerstats.playerstatsentry;

									//add the stats to the stats db
									if(player_stats){
										var team_points = {};

										//calculate the points each player got for the day before
										var promises = [];
										player_stats.forEach(function(player){

											//create a promise for each player that resolves when their stats update
											promises.push(new Promise(function(resolve, reject){
												var player_stuff = {sport: sport};
												var points = 0;
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
																		points += player.stats[key]['#text'] * 3;
																		break;
																	case 'GoalsAgainstAverage':
																		var GAA = parseFloat(player.stats[key]['#text'])
																		if((GAA >= 0) && (GAA <= 1))
																			points += 3;
																		else if((GAA > 1) && (GAA <= 2))
																			points += 2;
																		else if((GAA > 2) && (GAA <= 3))
																			points += 1;
																		break;
																	case 'Shutouts':
																		points += player.stats[key]['#text'] * 1;
																		break;
																}
															}
															else if(skater){
																switch(key){
																	case 'Goals':
																		points += player.stats[key]['#text'] * 3;
																		break;
																	case 'Assists':
																		points += player.stats[key]['#text'] * 1;
																		break;
																}
															}
															break;
													}
												});

												//find teams who have player in their active_players array and give them the corresponding points
												teams.find({active_players: {$elemMatch: {$gte: player_stuff.playerID, $lte: player_stuff.playerID}}}).toArray(function(err, team){
													team.forEach(function(next_team){
														if(team_points[next_team.owner] === undefined)
															team_points[next_team.owner] = 0
														team_points[next_team.owner] += points;
													});

													//update the player's stats
													stats.update({playerID: player_stuff['playerID']}, {$set: player_stuff, $inc: {points: points}}, function(){
														resolve();
													});
												});
											}));
										});

										//only update the teams when all players have been updated
										Promise.all(promises).then(function(){
											var active = {}
											var team_owners = Object.keys(team_points)

											//update each team who had their points changed
											teams.find({$or: [{modified: true}, {owner: {$in: team_owners}, sport: sport}]}, {league: 0}).toArray(function(err, modified_teams){
												var promises = [];
												modified_teams.forEach(function(team){

													//create a promise for each team that will resolve whenthe team is updated
													promises.push(new Promise(function(resolve, reject){
														var update = {};

														//recalculate the teams backup list
														if(team.modified === true)
															active[team.owner] = [].concat(team.G).concat(team.forward).concat(team.defence)

														//increment the team's points
														if(team_owners.includes(team.owner))
															update['$inc'] = {score: team_points[team.owner]}

														//reset the team's active list
														if(active[team.owner] !== undefined)
															update['$set'] = {active_players: active[team.owner], modified: false}

														teams.update({owner: team.owner, sport: sport}, update, function(){
															resolve();
														});
													}));
												});

												//only tell the users when all the teams who got points or were modified were updated
												Promise.all(promises).then(function(){
																							
													//tell users that the specific sport stats have been updated
													wss.clients.forEach(function(client){
														if (client.readyState === WebSocket.OPEN)
									        				client.send(sport + " stats updated");
													});
console.log("done")
												});
											});
										});
									}
								}
							});
						});
					}
				}
			});
		});
	};


/*
//maybe use sockets to inform other users what other users picked and that its their turn
wss.on('connection', function connection(ws) {

});
*/

	//if one of the sports is not in the stats db initialize it
	stats.find({}, {sport: 1}).toArray(function(err, result){
		if(result.length === 0){
			get_updates(['nhl'])
		}
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

	var NHL_Team = function(user, league){
		this.G = null;
		this.forward = [null, null, null];
		this.defence = [null, null];
		this.bench_forward = [null, null];
		this.bench_defence = [null];
		this.active_players = [null, null, null, null, null, null];
		this.modified = false;
		this.owner = user.username;
		this.league = league;
		this.sport = 'nhl'
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
				case 'benched_player':
					req.checkBody(arg, "Must only contain numbers").notEmpty().isInt();
					break;
				case 'activated_player':
					req.checkBody(arg, "Must only contain numbers").notEmpty().isInt();
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
				case 'playerID':
					req.checkParams(arg, "Must only contain numbers").notEmpty().isInt();
					break;
				case 'player':
					req.checkParams(arg, "Must only contain numbers").notEmpty().isInt();
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
		if((req.body.username === undefined) || (req.body.password === undefined))
					return res.status(400).end("Invalid body, requires a username and password");

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
			return res.status(400).end("Invalid body, requires a username and password");

		//check if the user already exists
		users.findOne({username: req.body.username}, function(err, user){
			if(err) return res.status(500).end(err);
			if(user) return res.status(409).end("Username " + req.body.username + " already exists");

			users.insert(new User(req.body), function(err, user){
	            if (err) return res.status(500).end(err);
	            user = user.ops[0];
	            req.session.user = user;

	            //tell users a new one was added
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
        				client.send("new user added");
				});

	            return res.json(user);
			});
		});
	});

	//creates a new league for the given sport
	app.post('/api/leagues/', checkInput, function(req, res, next){

		if((req.body.name === undefined) || (req.body.sport === undefined) || (req.body.password === undefined))
			return res.status(400).end("Invalid body, requires a password, sport, name (league name)");

		if(!req.session.user)
			return res.status(403).end("Forbidden");

		//check if the league exists
		leagues.findOne({name: req.body.name}, {name: 1}, function(err, league){
			if(err) return res.status(500).end(err);
			if(league) return res.status(409).end("League " + league.name + " already exists");

			//set the user's corresponding league variable to the new league's name
			switch(req.body.sport){
				case 'nhl':

					//check that the user is not already in a league
					if(req.session.user.nhl_league !== null)
						return res.status(403).end(req.session.user.username + " is already in a league for the " + req.body.sport);

					req.session.user.nhl_league = req.body.name;
					users.update({username: req.session.user.username}, {$set: {nhl_league: req.body.name}});

					//create a new team for the current user
					teams.insert(new NHL_Team(req.session.user, req.body.name));
					break;
				default:
					return res.status(400).end(req.body.sport + " is not a currently supported sport");
					break;
			}

			//create the league
			req.body.username = req.session.user.username;
			leagues.insert(new League(req.body), function(err, new_league){
	            if (err) return res.status(500).end(err);
	            new_league = new_league.ops[0];

	            //tell users a new league was created
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
	    				client.send("new league created");
				});

	            return res.json(new_league);
			});
		});
	});

	//adds the user to the specified league, a league cannot have more than 10 users in it
	app.post('/api/leagues/:league/', checkInput, function(req, res, next){

		if(req.body.password === undefined)
			return res.status(400).end("Invalid body, requires a password");

		if(!req.session.user)
			return res.status(403).end("Forbidden");

		//check if the league exists
		leagues.findOne({name: req.params.league}, function(err, result){
			if(err) return res.status(500).end(err);
			if(!result) return res.status(404).end("League " + req.params.league + " does not exist");

			//check that the user is authorized to enter the league
			if (!checkPassword(result, req.body.password))
	        	return res.status(401).end("Unauthorized");

			//check that the number of users is not over 10
			teams.find({league: req.params.league}, {_id: 1}).toArray(function(err, league_teams){
				if(err) return res.status(500).end(err);
				if(league_teams.length >= 10)
					return res.status(403).end("The league " + req.params.league + " is full");

				//set the user's corresponding league variable to the specfied league
				switch(result.sport){
					case 'nhl':

						//check that the user is not already in a league
						if(req.session.user.nhl_league !== null)
							return res.status(409).end(req.session.user.username + " is already in a league for the " + result.sport);

						req.session.user.nhl_league = req.params.league;
						users.update({username: req.session.user.username}, {$set: {nhl_league: req.params.league}});

						//create a new team for the current user
						teams.insert(new NHL_Team(req.session.user, req.params.league));
						break;
					default:
						return res.status(400).end(result.sport + " is not a currently supported sport");
						break;
				}

	            //tell users a new user was added to the league
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
	    				client.send("new user added to " + req.params.league);
				});

		        return res.json(result);
			});
		});
	});

	//add the player to the user's team
	app.post('/api/users/:user/sports/:sport/', function(req, res, next){
		if(req.body.playerID === undefined)
			return res.status(400).end("Invalid body, requires a playerID");

		if(!req.session.user)
			return res.status(403).end("Forbidden");

		//only the user can add to their team
		if (req.session.user.username !== req.params.user)
			return res.status(401).end("Unauthorized");

		//get the give team's info
		teams.findOne({owner: req.params.user, sport: req.params.sport}, function(err, team){
			if(err) return res.status(500).end(err);
			if(!team) return res.status(404).end(req.params.user + " does not have a league in the " + req.params.sport);

			//check that the given id is for a valid player in the sport
			stats.findOne({playerID: req.body.playerID.toString(), sport: req.params.sport}, {Position: 1, playerID: 1}, function(err, player){
				if(err) return res.status(500).end(err);
				if(!player) return res.status(404).end("Player with id " + req.body.playerID + " does not exist in the " + req.params.sport);







///////////////////check that they are not already on another users team in the same league (bench or playing)








				switch(team.sport){
					case 'nhl':
						if(player.Position === 'F'){

							//no space on the ice
							var ice_index = team.forward.indexOf(null);
							if(ice_index === -1){

								//no space on bench
								var bench_index = team.bench_forward.indexOf(null);
								if(bench_index === -1)
									return res.status(403).end("There is no more room for forwards");

								//add player to the bench
								else
									team.bench_forward[bench_index] = player.playerID;
							}

							//add player to the ice
							else{
								team.modified = true;
								team.forward[ice_index] = player.playerID;
							}
						}
						else if(player.Position === 'D'){

							//no space on the ice
							var ice_index = team.defence.indexOf(null);
							if(ice_index === -1){

								//no space on bench
								var bench_index = team.bench_defence.indexOf(null);
								if(bench_index === -1)
									return res.status(403).end("There is no more room for defence");

								//add player to the bench
								else
									team.bench_defence[bench_index] = player.playerID;
							}

							//add player to the ice
							else{
								team.modified = true;
								team.defence[ice_index] = player.playerID;
							}
						}
						else{
							if(team.G !== null)
								return res.status(403).end("There is no more room for goalies");

							//add player to the ice
							else{
								team.modified = true;
								team.G = player.playerID;
							}
						}
						break;
				}
				teams.update({owner: req.params.user, sport: req.params.sport}, team, function(err){
					if(err) return res.status(500).end(err);

		            //tell users a new player was added the user's team
					wss.clients.forEach(function(client){
						if (client.readyState === WebSocket.OPEN)
		    				client.send("new player added to " +  + "'s team");
					});

					return res.json(team);
				});
			});
		});
	});


	//Read

	//get the specified user
	app.get('/api/users/:user/', checkInput, function(req, res, next){
		if(!req.session.user)
			return res.status(403).end("Forbidden");

		//get the user
		users.findOne({username: req.session.user.username}, {salt: 0, saltedHash: 0}, function(err, user){
			if(err) return res.status(500).end(err);
			if(!user) return res.status(404).end("User " + req.params.user + " does not exist");
			return res.json(user);
		});
	});

	//put all the player's stats into the given team
	var get_players = function(resolve, reject, team){
		var query = [];
		Object.keys(team).forEach(function(element){
			query = query.concat(team[element])
		})

		//get all the players that are on the team
		stats.find({playerID: {$in: query}}).toArray(function(err, players){
			
			//put each player in the place of the corresponding id in team
			players.forEach(function(player){

				//if forward look in forward, then in forward_bench
				if(player.Position === 'F'){
					var index = team.forward.indexOf(player.playerID);
					if(index !== -1)
						team.forward[index] = player;
					else
						team.bench_forward[team.bench_forward.indexOf(player.playerID)] = player;
				}
				//if defence look in defence, then in defence_bench
				else if(player.Position === 'D'){
					var index = team.defence.indexOf(player.playerID);
					if(index !== -1)
						team.defence[index] = player;
					else
						team.bench_defence[team.bench_defence.indexOf(player.playerID)] = player;
				}
				//if goalie look in G
				else
					team.G = player;

				//put the player stats into the active player array
				var index = team.active_players.indexOf(player.playerID);
				if(index !== -1)
					team.active_players[index] = player;
			});
			//return res.json(team);
			resolve(team);
		});
	}


	//get the specified user's team for the specified league
	app.get('/api/users/:user/leagues/:league/team/', checkInput, function(req, res, next){
		if(!req.session.user) return res.status(403).end("Forbidden");

		//get the given user's team in the given league
		teams.findOne({owner: req.params.user, league: req.params.league}, {owner: 0, league: 0, score: 0, _id: 0, sport: 0}, function(err, team){
			if(err) return res.status(500).end(err);
			if(!team) return res.status(404).end("User " + req.params.user + " is not in league " + req.params.league);

			//wait for the response from get_players
			var promise = new Promise(function(resolve, reject){
				get_players(resolve, reject, team);
			});
			promise.then(function(team){
				return res.json(team)
			});
		});
	});

	//get the specified player's stats
	app.get('/api/sports/:sport/players/:playerID/', checkInput, function(req, res, next){
		stats.findOne({playerID: req.params.playerID, sport: req.params.sport}, function(err, player){
			if(err) return res.status(500).end(err);
			if(!player) return res.status(404).end("There is no player with id " + req.params.playerID + " in the " + req.params.sports);
			return res.json(player);
		});
	});

	//get all the users in the specified league
	app.get('/api/sports/:sport/leagues/:league/teams/', function(req, res, next){
		if(!req.session.user) return res.status(403).end("Forbidden");
		
		teams.find({league: req.params.league, sport: req.params.sport}).toArray(function(err, league_teams){
			if(err) return res.status(500).end(err);
			if(!league_teams) return res.status(404).end("League " + req.params.league + " does not exist in the " + req.params.sport);

			var result_teams = [];
			var promises = [];
			league_teams.forEach(function(team){
			
				//wait for the response from get_players
				promises.push(new Promise(function(resolve, reject){
					get_players(resolve, reject, team);
				}));
			});

			//wait until all teams in the leagues have their players stats in them
			Promise.all(promises).then(function(teams){
				return res.json(teams);
			});
		});
	});

	//get the specified sports players
	app.get('/api/sports/:sport/players/type/:type/', checkInput, function(req, res, next){

		// /api/sports/:sport/players/(type)/?limit=(integer)&sort=(increasing or decreasing)&sortField=(string)LastName&firstPlayer=(playerid)
		// /api/sports/:sport/players/skater/?limit=10&sort=increasing&sortField=LastName&firstPlayer=4583
		//type can be G, Goalie, S, Skater (in any case)

		//sorting is case sensitive so v comes after Z

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
					query.Position = {$ne: 'G'};
					search_player.Position = {$ne: 'G'};
				}
				else
					return res.status(400).json("Invalid type. type must be G, Goalie, S, or Skater for the " + req.params.sport + " (Case does not matter)");
				break;
		}

		//get the player with the given id
		stats.find(search_player).sort(sort).limit(1).toArray(function(err, player){
			player = player[0];
			if(!player)
				return res.status(404).end("Player with id " + req.query.firstPlayer + " does not exist as " + req.params.type.toLowerCase());

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
			stats.find(query).sort(sort).limit(parseInt(limit)).toArray(function(err, result){
				if(err) return res.status(500).end(err);
				return res.json(result);
			});
		});
	});


	//Update

	//update the user's password
	app.patch('/api/users/:user/', checkInput, function(req, res, next){

		if((req.body.old_password === undefined) || (req.body.new_password === undefined))
			return res.status(400).end("Invalid body, requires a new_password, old_password");

		if(!req.session.user || (req.session.user.username !== req.params.user))
			return res.status(403).end("Forbidden");

		//update the user's password
		users.findOne({username: req.params.user}, function(err, user){
			if(err) return res.status(500).end(err);
			if(!user) return res.status(404).end("User " + req.params.user + " does not exist");

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
				return res.json(user);
	    	});
		});	
	});

	//update the league's password
	app.patch('/api/leagues/:league/', checkInput, function(req, res, next){

		if((req.body.admin_password === undefined) || (req.body.password === undefined))
			return res.status(400).end("Invalid body, requires a password, admin_password");

		if(!req.session.user)
			return res.status(403).end("Forbidden");

		leagues.findOne({name: req.params.league}, function(err, league){
			if(err) return res.status(500).end(err);
			if(!league) return res.status(404).end("League " + req.params.league + " does not exist");

			//only allow the league admin to change the password
			if(req.session.user.username !== league.admin)
				return res.status(401).end(req.session.user.username + " is not the admin for " + req.params.league);

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
				return res.json(league);
	    	});
		});
	});
		

	//update the user's team's lineup for the given sport (shifting players around on the team)
	app.patch('/api/users/:user/sports/:sport/', checkInput, function(req, res, next){
		if((req.body.benched_player === undefined) || (req.body.activated_player === undefined))
			return res.status(400).end("Invalid body, requires a benched_player and activated_player");

		if((req.body.benched_player === null) || (req.body.activated_player === null))
			return res.status(400).end("Invalid body, benched_player and activated_player must be integers");

		//only the user can edit their team
		if(!req.session.user)
			return res.status(403).end("Forbidden");
		if(req.session.user.username !== req.params.user)
			return res.status(401).end("Unauthorized");

		var benched_player = req.body.benched_player.toString()
		var activated_player = req.body.activated_player.toString();

		teams.findOne({owner: req.params.user, sport: req.params.sport}, function(err, team){
			if(err) return res.status(500).end(err);
			if(!team) return res.status(404).end(req.params.user + " does not have a team in the " + req.params.sport);

			var forward_index = team.forward.indexOf(benched_player);
			var bench_forward_index = team.bench_forward.indexOf(activated_player);
			var defence_index = team.defence.indexOf(benched_player);
			var bench_defence_index = team.bench_defence.indexOf(activated_player);

			//check that if benched_player is a forward then activated_player must be a bench_forward
			if((forward_index !== -1) && (bench_forward_index !== -1)){
				team.forward[forward_index] = activated_player;
				team.bench_forward[bench_forward_index] = benched_player;
				team.modified = true;
			}
			//check that if benched_player is a defence then activated_player must be a bench_defence
			else if ((defence_index !== -1) && (bench_defence_index !== -1)){
				team.defence[defence_index] = activated_player;
				team.bench_defence[bench_defence_index] = benched_player;
				team.modified = true;
			}
			else
				return res.status(403).end("Player with id " + benched_player + " cannot be switched with the player with id " + activated_player);

			teams.update({owner: req.params.user, sport: req.params.sport}, team, function(){
				if(err) return res.status(500).end(err);
				
	            //tell users the the users team was updated
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
	    				client.send(req.params.user + "'s team updated");
				});

				return res.json(team);
			});
		});
	});


	//Delete

	//removes the given player from the given user's team in the given sport
	app.delete('/api/users/:user/sports/:sport/players/:player/', checkInput, function(req, res, next){

		//only the tema's owner can modify the team
		if(!req.session.user)
			return res.status(403).end("Forbidden");
		if(req.session.user.username !== req.params.user)
			return res.status(401).end("Unauthorized");

		//get the team
		teams.findOne({owner: req.params.user, sport: req.params.sport}, {active_players: 0, _id: 0, score: 0}, function(err, team){
			if(err) return res.status(500).end(err);
			if(!team) return res.status(404).end(req.params.user + "does not have a team in the " + req.params.sport);

			//G, forward, defence, bench_forward, bench_defence
			var forward_index = team.forward.indexOf(req.params.player);
			var defence_index = team.defence.indexOf(req.params.player);
			var bench_forward_index = team.bench_forward.indexOf(req.params.player);
			var bench_defence_index = team.bench_defence.indexOf(req.params.player);

			//remove the player from the team

			//remove player from froward and replace with the last one on the bench_forward
			if(forward_index !== -1){
				var next = team.bench_forward[1] || team.bench_forward[0];	
				team.forward[forward_index] = next;
				team.bench_forward[team.bench_forward.indexOf(next)] = null;
			}

			//remove player from defence and replace with the one on the bench_defence
			else if(defence_index !== -1){
				team.defence[defence_index] = team.bench_defence[0];
				team.bench_defence[0] = null;
			}

			//remove player from bench_forward and push everyone else over
			else if(bench_forward_index !== -1){
				team.bench_forward.splice(bench_forward_index, 1);
				team.bench_forward.push(null);
			}

			//remove player from bench_defence and push everyone else over
			else if(bench_defence_index !== -1){
				team.bench_defence.splice(bench_defence_index, 1);
				team.bench_defence.push(null);
			}

			//remove player from goal
			else if(team.G === req.params.player)
				team.G = null;
			else
				return res.status(403).end("Player with id " + req.params.player + " is not on " + req.params.user + "'s team in the " + req.params.sport);
		
			teams.update({owner: req.params.user, sport: req.params.sport}, {$set: team}, function(){

				//tell users the the users team was updated
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
	    				client.send(req.params.user + "'s team updated");
	    		});

				return res.json(req.params.player);
			});
		});
	});

	app.use(function (req, res, next){
	    console.log("HTTPS Response", res.statusCode);
	    return next();
	});

	server.listen(3000, function () {
	  console.log('App listening on port 3000');
	});

});