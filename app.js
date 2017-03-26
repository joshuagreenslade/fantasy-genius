/*jshint esversion: 6*/

var express = require('express');
var fs = require('fs');
var https = require('https');
var bodyParser = require('body-parser');
var util = require('util');
var request = require('request');
var crypto = require('crypto');
var session = require('express-session');
var privateKey = fs.readFileSync('server.key');
var certificate = fs.readFileSync('server.crt');
var config = {
        key: privateKey,
        cert: certificate
};

var PORT = process.env.PORT || 3000;
var WebSocket = require('ws');
var validator = require('express-validator');
var schedule = require('node-schedule');

var mongo = require('mongodb');
mongo.MongoClient.connect('mongodb://heroku_7c825p3h:ihn2v1da64uno548ph9re43b47@ds139360.mlab.com:39360/heroku_7c825p3h', function(err, db){
	if(err) throw err;

	var users = db.collection('users');
	var leagues = db.collection('leagues');
	var teams = db.collection('teams');
	var stats = db.collection('stats');
	var trades = db.collection('trades');

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
				case 'sender':
					req.checkBody(arg, "Must only contain numbers and letters").notEmpty().isAlphanumeric();
					break;
				case 'reciever':
					req.checkBody(arg, "Must only contain numbers and letters").notEmpty().isAlphanumeric();
					break;
				case 'sender_players':
					req.checkBody(arg, "Must be an array of integers").isIntArray();
					break;
				case 'reciever_players':
					req.checkBody(arg, "Must be an array of integers").isIntArray();
					break;
				case 'trade':
					req.checkBody(arg, "Must only contain numbers and letters").notEmpty().isAlphanumeric();
					break;
				case 'original_sender_players':
					req.checkBody(arg, "Must be an array of integers").isIntArray();
					break;
				case 'original_reciever_players':
					req.checkBody(arg, "Must be an array of integers").isIntArray();
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

	const server = express()
		.use(bodyParser.json())

		.use(session({
		    secret: 'keyboard cat',
		    resave: false,
		    saveUninitialized: true,
		    proxy: true,
		    cookie: {secure: true, sameSite: true}
		}))

		.use(validator({
			customValidators: {
				isIntArray: function(array){
					//check that it is an array, has only positive integers
					return Array.isArray(array) && array.reduce(function(acc, val){
						return acc && !isNaN(val) && (Number.isInteger(JSON.parse(val))) && (JSON.parse(val) >= 0);
					}, true);
				}
			}
		}))

		.use(express.static('frontend'))

		.use(function (req, res, next){
		    console.log("HTTPS request", req.method, req.url, req.body);
		    return next();
		})


		//signin, signout

		//sign the user in and put the user into the session
		.post('/api/signin/', checkInput, function (req, res, next) {
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
		})

		//sign the user out and destroy the session
		.get('/api/signout/', checkInput, function(req, res, next) {
		    req.session.destroy(function(err) {
		        if (err) return res.status(500).end(err);
		        return res.status(200).end("signed out");
		    });
		})

		
		//Create

		//creates a new user and put the user into the session
		.post('/api/users/', checkInput, function(req, res, next){
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
		            return res.json(user);
				});
			});
		})

		//creates a new league for the given sport
		.post('/api/leagues/', checkInput, function(req, res, next){

			if((req.body.name === undefined) || (req.body.sport === undefined) || (req.body.password === undefined))
				return res.status(400).end("Invalid body, requires a password, sport, name (league name)");

			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//check if the league exists
			leagues.findOne({name: req.body.name}, {name: 1}, function(err, league){
				if(err) return res.status(500).end(err);
				if(league) return res.status(409).end("League " + league.name + " already exists");

				var team;

				//set the user's corresponding league variable to the new league's name
				switch(req.body.sport){
					case 'nhl':

						//check that the user is not already in a league
						if(req.session.user.nhl_league !== null)
							return res.status(403).end(req.session.user.username + " is already in a league for the " + req.body.sport);

						league = {nhl_league: req.body.name};

						//create a new team for the current user
						team = new NHL_Team(req.session.user, req.body.name);
						break;
					default:
						return res.status(400).end(req.body.sport + " is not a currently supported sport");
				}

				//alow the 3 independent db calls to be run in 'parallel'
				var promises = [];
				promises.push(new Promise(function(resolve, reject){

					//create the league
					req.body.username = req.session.user.username;
					leagues.insert(new League(req.body), function(err, new_league){
			            if (err) return res.status(500).end(err);
			            new_league = new_league.ops[0];
			            resolve(new_league);
					});
				}));

				promises.push(new Promise(function(resolve, reject){

					//update the user's league
					users.update({username: req.session.user.username}, {$set: league}, function(err){
						if (err) return res.status(500).end(err);
						req.session.user[req.body.sport + '_league'] = req.body.name;
						resolve();
					});
				}));
				
				promises.push(new Promise(function(resolve, reject){

					//create a new team for the user
		            teams.insert(team, function(err){
		            	if (err) return res.status(500).end(err);
		            	resolve();
		            });
		        }));

				Promise.all(promises).then(function(response){
		            return res.json(response[0]);
		        });
			});
		})

		//adds the user to the specified league, a league cannot have more than 10 users in it
		.post('/api/leagues/:league/', checkInput, function(req, res, next){

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

					var team;

					//set the user's corresponding league variable to the specfied league
					switch(result.sport){
						case 'nhl':

							//check that the user is not already in a league
							if(req.session.user.nhl_league !== null)
								return res.status(409).end(req.session.user.username + " is already in a league for the " + result.sport);

							league = {nhl_league: req.params.league};

							//create a new team for the current user
							team = new NHL_Team(req.session.user, req.params.league);
							break;
						default:
							return res.status(400).end(result.sport + " is not a currently supported sport");
					}

					//alow the 2 independent db calls to be run in 'parallel'
					var promises = [];
					promises.push(new Promise(function(resolve, reject){

						//update the user's league
						users.update({username: req.session.user.username}, {$set: league}, function(err){
							if(err) return res.status(500).end(err);
							req.session.user[req.body.sport + '_league'] = req.params.league;
							resolve();
						});
					}));
					promises.push(new Promise(function(resolve, reject){

						//create a team for the user
						teams.insert(team, function(err){
							if(err) return res.status(500).end(err);
							resolve();
					    });
					}));

					Promise.all(promises).then(function(){

			            //tell users a new user was added to the league
						wss.clients.forEach(function(client){
							if (client.readyState === WebSocket.OPEN)
			    				client.send("new user added to " + req.params.league);
						});

				        return res.json(result);
				    });
				});
			});
		})

		//add the player to the user's team
		.post('/api/users/:user/sports/:sport/', checkInput, function(req, res, next){
			if(req.body.playerID === undefined)
				return res.status(400).end("Invalid body, requires a playerID");

			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//only the user can add to their team
			if (req.session.user.username !== req.params.user)
				return res.status(401).end("Unauthorized");

			//allow the 2 independent database calls to be run in 'parallel'
			var promises = [];
			promises.push(new Promise(function(resolve, reject){

				//get the given team's info
				teams.findOne({owner: req.params.user, sport: req.params.sport}, function(err, team){
					if(err) return res.status(500).end(err);
					if(!team) return res.status(404).end(req.params.user + " does not have a league in the " + req.params.sport);
					resolve(team);
				});
			}));
			promises.push(new Promise(function(resolve, reject){

				//check that the given id is for a valid player in the sport
				stats.findOne({playerID: req.body.playerID.toString(), sport: req.params.sport}, {Position: 1, playerID: 1}, function(err, player){
					if(err) return res.status(500).end(err);
					if(!player) return res.status(404).end("Player with id " + req.body.playerID + " does not exist in the " + req.params.sport);
					resolve(player);
				});
			}));

			Promise.all(promises).then(function(response){
				var team = response[0];
				var player = response[1];
				var query = {league: team.league};

				switch(team.sport){
					case 'nhl':
						var ice_index;
						var bench_index;

						if(player.Position === 'F'){
							query.$or = [{forward: {$elemMatch: {$eq: player.playerID}}}, {bench_forward: {$elemMatch: {$eq: player.playerID}}}];

							//no space on the ice
							ice_index = team.forward.indexOf(null);
							if(ice_index === -1){

								//no space on bench
								bench_index = team.bench_forward.indexOf(null);
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
							query.$or = [{defence: {$elemMatch: {$eq: player.playerID}}}, {bench_defence: {$elemMatch: {$eq: player.playerID}}}];

							//no space on the ice
							ice_index = team.defence.indexOf(null);
							if(ice_index === -1){

								//no space on bench
								bench_index = team.bench_defence.indexOf(null);
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
								query.G = player.playerID;
								team.modified = true;
								team.G = player.playerID;
							}
						}
						break;
				}

				//check that the player is not on another team in the league
				teams.findOne(query, function(err, result){
					if(err) return res.status(500).end(err);
					if(result) return res.status(403).end("Player with id: " + req.body.playerID + " is already on a team in " + team.league);

					teams.update({owner: req.params.user, sport: req.params.sport}, team, function(err){
						if(err) return res.status(500).end(err);

			            //tell users a new player was added the user's team
						wss.clients.forEach(function(client){
							if (client.readyState === WebSocket.OPEN)
			    				client.send(req.params.user + "'s team updated");
						});

						return res.json(team);
					});
				});
			});
		})

		//create a new trade between two players in the given league
		.post('/api/leagues/:league/trades/', checkInput, function(req, res, next){
			if((req.body.sender === undefined) || (req.body.reciever === undefined) || (req.body.sender_players === undefined) || (req.body.reciever_players === undefined))
				return res.status(400).end("Invalid body, requires a sender, reciever, sender_players, reciever_players");

			if(!req.session.user || (req.session.user.username !== req.body.sender))
				return res.status(403).end("Forbidden");

			if(req.body.sender === req.body.reciever)
				return res.status(403).end("Cannot trade with yourself");

			//convert the player ids to strings
			var sender_players = req.body.sender_players.map(function(player){return player.toString();});
			var reciever_players = req.body.reciever_players.map(function(player){return player.toString();});

			//get the two player's teams
			teams.find({league: req.params.league, $or: [{owner: req.body.sender}, {owner: req.body.reciever}]}).toArray(function(err, user_teams){
				if(err) return res.status(500).end(err);
				if(user_teams.length !== 2) return res.status(404).end("Either " + req.body.sender + " and " + req.body.reciever + " are not in the same league, or one of them do not exist or " + req.params.league + " is not a league");

				//make sure that both teams have the players
				var accepted = true;
				var sender = user_teams[1];
				var reciever = user_teams[0];
				if(user_teams[0].owner === req.body.sender){
					sender = user_teams[0];
					reciever = user_teams[1];
				}

				//check that sender has the players
				accepted = sender_players.reduce(function(acc, val){
					return acc && ((sender.G === val) || (sender.forward.includes(val)) || (sender.defence.includes(val)) || (sender.bench_forward.includes(val)) || (sender.bench_defence.includes(val)));
				}, accepted);

				//check that reciever has the players
				accepted = reciever_players.reduce(function(acc, val){
					return acc && ((reciever.G === val) || (reciever.forward.includes(val)) || (reciever.defence.includes(val)) || (reciever.bench_forward.includes(val)) || (reciever.bench_defence.includes(val)));
				}, accepted);
				
				if(!accepted)
					return res.status(403).end(sender.owner + " does not have players " + JSON.stringify(sender_players) + " and/or " + reciever.owner + " does not have players " + JSON.stringify(reciever_players));

				//simulate the test for the sender
				var response = test_trade(sender, reciever, sender_players, reciever_players);
				if(response[0])
					return res.status(403).end(response[0]);

				trades.insert(new Trade(sender.owner, reciever.owner, sender_players, reciever_players, req.params.league), function(err, trade){
					if(err) return res.status(500).end(err);
		            trade = trade.ops[0];

		            //tell users a new trade was added
					wss.clients.forEach(function(client){
						if (client.readyState === WebSocket.OPEN)
	        				client.send("a trade between " + sender.owner  + " and " + reciever.owner + " was created, countered, or deleted");
					});

		            return res.json(trade);
				});

			});
		})

		//accept a trade
		.post('/api/leagues/:league/trades/:trade/', checkInput, function(req, res, next){
			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//check that the trade exists and that the user is the reciever
			var _id = mongo.ObjectID.createFromHexString(req.params.trade);
			trades.findOne({_id: _id, reciever: req.session.user.username}, function(err, trade){
				if(err) return res.status(500).end(err);
				if(!trade) return res.status(404).end("There is no trade with id " + req.params.trade + " that " + req.session.user.username + " has recieved");

				//check that the trade is still acceptable for both sides
				teams.find({$or: [{owner: trade.sender}, {owner: trade.reciever}], league: req.params.league}).toArray(function(err, trade_teams){
					if(err) return res.status(500).end(err);

					var sender = trade_teams[1];
					var reciever = trade_teams[0];
					if(trade.sender === trade_teams[0].owner){
						sender = trade_teams[0];
						reciever = trade_teams[1];
					}

					var accepted = true;

					//check that sender has the players
					accepted = trade.sender_players.reduce(function(acc, val){
						return acc && ((sender.G === val) || (sender.forward.includes(val)) || (sender.defence.includes(val)) || (sender.bench_forward.includes(val)) || (sender.bench_defence.includes(val)));
					}, accepted);

					//check that reciever has the players
					accepted = trade.reciever_players.reduce(function(acc, val){
						return acc && ((reciever.G === val) || (reciever.forward.includes(val)) || (reciever.defence.includes(val)) || (reciever.bench_forward.includes(val)) || (reciever.bench_defence.includes(val)));
					}, accepted);

					if(!accepted)
						return res.status(403).end(sender.owner + " no longer has players " + JSON.stringify(trade.sender_players) + " and/or " + reciever.owner + " no longer has the players " + JSON.stringify(trade.reciever_players));


					//simulate the trade for sender and reciever
					var sender_trade = test_trade(sender, reciever, trade.sender_players, trade.reciever_players);
					var reciever_trade = test_trade(reciever, sender, trade.reciever_players, trade.sender_players);

					//catch errors
					if(sender_trade[0]) return res.status(403).end(sender_trade[0]);
					if(reciever_trade[0]) return res.status(403).end(reciever_trade[0]);

					sender_trade[1].modified = true;
					reciever_trade[1].modified = true;

					//commit the trade
					var promises = [];
					promises.push(new Promise(function(resolve, reject){
						teams.update({owner: sender.owner, league: req.params.league}, sender_trade[1], resolve());
					}));
					promises.push(new Promise(function(resolve, reject){
						teams.update({owner: reciever.owner, league: req.params.league}, reciever_trade[1], resolve());
					}));

					//wait until the trades have been saved
					Promise.all(promises).then(function(){

						//if the traded players are part of another trade involving the sender or reciever delete those trades
						var senderIsSender = {sender: sender.owner, sender_players: {$elemMatch: {$in: trade.sender_players}}};
						var senderIsReciever = {reciever: sender.owner, reciever_players: {$elemMatch: {$in: trade.sender_players}}};
						var recieverIsSender = {sender: reciever.owner, sender_players: {$elemMatch: {$in: trade.reciever_players}}};
						var recieverIsReciever = {reciever: reciever.owner, reciever_players: {$elemMatch: {$in: trade.reciever_players}}};
						trades.remove({$or: [senderIsSender, senderIsReciever, recieverIsSender, recieverIsReciever]}, function(){

							//tell users a new trade was added
							wss.clients.forEach(function(client){
								if (client.readyState === WebSocket.OPEN)
			        				client.send(reciever.owner  + " accepted a trade with " + sender.owner);
							});
							return res.json([sender_trade[1], reciever_trade[1]]);

						});
					});
				});
			});
		})


		//Read

		//get the current user
		.get('/api/users/currentUser/', checkInput, function(req, res, next){
			if(!req.session.user)
				return res.json(null);

			//get the user
			users.findOne({username: req.session.user.username}, {salt: 0, saltedHash: 0}, function(err, user){
				if(err) return res.status(500).end(err);
				if(!user) return res.status(404).end("User " + req.params.user + " does not exist");
				return res.json(user);
			});
		})

		//get the specified user
		.get('/api/users/:user/', checkInput, function(req, res, next){
			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//get the user
			users.findOne({username: req.params.user}, {salt: 0, saltedHash: 0}, function(err, user){
				if(err) return res.status(500).end(err);
				if(!user) return res.status(404).end("User " + req.params.user + " does not exist");
				return res.json(user);
			});
		})

		//get the specified user's team for the specified league
		.get('/api/users/:user/leagues/:league/team/', checkInput, function(req, res, next){
			if(!req.session.user) return res.status(403).end("Forbidden");

			//get the given user's team in the given league
			teams.findOne({owner: req.params.user, league: req.params.league}, {league: 0, score: 0, _id: 0}, function(err, team){
				if(err) return res.status(500).end(err);
				if(!team) return res.status(404).end("User " + req.params.user + " is not in league " + req.params.league);

				//wait for the response from get_players
				var promise = new Promise(function(resolve, reject){
					get_players(resolve, reject, team);
				});
				promise.then(function(team){
					return res.json(team);
				});
			});
		})

		//get the specified player's stats
		.get('/api/sports/:sport/players/:playerID/', checkInput, function(req, res, next){
			stats.findOne({playerID: req.params.playerID, sport: req.params.sport}, function(err, player){
				if(err) return res.status(500).end(err);
				if(!player) return res.status(404).end("There is no player with id " + req.params.playerID + " in the " + req.params.sports);
				return res.json(player);
			});
		})

		//get all the teams in the specified league
		.get('/api/sports/:sport/leagues/:league/teams/', checkInput, function(req, res, next){
			if(!req.session.user) return res.status(403).end("Forbidden");
			
			teams.find({league: req.params.league, sport: req.params.sport}).sort({wins: -1, score: -1}).toArray(function(err, league_teams){
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
		})

		//get the specified sports players
		.get('/api/sports/:sport/players/type/:type/', checkInput, function(req, res, next){

			// /api/sports/:sport/players/type/(type)/?limit=(integer)&sort=(increasing or decreasing)&sortField=(string)LastName&firstPlayer=(playerid)
			// /api/sports/:sport/players/type/skater/?limit=10&sort=increasing&sortField=LastName&firstPlayer=4583
			//type can be G, Goalie, S, Skater (in any case)

			//sorting is case sensitive so v comes after Z

			var query = {sport: req.params.sport};
			
			//default the limit to 10
			var limit = req.query.limit;
			if(limit === undefined)
				limit = 10;
			else if(isNaN(limit) || !Number.isInteger(JSON.parse(limit)))
				return res.status(400).json("Invalid arguments. Limit must be an integer and " + limit + " is not");
			else
				limit = JSON.parse(limit);

			//get the field to sort by
			var sortField = req.query.sortField + "_id";
			if(sortField === "undefined_id")
				sortField = "LastName_id";

			//get the sort direction
			var sort_direction = req.query.sort;
			if((sort_direction !== 'increasing') && (sort_direction !== 'decreasing') && (sort_direction !== undefined))
				return res.status(400).json("Invalid arguments. sort must be 'increasing' or 'decreasing' and " + sort_direction + " is not");

			//set the sort
			sort = {};
			sort[sortField] = 1;
			if(sort_direction === 'decreasing')
				sort[sortField] = -1;

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

				//get the data from the db
				stats.find(query).sort(sort).limit(parseInt(limit)).toArray(function(err, result){
					if(err) return res.status(500).end(err);
					return res.json(result);
				});
			});
		})

		//get the trades involving the user
		.get('/api/leagues/:league/users/:user/trades/', checkInput, function(req, res, next){

			// /api/leagues/:league/users/:user/trades/?sort=decreasing&firstTrade=514bf8bbbe11e483111af213&limit=15&which=sent

			if(!req.session.user || (req.session.user.username !== req.params.user))
				return res.status(403).end("Forbidden");

			var query = {league: req.params.league};

			var sort_direction = req.query.sort;
			if((sort_direction !== undefined) && (sort_direction !== 'increasing') && (sort_direction !== 'decreasing'))
				return res.status(400).end("Invalid Arguments, sort must be either increasing or decreasing");

			//start at the given firstTrade
			var firstTrade = req.query.firstTrade;
			if(firstTrade !== undefined){
				try{
					firstTrade = mongo.ObjectID(firstTrade);
				}
				catch(e){
					return res.status(400).end("Invalid Arguments, firstTrade is not a valid trade id");
				}
				query._id = {$gte: firstTrade};
				if(sort_direction === 'decreasing')
					query._id = {$lte: firstTrade};
			}

			//sort by the trade's _id field (ids are ordered by creation time)
			var sort = {_id: 1};
			if(sort_direction === 'decreasing')
				sort = {_id: -1};

			//default the limit to 10
			var limit = req.query.limit;
			if(limit === undefined)
				limit = 10;
			else if(isNaN(limit) || !Number.isInteger(JSON.parse(limit)))
				return res.status(400).json("Invalid arguments. Limit must be an integer and " + limit + " is not");
			else
				limit = JSON.parse(limit);

			//which trades to get; ones sent by the user, recieved by the user, or both
			if(req.query.which === 'sent')
				query.sender = req.params.user;
			else if(req.query.which === 'recieved')
				query.reciever = req.params.user;
			else if((req.query.which === undefined) || (req.query.which === "both"))
				query.$or = [{sender: req.params.user}, {reciever: req.params.user}];
			else
				return res.status(400).end("Invalid arguments. which must be sent, recieved, or both");

			trades.find(query).limit(limit).sort(sort).toArray(function(err, user_trades){
				if(err) return res.status(500).end(err);

				var promises = [];
				user_trades.forEach(function(trade){

					//wait for the response from get_trade_players
					promises.push(new Promise(function(resolve, reject){
						get_trade_players(resolve, reject, trade);
					}));
				});

				//wait until all trades in the leagues have their players stats in them
				Promise.all(promises).then(function(trades){
					return res.json(trades);
				});
			});
		})

		//get the specified trade involving the user
		.get('/api/leagues/:league/users/:user/trades/:trade', checkInput, function(req, res, next){
			if(!req.session.user || (req.session.user.username !== req.params.user))
				return res.status(403).end("Forbidden");

			var _id = mongo.ObjectID.createFromHexString(req.params.trade);
			trades.findOne({league: req.params.league, $or: [{sender: req.params.user}, {reciever: req.params.user}], _id: _id}, function(err, trade){
				if(err) return res.status(500).end(err);
				if(!trade) return res.status(404).end(req.params.user + " is not involved in a trade in the league " + req.params.league + " with id " + req.params.trade);

				//wait for the response from get_trade_players
				var promise = new Promise(function(resolve, reject){
					get_trade_players(resolve, reject, trade);
				});
				promise.then(function(trade){
					return res.json(trade);
				});
			});
		})


		//Update

		//update the user's password
		.patch('/api/users/:user/', checkInput, function(req, res, next){

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
				hash = crypto.createHmac('sha512', user.salt);
			    hash.update(req.body.new_password);
			    var saltedHash = hash.digest('base64');
		    	users.update({username: req.session.user.username}, {$set: {saltedHash: saltedHash}}, function(err, result){
		    		if(err) return res.status(500).end(err);
					return res.json(user);
		    	});
			});	
		})

		//update the league's password
		.patch('/api/leagues/:league/', checkInput, function(req, res, next){

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
				hash = crypto.createHmac('sha512', league.salt);
			    hash.update(req.body.password);
			    var saltedHash = hash.digest('base64');
		    	leagues.update({name: league.name}, {$set: {saltedHash: saltedHash}}, function(err, result){
		    		if(err) return res.status(500).end(err);
					return res.json(league);
		    	});
			});
		})

		//update the user's team's lineup for the given sport (shifting players around on the team)
		.patch('/api/users/:user/sports/:sport/', checkInput, function(req, res, next){
			if((req.body.benched_player === undefined) || (req.body.activated_player === undefined))
				return res.status(400).end("Invalid body, requires a benched_player and activated_player");

			if((req.body.benched_player === null) || (req.body.activated_player === null))
				return res.status(400).end("Invalid body, benched_player and activated_player must be integers");

			//only the user can edit their team
			if(!req.session.user)
				return res.status(403).end("Forbidden");
			if(req.session.user.username !== req.params.user)
				return res.status(401).end("Unauthorized");

			var benched_player = req.body.benched_player.toString();
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
		})

		//counter a trade
		.patch('/api/leagues/:league/trades/:trade/', checkInput, function(req, res, next){
			if((req.body.original_sender_players === undefined) || (req.body.original_reciever_players === undefined))
				return res.status(400).end("Invalid body, requires sender_players and reciever_players");

			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//find the trade with the given id that the current user recieved in the given league
			var _id = mongo.ObjectID.createFromHexString(req.params.trade);
			trades.findOne({league: req.params.league, reciever: req.session.user.username, _id: _id}, function(err, trade){
				if(err) return res.status(500).end(err);
				if(!trade) return res.status(404).end(req.session.user.username + " has not recieved a trade in the league " + req.params.league + " with the id " + req.params.trade);

				//convert the player ids to strings
				var new_reciever_players = req.body.original_sender_players.map(function(player){return player.toString();});
				var new_sender_players = req.body.original_reciever_players.map(function(player){return player.toString();});

				//get the two player's teams
				teams.find({league: req.params.league, $or: [{owner: trade.reciever}, {owner: trade.sender}]}).toArray(function(err, user_teams){
					if(err) return res.status(500).end(err);

					//make sure that both teams have the players
					//old reciever is the new sender
					var accepted = true;
					var sender = user_teams[1];
					var reciever = user_teams[0];
					if(user_teams[0].owner === trade.reciever){
						sender = user_teams[0];
						reciever = user_teams[1];
					}

					//check that sender has the players
					accepted = new_sender_players.reduce(function(acc, val){
						return acc && ((sender.G === val) || (sender.forward.includes(val)) || (sender.defence.includes(val)) || (sender.bench_forward.includes(val)) || (sender.bench_defence.includes(val)));
					}, accepted);

					//check that reciever has the players
					accepted = new_reciever_players.reduce(function(acc, val){
						return acc && ((reciever.G === val) || (reciever.forward.includes(val)) || (reciever.defence.includes(val)) || (reciever.bench_forward.includes(val)) || (reciever.bench_defence.includes(val)));
					}, accepted);
					
					if(!accepted)
						return res.status(403).end(sender.owner + " does not have players " + JSON.stringify(new_sender_players) + " and/or " + reciever.owner + " does not have players " + JSON.stringify(new_reciever_players));

					//simulate the trade for sender
					var response = test_trade(sender, reciever, new_sender_players, new_reciever_players);
					if(response[0])
						return res.status(403).end(response[0]);

					trades.update({_id: trade._id}, {$set: new Trade(sender.owner, reciever.owner, new_sender_players, new_reciever_players, req.params.league)}, function(err, trade){
						if(err) return res.status(500).end(err);
			            trade = trade.ops[0];

			            //tell users a new trade was added
						wss.clients.forEach(function(client){
							if (client.readyState === WebSocket.OPEN)
		        				client.send("a trade between " + sender.owner  + " and " + reciever.owner + " was created, countered, or deleted");
						});

			            return res.json(trade);
					});

				});
			});
		})


		//Delete

		//removes the given player from the given user's team in the given sport
		.delete('/api/users/:user/sports/:sport/players/:player/', checkInput, function(req, res, next){

			//only the team's owner can modify the team
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

					//if the removed player is part of another trade involving the user delete the trade
					var isSender = {sender_players: {$elemMatch: {$eq: req.params.player}}};
					var isReciever = {reciever_players: {$elemMatch: {$eq: req.params.player}}};
					trades.remove({league: team.league, $and: [{$or: [{sender: req.params.user}, {reciever: req.params.user}]}, {$or: [isSender, isReciever]}]}, function(){

						//tell users that the users team was updated
						wss.clients.forEach(function(client){
							if (client.readyState === WebSocket.OPEN)
			    				client.send(req.params.user + "'s team updated");
			    		});

						return res.json(req.params.player);
					});
				});
			});
		})

		//remove a trade from the db of trades
		.delete('/api/leagues/:league/trades/:trade/', checkInput, function(req, res, next){
			if(!req.session.user)
				return res.status(403).end("Forbidden");

			//make sure that the user is either the sender or reciever of the trade
			var _id = mongo.ObjectID.createFromHexString(req.params.trade);
			trades.findOne({$or: [{sender: req.session.user.username}, {reciever: req.session.user.username}], _id: _id}, function(err, trade){
				if(err) return res.status(500).end(err);
				if(!trade) return res.status(404).end("there is no trade with id " + req.params.trade + " that " + req.session.user.username + " sent or recieved");

				//remove the trade
				trades.remove({_id: _id}, function(){

					//tell users that the trade was deleted
					wss.clients.forEach(function(client){
						if (client.readyState === WebSocket.OPEN)
							client.send("a trade between " + trade.owner  + " and " + trade.owner + " was created, countered, or deleted");
		    		});

		    		return res.json(_id);
				});
			});
		})


		.use(function (req, res, next){
		    console.log("HTTPS Response", res.statusCode);
		    return next();
		})

		.listen(PORT, function () {
		  console.log('App listening on port ', PORT);
		});


	const wss = new WebSocket.Server({ server });

	//ping clients to keep them connected
	setInterval(function(){
		wss.clients.forEach(function(client){
			if (client.readyState === WebSocket.OPEN)
				client.send();
		});
	}, 45000);

	var rule = new schedule.RecurrenceRule();
	rule.hour = 10;
	rule.minute = 0;

	//run update every day at 6am eastern standard time (10am UTC)
	schedule.scheduleJob(rule, function(){
		get_updates(['nhl']);
	});

	//updates the stats database and updates the teams' stats
	var get_updates = function(sports){
		
		//update each supported sport's stats
		sports.forEach(function(sport){
			get_active_players(sport);
		});
	};

	//initialize all of the active players in the given sport
	var get_active_players = function(sport){

		//get all the active players
		var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/active_players.json';
		var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='};
		request({url: url, headers: header}, function(error, response, body){
			if(body !== ''){
				var active_players = JSON.parse(body).activeplayers.playerentry;
				if(active_players){
					var promises = [];

					//initialize each active player
					active_players.forEach(function(player){

						//skip if the player doesn't have a team
						if(player.team === undefined){
							active_players[active_players.indexOf(player)] = null;
							return;
						}
	
						//create a promise for each player that resolves when their stats update
						promises.push(new Promise(function(resolve, reject){
							var player_stuff = {sport: sport, points: 0};

							//add the player's team info
							if(player.team){
								Object.keys(player.team).forEach(function(key){
									if(key === 'ID')
										player_stuff.teamID = player.team[key];
									else
										player_stuff[key] = player.team[key];
								});
							}

							//add the player info
							Object.keys(player.player).forEach(function(key){
								if(key === 'ID')
									player_stuff.playerID = player.player[key];

								//don't keep all of the player's info
								else if((key === 'LastName') || (key === 'FirstName') || (key === 'Position')){
									var forwards = ['C', 'RW', 'LW'];
									if((key === 'Position') && (forwards.includes(player.player[key])))
										player.player[key] = 'F';
									player_stuff[key] = player.player[key];
								}
							});

							//add default player stats
							switch(sport){
								case 'nhl':
									if(player_stuff.Position === 'G'){
										player_stuff.Wins = '0';
										player_stuff.Losses = '0';
										player_stuff.GoalsAgainstAverage = '0';
										player_stuff.SavePercentage = '0';
										player_stuff.Shutouts = '0';
										player_stuff.Played = "No";
									}
									else{
										player_stuff.Goals = '0';
										player_stuff.Assists = '0';
										player_stuff.Points = '0';
										player_stuff.PlusMinus = '0';
										player_stuff.Played = "No";
									}
									break;
							}								

							//set initial stats and player info
							active_players[active_players.indexOf(player)] = player_stuff;
							resolve();
						}));
					});

					//only update stats when all players have been initialized
					Promise.all(promises).then(function(){
						update_stats(active_players, sport);
					});
				}
			}
		});
	};

	//update all the active players' stats
	var update_stats = function(active_players, sport){
		var date = new Date();

		//get yesterdays date
		date.setDate(date.getDate() - 1);

		var year = date.getFullYear();

		//make sure month and day are 2 digits
		var month = ("0" + (date.getMonth() + 1)).slice(-2);
		var day = ("0" + date.getDate()).slice(-2);

		//get the sport's stats
		var url = 'https://www.mysportsfeeds.com/api/feed/pull/' + sport + '/current/daily_player_stats.json?fordate=' + year + month + day;
		var header = {'Authorization': 'Basic dmV0aHVzaDEzOTU6Q1NDQzA5dmV0aHVzaA=='};
		request({url: url, headers: header}, function(error, response, body){
			if(body !== ''){
				var player_stats = JSON.parse(body).dailyplayerstats.playerstatsentry;

				//add the stats to the stats db
				if(player_stats){
					var team_points = {};

					//calculate the points each player got for the day before
					var promises = [];

					//reset the stats db
					stats.remove({});

					//only update player stats who have updated stats
					active_players.forEach(function(next_player){
						if(next_player === null)
							return;

						//get player_stats for the next_player
						var player = player_stats.reduce(function(acc, player){
							if((acc===null) && (player.player.ID===next_player.playerID))
								return player;
							return acc;
						}, null);

						//calculate the next_players' points from player.stats in the given sport
						if(player !== null)
							next_player = calculate_points(player.stats, next_player, sport);

						//create a promise for each player that resolves when their stats update
						promises.push(new Promise(function(resolve, reject){

							//find teams who have next_player in their active_players array and give them the corresponding points
							teams.find({active_players: {$elemMatch: {$eq: next_player.playerID}}}).toArray(function(err, team){
								team.forEach(function(next_team){
									if(team_points[next_team.owner] === undefined)
										team_points[next_team.owner] = 0;
									team_points[next_team.owner] += next_player.points;
								});
								

								//add id's to help sort by the player attributes
								next_player.LastName_id = next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.FirstName_id = next_player.FirstName + " " + next_player.LastName + " " + next_player.playerID;
								next_player.Position_id = next_player.Position + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.City_id = next_player.City + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.Name_id = next_player.Name + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.Abbreviation_id = next_player.Abbreviation + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.Played_id = next_player.Played + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								next_player.points_id = next_player.points + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;

								if(next_player.Position !== 'G'){
									next_player.Goals_id = next_player.Goals + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.Assists_id = next_player.Assists + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.Points_id = next_player.Points + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.PlusMinus_id = next_player.PlusMinus + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								}
								else{
									next_player.Wins_id = next_player.Wins + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.Losses_id = next_player.Losses + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.GoalsAgainstAverage_id = next_player.GoalsAgainstAverage + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.SavePercentage_id = next_player.SavePercentage + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
									next_player.Shutouts_id = next_player.Shutouts + " " + next_player.LastName + " " + next_player.FirstName + " " + next_player.playerID;
								}

								//update the player's stats and info
								stats.update({playerID: next_player.playerID}, {$set: next_player}, {upsert: true}, resolve());
							});
						}));
					});

					//only update teams when all player stats have been updated
					Promise.all(promises).then(function(){
						update_teams(team_points, sport);
					});
				}
			}
		});
	};

	//calculates the player's points
	var calculate_points = function(stats, player, sport){
		Object.keys(stats).forEach(function(key){
			switch(sport){
				case 'nhl':
					var goalie = (player.Position === 'G') && ((key === 'Wins') || (key === 'Losses') || (key === 'GoalsAgainstAverage') || (key === 'SavePercentage') || (key === 'Shutouts'));
					var skater = (player.Position !== 'G') && ((key == 'Goals') ||(key === 'Assists') || (key === 'Points') || (key === 'PlusMinus'));
					if(goalie || skater){
						player.Played = 'Yes';
						player[key] = stats[key]['#text'];
					}

					//calculate the player's points
					if(goalie){
						switch(key){
							case 'Wins':
								player.points += stats[key]['#text'] * 3;
								break;
							case 'GoalsAgainstAverage':
								var GAA = parseFloat(stats[key]['#text']);
								if((GAA >= 0) && (GAA <= 1))
									player.points += 3;
								else if((GAA > 1) && (GAA <= 2))
									player.points += 2;
								else if((GAA > 2) && (GAA <= 3))
									player.points += 1;
								break;
							case 'Shutouts':
								player.points += stats[key]['#text'] * 1;
								break;
						}
					}
					else if(skater){
						switch(key){
							case 'Goals':
								player.points += stats[key]['#text'] * 3;
								break;
							case 'Assists':
								player.points += stats[key]['#text'] * 1;
								break;
						}
					}
					break;
			}
		});
		return player;
	};

	//update all of the teams' who were either modified or had a player who got points
	var update_teams = function(team_points, sport){
		var active = {};
		var team_owners = Object.keys(team_points);

		//update each team who had their points changed
		teams.find({$or: [{modified: true}, {owner: {$in: team_owners}, sport: sport}, {score: {$gt: 0}}]}, {league: 0}).toArray(function(err, modified_teams){
			var promises = [];
			modified_teams.forEach(function(team){

				//make sure that all teams are updated before telling users
				promises.push(new Promise(function(resolve, reject){
					var update = {score: 0};

					//recalculate the teams backup list
					if(team.modified === true)
						active[team.owner] = [].concat(team.G).concat(team.forward).concat(team.defence);

					//increment the team's points
					if(team_owners.includes(team.owner))
						update.score = team_points[team.owner];

					//reset the team's active list
					if(active[team.owner] !== undefined){
						update.active_players = active[team.owner];
						update.modified = false;
					}

					teams.update({owner: team.owner, sport: sport}, {$set: update}, function(){
						
						//tell users that the specific user's team has been updated
						wss.clients.forEach(function(client){
							if (client.readyState === WebSocket.OPEN)
		        				client.send(team.owner + "'s team updated");
						});
						resolve();
					});
				}));
			});

			//only tell the users that the stats are updated when all the stats and all the teams who got points or were modified were updated
			Promise.all(promises).then(function(){
				update_winners(sport);
			});
		});
	};

	//update the teams that won
	var update_winners = function(sport){

		//find the winning teams in each league
		var group = {"$group": {_id: "$league", maxScore: {$max: "$score"}, teams: {$push: {"owner": "$owner", "score": "$score"}}}};
		var winning_teams = {"$cond": [{"$eq": ["$maxScore", "$$team.score"]},"$$team.owner", false]};
		var project = {"$project": {"teams": {"$setDifference": [{"$map": {"input": "$teams", "as": "team", "in": winning_teams}}, [false]]}}};
		teams.aggregate([group, project], function(err, winning_teams){
			
			var query = {$or: []};
			winning_teams.forEach(function(league){
				query.$or.push({league: league._id, score: {$gt: 0}, owner: {$in: league.teams}});
			});
			
			teams.update(query, {$inc: {wins: 1}}, function(){
				
				//tell users that the specific sport stats have been updated
				wss.clients.forEach(function(client){
					if (client.readyState === WebSocket.OPEN)
        				client.send(sport + " stats updated");
				});
			});
		});
	};


	//if one of the sports is not in the stats db initialize it
	stats.find({}, {sport: 1}).toArray(function(err, result){
		if(result.length === 0){
			get_updates(['nhl']);
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
		this.sport = 'nhl';
		this.score = 0;
		this.wins = 0;
	};

	var Trade = function(sender, reciever, sender_players, reciever_players, league){
		this.sender = sender;
		this.reciever = reciever;
		this.sender_players = sender_players;
		this.reciever_players = reciever_players;
		this.league = league;
	};
	

	//helper functions

	//check that the password provided is the correct password for the given object
	var checkPassword = function(object, password){
	        var hash = crypto.createHmac('sha512', object.salt);
	        hash.update(password);
	        return (object.saltedHash === hash.digest('base64'));
	};

	//simulates sending players from reciever to sender
	var test_trade = function(sender, reciever, sender_players, reciever_players){
		
		//create a copy of sender and reciever
		sender = Object.assign({}, sender);
		reciever = Object.assign({}, reciever);

		//remove the sender_players from sender's team
		sender_players.forEach(function(player){
			if(sender.G === player)
				sender.G = null;
			else if(sender.forward.indexOf(player) !== -1)
				sender.forward[sender.forward.indexOf(player)] = null;
			else if(sender.defence.indexOf(player) !== -1)
				sender.defence[sender.defence.indexOf(player)] = null;
			else if(sender.bench_forward.indexOf(player) !== -1)
				sender.bench_forward[sender.bench_forward.indexOf(player)] = null;
			else if(sender.bench_defence.indexOf(player) !== -1)
				sender.bench_defence[sender.bench_defence.indexOf(player)] = null;
		});

		var error = null;

		//try to add the players in reciever_players to sender's team
		reciever_players.forEach(function(player){

			//goalie
			if(reciever.G === player){
				if(sender.G === null)
					sender.G = player;
				else
					error = sender.owner + " does not have enough space to complete the trade";
			}

			//forward
			else if((reciever.forward.indexOf(player) !== -1) || (reciever.bench_forward.indexOf(player) !== -1)){
				var forward_index = sender.forward.indexOf(null);
				var bench_forward_index = sender.bench_forward.indexOf(null);
				if(forward_index !== -1)
					sender.forward[forward_index] = player;
				else if(bench_forward_index !== -1)
					sender.bench_forward[bench_forward_index] = player;
				else
					error = sender.owner + " does not have enough space to complete the trade";
			}

			//defence
			else if((reciever.defence.indexOf(player) !== -1) || (reciever.bench_defence.indexOf(player) !== -1)){
				var defence_index = sender.defence.indexOf(null);
				var bench_defence_index = sender.bench_defence.indexOf(null);
				if(defence_index !== -1)
					sender.defence[defence_index] = player;
				else if(bench_defence_index !== -1)
					sender.bench_defence[bench_defence_index] = player;
				else
					error = sender.owner + " does not have enough space to complete the trade";
			}					
		});
		return [error, sender];
	};

	//put all the player's stats into the given team
	var get_players = function(resolve, reject, team){
		var query = [];
		Object.keys(team).forEach(function(element){
			query = query.concat(team[element]);
		});

		//get all the players that are on the team
		stats.find({playerID: {$in: query}}).toArray(function(err, players){
			
			var index;

			//put each player in the place of the corresponding id in team
			players.forEach(function(player){

				//if forward look in forward, then in forward_bench
				if(player.Position === 'F'){
					index = team.forward.indexOf(player.playerID);
					if(index !== -1)
						team.forward[index] = player;
					else
						team.bench_forward[team.bench_forward.indexOf(player.playerID)] = player;
				}
				//if defence look in defence, then in defence_bench
				else if(player.Position === 'D'){
					index = team.defence.indexOf(player.playerID);
					if(index !== -1)
						team.defence[index] = player;
					else
						team.bench_defence[team.bench_defence.indexOf(player.playerID)] = player;
				}
				//if goalie look in G
				else
					team.G = player;

				//put the player stats into the active player array
				index = team.active_players.indexOf(player.playerID);
				if(index !== -1)
					team.active_players[index] = player;
			});
			resolve(team);
		});
	};

	//puts the player's stats inplace of their ids in the trade
	var get_trade_players = function(resolve, reject, trade){
		var query = trade.sender_players.concat(trade.reciever_players);

		//get all the players that are in the trade
		stats.find({playerID: {$in: query}}).toArray(function(err, players){
			
			//put each player in the place of the corresponding id in trade
			players.forEach(function(player){

				var sender_players_index = trade.sender_players.indexOf(player.playerID);
				var reciever_players_index = trade.reciever_players.indexOf(player.playerID);
				if(sender_players_index !== -1)
					trade.sender_players[sender_players_index] = player;
				else
					trade.reciever_players[reciever_players_index] = player;
			});
			resolve(trade);
		});
	};
});
