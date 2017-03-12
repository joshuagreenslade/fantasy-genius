var view = (function() {
	"use strict";

	window.onload = function() {
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	}
	document.getElementById('to_signin').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var signin = document.getElementById("signin");
		signin.style.display = 'block';
	}

	document.getElementById('to_signup').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var signup = document.getElementById("signup");
		signup.style.display = 'block';
	}

	document.getElementById('to_home').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	}
	//for signin button on main page
	document.getElementById('signin_page').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var signin = document.getElementById("signin");
		signin.style.display = 'block';
	}

	document.getElementById('signup_page').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var signup = document.getElementById("signup");
		signup.style.display = 'block';
	}
	//for when submit is clicked on sign in page
	document.getElementById('signin_button').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.username = document.getElementById('username').value;
		data.password = document.getElementById('pwd').value;
		document.dispatchEvent(new CustomEvent("credentialsSent", {detail: data}));
	};

	document.getElementById('signup_button').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.username = document.getElementById('signup_username').value;
		data.password = document.getElementById('signup_pwd').value;
		document.dispatchEvent(new CustomEvent("usercreated", {detail: data}));
	};

	document.getElementById('link_to_createleague').onclick = function(e) {
		e.preventDefault();
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
		var leaguecreate = document.getElementById("leaguecreate");
		leaguecreate.style.display = 'block';
	};

	document.getElementById('link_to_joinleague').onclick = function(e) {
		e.preventDefault();
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		leaguejoin.style.display = 'block';
	};

	document.getElementById('joinleague').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.league = document.getElementById('join_name').value;
		data.password = document.getElementById('join_pwd').value;
		document.dispatchEvent(new CustomEvent("joiningleague", {detail: data}));
	};

	document.getElementById('createleague').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.name = document.getElementById('league_name').value;
		data.password = document.getElementById('league_pwd').value;
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("creatingleague", {detail: data}));
	};

	document.getElementById('signout').onclick = function(e){
		e.preventDefault();
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
		var main = document.getElementById("main");
		main.style.display = 'block';
		document.dispatchEvent(new CustomEvent("signedout"));
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	document.getElementById('my_team').onclick = function(e){
		e.preventDefault();
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
		var teampage = document.getElementById("team_page");
		teampage.style.display = 'block';
		document.dispatchEvent(new CustomEvent("displayplayers"));
	};

	document.getElementById('add_players').onclick = function(e){
		e.preventDefault();
		//display a list of players which can be added
	};

	document.getElementById('my_league').onclick = function(e){
		//displays league page which shows all users in league
		//create new html for this and model and view
	};

	var view = {};
	//if error is raised
	view.error = function(data){
		document.getElementById('error').innerHTML = data;
	};
	//if there was a successful signin
	view.authenticated = function(){
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'block';
		var signin = document.getElementById("signin");
		signin.style.display = 'none';
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.usercreated = function(){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var signup = document.getElementById("signup");
		signup.style.display = 'none'; 
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.leaguejoined = function(){
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		leaguejoin.style.display = 'none';
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.leaguecreated = function(){
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'block';
		var leaguecreate = document.getElementById("leaguecreate");
		leaguecreate.style.display = 'none';
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data});
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.displayplayers = function(data){
		var goaliedisplay = document.getElementById("yourgoalie");
		var playerdisplay = document.getElementById("yourplayers")
		var goalie = data.G;
		goaliedisplay.innerHTML = "";
		var e = document.createElement("div");
		e.id = goalie.playerID;
		e.innerHTML = `<p>${goalie.LastName}${goalie.FirstName}${goalie.Position}
							${goalie.City}${goalie.Name}${goalie.Abbreviation}
							${goalie.Wins}${goalie.Losses}${goalie.GoalsAgainstAverage}
							${goalie.SavePercentage}${goalie.Shutouts}${goalie.Played}
							${goalie.Points}</p>`;
		goaliedisplay.prepend(e);
	};

	view.displayallplayers = function(data){
		var playerdisplay = document.getElementById("players");
		playerdisplay.innerHTML = "";
		data.forEach(function(player){
			var e = document.createElement("div");
			e.id = player.playerID;
			e.innerHTML = `<p>${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</p>`;
			display.prepend(e);
		});
	};

	view.displayallgoalies = function(){

	};
	return view;
}())