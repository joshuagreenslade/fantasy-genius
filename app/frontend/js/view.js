var view = (function() {
	"use strict";

	window.onload = function() {
		document.dispatchEvent(new CustomEvent("pageloaded"));
	}
	document.getElementById('to_signin').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'block';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Signin";
		document.getElementById('subtitle').innerHTML = "Signin to Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "block";
		document.getElementById("to_home").style.display = "block";
	}

	document.getElementById('to_signup').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'block';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Signup";
		document.getElementById('subtitle').innerHTML = "Signup for Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "block";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
	}

	document.getElementById('to_home').onclick = function(e) {
		document.dispatchEvent(new CustomEvent("pageloaded"));
	}
	//for signin button on main page
	document.getElementById('signin_page').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'block';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Signin";
		document.getElementById('subtitle').innerHTML = "Signin to Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "block";
		document.getElementById("to_home").style.display = "block";

	}

	document.getElementById('signup_page').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'block';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Signup";
		document.getElementById('subtitle').innerHTML = "Signup for Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "block";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
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
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguecreate = document.getElementById("leaguecreate");
		leaguecreate.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Create League";
		document.getElementById('subtitle').innerHTML = "Create a Fantasy League";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
	};

	document.getElementById('link_to_joinleague').onclick = function(e) {
		e.preventDefault();
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		leaguejoin.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Join League";
		document.getElementById('subtitle').innerHTML = "Join a Fantasy League";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
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
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		var main = document.getElementById("main");
		main.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home of FantasyGenius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "block";
		document.getElementById("signin_page").style.display = "block";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		document.dispatchEvent(new CustomEvent("signedout"));
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	document.getElementById('my_team').onclick = function(e){
		e.preventDefault();
		loadteam();
	};

	var loadteam = function(){
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'block';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "My Team";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "block";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		document.dispatchEvent(new CustomEvent("displayplayers"));
	};

	document.getElementById('my_league').onclick = function(e){
		e.preventDefault();
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "My League";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "block";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		var data = {};
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("getusers", {detail:data}));
	};

	document.getElementById("add_players").onclick = function(e){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Add Players to Your Team(click to add)";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayerstoadd", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoaliestoadd", {detail:data}));
	};

	var view = {};
	//if error is raised
	view.error = function(data){
		document.getElementById('error').innerHTML = data;
	};

	view.loadmain = function(){
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of FantasyGenius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "block";
		document.getElementById("signin_page").style.display = "block";
		document.getElementById("signout").style.display = "none";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "none";
		document.getElementById("my_league").style.display = "none";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.loadteam = function(){
		loadteam();
	};

	//if there was a successful signin
	view.authenticated = function(data){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";

		if((data.activeleague === null) || (data.activeleague === undefined)){
			document.getElementById("link_to_createleague").style.display = "block";
			document.getElementById("link_to_joinleague").style.display = "block";
			document.getElementById("my_team").style.display = "none";
			document.getElementById("my_league").style.display = "none";
			document.getElementById("add_players").style.display = "none";
		}
		else{
			document.getElementById("link_to_createleague").style.display = "none";
			document.getElementById("link_to_joinleague").style.display = "none";
			document.getElementById("my_team").style.display = "block";
			document.getElementById("my_league").style.display = "block";
			document.getElementById("add_players").style.display = "block";
		}


		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail: data}));
	};

	view.leaguejoined = function(){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "block";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	view.leaguecreated = function(){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "block";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};
	//displaying users after joining fails, trying to display team after joining displays admins team
	view.displayplayers = function(data){
		var goaliedisplay = document.getElementById("your_goalies");
		var playerdisplay = document.getElementById("your_players");
		var goalie = data.G;
		goaliedisplay.innerHTML = "";
		if(goalie !== null){
			var e = document.createElement("tr");
			e.id = goalie.playerID;
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td><td>${goalie.Position}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
		}
		playerdisplay.innerHTML = "";
		var players = data.forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
			}
		});
		players = data.defence;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
			}
		});
		players = data.bench_forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
			}
		});
		players = data.bench_defence;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
			}
		});
	};

	view.displayallplayers = function(data){
		var playerdisplay = document.getElementById("players");
		playerdisplay.innerHTML = "";
		data.forEach(function(player){
			var e = document.createElement("tr");
			e.id = player.playerID;
			e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
			playerdisplay.append(e);
		});
	};

	view.displayallgoalies = function(data){
		var goaliedisplay = document.getElementById("goalies");
		goaliedisplay.innerHTML = "";
		data.forEach(function(goalie){
			var e = document.createElement("tr");
			e.id = goalie.playerID;
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td><td>${goalie.Position}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
		});
	};

	view.displayallplayerstoadd = function(data){
		var playerdisplay = document.getElementById("players");
		playerdisplay.innerHTML = "";
		data.forEach(function(player){
			var e = document.createElement("tr");
			e.id = player.playerID;
			e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
			playerdisplay.append(e);
			e.onclick = function(e){
				e.preventDefault();
				var data = {};
				data.playerID = player.playerID;
				data.sport = 'nhl';
				document.dispatchEvent(new CustomEvent("addplayer", {detail:data}));
			};
		});
	};

	view.displayallgoaliestoadd = function(data){
		var goaliedisplay = document.getElementById("goalies");
		goaliedisplay.innerHTML = "";
		data.forEach(function(goalie){
			var e = document.createElement("tr");
			e.id = goalie.playerID;
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td><td>${goalie.Position}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
			e.onclick = function(e){
				e.preventDefault();
				var data = {};
				data.playerID = goalie.playerID;
				data.sport = 'nhl';
				document.dispatchEvent(new CustomEvent("addplayer", {detail:data}));
			};
		});
	};

	view.displayusers = function(data){
		var userdisplay = document.getElementById("leagueusers");
		userdisplay.innerHTML = "";
		data.forEach(function(user){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = user.owner;
			e.innerHTML = `<a href="#" class="list-group-item">${user.owner}</a>`;
			userdisplay.append(e);
			e.onclick = function(e){
				e.preventDefault();
				var main = document.getElementById("main");
				main.style.display = 'none';
				var leaguejoin = document.getElementById("leaguejoin");
				var leaguecreate = document.getElementById("leaguecreate");
				var signin = document.getElementById("signin");
				var signup = document.getElementById("signup");
				var teampage = document.getElementById("team_page")
				var leaguepage = document.getElementById("league_page");
				leaguecreate.style.display = 'none';
				leaguejoin.style.display = 'none';
				signin.style.display = 'none';
				signup.style.display = 'none';
				teampage.style.display = 'block';
				leaguepage.style.display = 'none';

				//set visibility of buttons and text
				document.getElementById('title').innerHTML = "FantasyGenius";
				document.getElementById('subtitle').innerHTML = user.owner + "'s team";
				document.getElementById("error").innerHTML = "";
				document.getElementById("signup_page").style.display = "none";
				document.getElementById("signin_page").style.display = "none";
				document.getElementById("signout").style.display = "block";
				document.getElementById("link_to_createleague").style.display = "none";
				document.getElementById("link_to_joinleague").style.display = "none";
				document.getElementById("my_team").style.display = "block";
				document.getElementById("my_league").style.display = "block";
				document.getElementById("add_players").style.display = "block";

				//set visibility of bottom buttons
				document.getElementById("to_signin").style.display = "none";
				document.getElementById("to_signup").style.display = "none";
				document.getElementById("to_home").style.display = "block";

				var data = {};
				data.username = user.owner;
				document.dispatchEvent(new CustomEvent("displayhisplayers", {detail:data}));
			};
		});
	};

	//remove players, add home buttons for pages
	return view;
}())