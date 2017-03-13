var view = (function() {
	"use strict";

	window.onload = function() {
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Join League";
		document.getElementById('subtitle').innerHTML = "Join a Fantasy League";
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
	}
	document.getElementById('to_signin').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'block';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

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
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'block';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

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
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Join League";
		document.getElementById('subtitle').innerHTML = "Join a Fantasy League";
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
	}
	//for signin button on main page
	document.getElementById('signin_page').onclick = function(e) {
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'block';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

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
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'block';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

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
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
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
		document.getElementById("to_home").style.display = "none";
	};

	document.getElementById('link_to_joinleague').onclick = function(e) {
		e.preventDefault();
		var main = document.getElementById("main");
		main.style.display = 'none';
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'none';
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
		document.getElementById("to_home").style.display = "none";
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
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';
		var main = document.getElementById("main");
		main.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Join League";
		document.getElementById('subtitle').innerHTML = "Join a Fantasy League";
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
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'block';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

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
		document.getElementById("to_home").style.display = "none";

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
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'block';
		addplayerspage.style.display = 'none';

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
		document.getElementById("to_home").style.display = "none";

		var data = {};
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("getusers", {detail:data}));
	};

	document.getElementById("add_players").onclick = function(e){
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'block';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Add Players to Your Team(click to add)";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "block";
		document.getElementById("link_to_joinleague").style.display = "block";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

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
	//if there was a successful signin
	view.authenticated = function(){
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'block';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "block";
		document.getElementById("link_to_joinleague").style.display = "block";
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

	view.usercreated = function(){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "Join League";
		document.getElementById('subtitle').innerHTML = "Join a Fantasy League";
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

	view.leaguejoined = function(){
		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'block';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "block";
		document.getElementById("link_to_joinleague").style.display = "block";
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
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var addplayerspage = document.getElementById("add_players_page");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'block';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		addplayerspage.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Home Page of Fantasy Genius";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "block";
		document.getElementById("link_to_joinleague").style.display = "block";
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

	view.displayplayers = function(data){
		var goaliedisplay = document.getElementById("yourgoalie");
		var playerdisplay = document.getElementById("yourplayers")
		var goalie = data.G;
		goaliedisplay.innerHTML = "";
		var e = document.createElement("div");
		e.id = goalie.playerID;
		e.classname = "list-group";
		e.innerHTML = `<a href="#" class="list_group_item">${goalie.LastName}${goalie.FirstName}${goalie.Position}
							${goalie.City}${goalie.Name}${goalie.Abbreviation}
							${goalie.Wins}${goalie.Losses}${goalie.GoalsAgainstAverage}
							${goalie.SavePercentage}${goalie.Shutouts}${goalie.Played}
							${goalie.points}</a>`;
		goaliedisplay.prepend(e);
		playerdisplay.innerHTML = "";
		var players = data.forwards;
		players.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
		});
		players = data.defence;
		players.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
		});
		players = data.bench_forward;
		players.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
		});
		players = data.bench_defence;
		players.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
		});
	};

	view.displayallplayers = function(data){
		var playerdisplay = document.getElementById("players");
		playerdisplay.innerHTML = "";
		data.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
		});
	};

	view.displayallgoalies = function(data){
		var goaliedisplay = document.getElementById("goalies");
		goaliedisplay.innerHTML = "";
		data.forEach(function(goalie){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = goalie.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${goalie.LastName}${goalie.FirstName}${goalie.Position}
							${goalie.City}${goalie.Name}${goalie.Abbreviation}
							${goalie.Wins}${goalie.Losses}${goalie.GoalsAgainstAverage}
							${goalie.SavePercentage}${goalie.Shutouts}${goalie.Played}
							${goalie.Points}</a>`;
			goaliedisplay.prepend(e);
		});
	};

	view.displayallplayerstoadd = function(data){
		var playerdisplay = document.getElementById("players");
		playerdisplay.innerHTML = "";
		data.forEach(function(player){
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = player.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${player.LastName}${player.FirstName}${player.Position}
							${player.City}${player.Name}${player.Abbreviation}
							${player.Goals}${player.Assists}${player.Points}
							${player.PlusMinus}${player.Played}${player.points}</a>`;
			playerdisplay.prepend(e);
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
			var e = document.createElement("div");
			e.classname = "list-group";
			e.id = goalie.playerID;
			e.innerHTML = `<a href="#" class="list-group-item">${goalie.LastName}${goalie.FirstName}${goalie.Position}
							${goalie.City}${goalie.Name}${goalie.Abbreviation}
							${goalie.Wins}${goalie.Losses}${goalie.GoalsAgainstAverage}
							${goalie.SavePercentage}${goalie.Shutouts}${goalie.Played}
							${goalie.Points}</a>`;
			goaliedisplay.prepend(e);
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
			e.id = user.username;
			e.innerHTML = `<a href="#" class="list-group-item">${user.username}</a>`;
			userdisplay.prepend(e);
			e.onclick = function(e){
				e.preventDefault();
				var main = document.getElementById("main");
				main.style.display = 'none';
				var leaguejoin = document.getElementById("leaguejoin");
				var leaguecreate = document.getElementById("leaguecreate");
				var signin = document.getElementById("signin");
				var signup = document.getElementById("signup");
				var authenticated = document.getElementById("authenticated");
				var teampage = document.getElementById("team_page")
				var leaguepage = document.getElementById("league_page");
				var addplayerspage = document.getElementById("add_players_page");
				leaguecreate.style.display = 'none';
				leaguejoin.style.display = 'none';
				signin.style.display = 'none';
				signup.style.display = 'none';
				authenticated.style.display = 'none';
				teampage.style.display = 'block';
				leaguepage.style.display = 'none';
				addplayerspage.style.display = 'none';

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
				document.getElementById("to_home").style.display = "none";

				var data = {};
				data.username = user.username;
				document.dispatchEvent(new CustomEvent("displayhisplayers", {detail:data}));
			};
		});
	};

	//remove players, add home buttons for pages
	return view;
}())