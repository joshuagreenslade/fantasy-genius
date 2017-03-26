var view = (function() {
	"use strict";

	var socket;
	var socketparam = null;
	var dataofplayertodisplayfortrade = null;
	var activetrader = null;
	window.onload = function() {
		socket = new WebSocket("wss://" + window.location.host)
		document.dispatchEvent(new CustomEvent("pageloaded"));
	}
	window.onunload = function(){
		socket.close();
	}
	document.getElementById('to_signin').onclick = function(e) {

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'block';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "block";
		document.getElementById("to_home").style.display = "block";
	}

	document.getElementById('to_signup').onclick = function(e) {

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "block";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
	}

	document.getElementById('to_home').onclick = function(e) {

		//reset the socket listener
		socket.onmessage = function(event){};

		document.dispatchEvent(new CustomEvent("pageloaded"));
	}
	//for signin button on main page
	document.getElementById('signin_page').onclick = function(e) {

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "block";
		document.getElementById("to_home").style.display = "block";
	};

	document.getElementById('signup_page').onclick = function(e) {

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
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
		document.getElementById('username').value = "";
		document.getElementById('pwd').value = "";
	};

	document.getElementById('signup_button').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.username = document.getElementById('signup_username').value;
		data.password = document.getElementById('signup_pwd').value;
		document.dispatchEvent(new CustomEvent("usercreated", {detail: data}));
		document.getElementById('signup_username').value = "";
		document.getElementById('signup_pwd').value = "";
	};

	document.getElementById('link_to_createleague').onclick = function(e) {
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
	};

	document.getElementById('link_to_joinleague').onclick = function(e) {
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
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
		document.getElementById('join_name').value = "";
		document.getElementById('join_pwd').value = "";
	};

	document.getElementById('createleague').onclick = function(e) {
		e.preventDefault();
		var data = {};
		data.name = document.getElementById('league_name').value;
		data.password = document.getElementById('league_pwd').value;
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("creatingleague", {detail: data}));
		document.getElementById('league_name').value = "";
		document.getElementById('league_pwd').value = "";
	};

	document.getElementById('signout').onclick = function(e){
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		document.dispatchEvent(new CustomEvent("signout"));
		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		document.dispatchEvent(new CustomEvent("getallplayers", {detail: data}));
		data.type = 'g';
		document.dispatchEvent(new CustomEvent("getallgoalies", {detail:data}));
	};

	document.getElementById('trade_players').onclick = function(e){
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'block';
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		var main = document.getElementById("main");
		main.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Choose A User to Trade With";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "block";
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "block";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";
		//dispatch event to show modified users page
		var data = {};
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("gettraders", {detail: data}));
	};

	document.getElementById('my_trades').onclick = function(e){
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'block';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
		var main = document.getElementById("main");
		main.style.display = 'none';

		//set visibility of buttons and text
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Here are your trades";
		document.getElementById("error").innerHTML = "";
		document.getElementById("signup_page").style.display = "none";
		document.getElementById("signin_page").style.display = "none";
		document.getElementById("signout").style.display = "block";
		document.getElementById("link_to_createleague").style.display = "none";
		document.getElementById("link_to_joinleague").style.display = "none";
		document.getElementById("my_team").style.display = "block";
		document.getElementById("my_league").style.display = "block";
		document.getElementById("add_players").style.display = "block";
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		//dispatch get trades event
		var data = {};
		document.dispatchEvent(new CustomEvent('gettrades', {detail:data}));
	};

	document.getElementById('my_team').onclick = function(e){
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

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
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		document.dispatchEvent(new CustomEvent("displayplayers"));
	};

	document.getElementById('my_league').onclick = function(e){
		e.preventDefault();

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'none';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';

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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		var data = {};
		data.sport = 'nhl';
		document.dispatchEvent(new CustomEvent("getusers", {detail:data}));
	};

	document.getElementById("add_players").onclick = function(e){

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
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

	document.getElementById('next_player').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		var players = document.getElementById('players').children
		data.id = players[players.length-1].id
		data.sort = 'increasing';
		document.dispatchEvent(new CustomEvent("getallplayersat", {detail: data}));
	};

	document.getElementById('prev_player').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		var players = document.getElementById('players').children
		data.id = players[0].id
		data.sort = 'decreasing';
		document.dispatchEvent(new CustomEvent("getallplayersat", {detail: data}));
	};

	document.getElementById('next_goalie').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 'g';
		var players = document.getElementById('goalies').children
		data.id = players[players.length-1].id
		data.sort = 'increasing';
		document.dispatchEvent(new CustomEvent("getallgoaliesat", {detail: data}));
	};

	document.getElementById('prev_goalie').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 'g';
		var players = document.getElementById('goalies').children
		data.id = players[0].id
		data.sort = 'decreasing';
		document.dispatchEvent(new CustomEvent("getallgoaliesat", {detail: data}));
	};

	document.getElementById('next_player_add').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		var players = document.getElementById('players').children
		data.id = players[players.length-1].id
		data.sort = 'increasing';
		document.dispatchEvent(new CustomEvent("getallplayerstoaddat", {detail: data}));
	};

	document.getElementById('prev_player_add').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 's';
		var players = document.getElementById('players').children
		data.id = players[0].id
		data.sort = 'decreasing';
		document.dispatchEvent(new CustomEvent("getallplayerstoaddat", {detail: data}));
	};

	document.getElementById('next_goalie_add').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 'g';
		var players = document.getElementById('goalies').children
		data.id = players[players.length-1].id
		data.sort = 'increasing';
		document.dispatchEvent(new CustomEvent("getallgoaliestoaddat", {detail: data}));
	};

	document.getElementById('prev_goalie_add').onclick = function(e){
		e.preventDefault();

		var data = {};
		data.sport = 'nhl';
		data.type = 'g';
		var players = document.getElementById('goalies').children
		data.id = players[0].id
		data.sort = 'decreasing';
		document.dispatchEvent(new CustomEvent("getallgoaliestoaddat", {detail: data}));
	};

	var view = {};
	//if error is raised
	view.error = function(data){
		document.getElementById('error').innerHTML = data;

		var main = document.getElementById("main");
		main.style.display = 'none';
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
		teampage.style.display = 'none';
		leaguepage.style.display = 'none';
	};

	view.loadmain = function(){

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "none";
		document.getElementById("my_trades").style.display = "none";
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

		socketparam = data.sport;
		socket.onmessage = function(event){
			if(event.data === (socketparam + " stats updated"))
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};
	};

	view.loadteam = function(){

		//reset the socket listener
		socket.onmessage = function(event){};

		loadteam();
	};

	//if there was a successful signin
	view.authenticated = function(data){

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
			document.getElementById("trade_players").style.display = "none";
			document.getElementById("my_trades").style.display = "none";
		}
		else{
			document.getElementById("link_to_createleague").style.display = "none";
			document.getElementById("link_to_joinleague").style.display = "none";
			document.getElementById("my_team").style.display = "block";
			document.getElementById("my_league").style.display = "block";
			document.getElementById("add_players").style.display = "block";
			document.getElementById("trade_players").style.display = "block";
			document.getElementById("my_trades").style.display = "block";
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

		socketparam = data.sport;
		socket.onmessage = function(event){
			if(event.data === (socketparam + " stats updated"))
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};
	};

	view.signedout = function(sport){
		socketparam = sport;
		socket.onmessage = function(event){
			if(event.data === (socketparam + " stats updated"))
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};
	};

	view.leaguejoined = function(){

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
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

		socketparam = data.sport;
		socket.onmessage = function(event){
			if(event.data === (socketparam + " stats updated"))
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};
	};

	view.leaguecreated = function(){

		//reset the socket listener
		socket.onmessage = function(event){};

		var main = document.getElementById("main");
		main.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var teampage = document.getElementById("team_page")
		var leaguepage = document.getElementById("league_page");
		var tradepage = document.getElementById("trade_page");
		var confirmpage = document.getElementById("tradeconfirm_page");
		var mytrades = document.getElementById("your_trades_page");
		mytrades.style.display = 'none';
		confirmpage.style.display = 'none';
		tradepage.style.display = 'none';
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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
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

		socketparam = data.sport;
		socket.onmessage = function(event){
			if(event.data === (socketparam + " stats updated"))
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};
	};
	//displaying users after joining fails, trying to display team after joining displays admins team
	view.displayplayers = function(data){
		socketparam = data;
		socket.onmessage = function(event){
			if(event.data === (socketparam.owner + "'s team updated")){
					var data = {username: socketparam.owner};
					document.dispatchEvent(new CustomEvent("displayhisplayers", {detail: data}));
			}
		};
		
		var goaliedisplay = document.getElementById("your_goalies");
		var playerdisplay = document.getElementById("your_players");
		var benchplayerdisplay = document.getElementById("your_bench_players");
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
			var removebutton = document.createElement('button');
			removebutton.classname = "btn btn-primary pull-right"
			removebutton.type = "button";
			removebutton.value = "Remove Player";
			removebutton.id = "removebutton";
			removebutton.onclick = function(e){
				e.preventDefault();
				var data = {};
				data.player = goalie.playerID;
				document.dispatchEvent(new CustomEvent("deleteplayer", {detail:data}));
			};
			e.append(removebutton);
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
				var removebutton = document.createElement('button');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
				removebutton.id = "removebutton";
				removebutton.onclick = function(e){
					e.preventDefault();
					var data = {};
					data.player = player.playerID;
					document.dispatchEvent(new CustomEvent("deleteplayer", {detail:data}));
				};
				e.append(removebutton);
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
				var removebutton = document.createElement('button');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
				removebutton.id = "removebutton";
				removebutton.onclick = function(e){
					e.preventDefault();
					var data = {};
					data.player = player.playerID;
					document.dispatchEvent(new CustomEvent("deleteplayer", {detail:data}));
				};
				e.append(removebutton);
			}
		});
		benchplayerdisplay.innerHTML = "";
		players = data.bench_forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				benchplayerdisplay.append(e);
				var removebutton = document.createElement('button');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
				removebutton.id = "removebutton";
				removebutton.onclick = function(e){
					e.preventDefault();
					var data = {};
					data.player = player.playerID;
					document.dispatchEvent(new CustomEvent("deleteplayer", {detail:data}));
				};
				e.append(removebutton);
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
				benchplayerdisplay.append(e);
				var removebutton = document.createElement('button');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
				removebutton.id = "removebutton";
				removebutton.onclick = function(e){
					e.preventDefault();
					var data = {};
					data.player = player.playerID;
					document.dispatchEvent(new CustomEvent("deleteplayer", {detail:data}));
				};
				e.append(removebutton);
			}
		});
	};

	view.displayplayerstotrade = function(data){
		socketparam = data;
		socket.onmessage = function(event){
			if(event.data === (socketparam.owner + "'s team updated")){
					var data = {username: socketparam.owner};
					document.dispatchEvent(new CustomEvent("displayhisplayers", {detail: data}));
			}
		};
		
		var goaliedisplay = document.getElementById("your_goalies");
		var playerdisplay = document.getElementById("your_players");
		var benchplayerdisplay = document.getElementById("your_bench_players");
		var goalie = data.G;
		var tradeassets = [];
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
			var checkbox = document.createElement('div');
			checkbox.classname = "checkbox";
			checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
			checkbox.onclick = function(e){
				if(checkbox.checked == false){
					checkbox.checked = true;
					tradeassets.push(goalie.playerID);
				};
				else{
					checkbox.checked = false;
					tradeassets.splice(tradeassets.indexOf(goalie.playerID), 1);
				};
			};
			e.append(checkbox);
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
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						tradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						tradeassets.splice(tradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
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
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						tradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						tradeassets.splice(tradeassets.indexOf(player.playerID), 1);
					};
				};  
				e.append(checkbox);
			}
		});
		benchplayerdisplay.innerHTML = "";
		players = data.bench_forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				benchplayerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						tradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						tradeassets.splice(tradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
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
				benchplayerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						tradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						tradeassets.splice(tradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
			}
		});
		var submit = document.createElement('button');
		submit.classname = "btn btn-primary pull-right"
		submit.type = "button";
		submit.value = "Submit";
		submit.id = "submit";
		submit.onclick = function(e){
			var data = {};
			data.players = tradeassets;
			document.dispatchEvent(new CustomEvent("getyourplayerstotrade", {detail:data}));
		};
		benchplayerdisplay.append(submit);
	};

	view.helper = function(data){
		if(data == null){
			return null;
		};
		else{
			dataofplayertodisplayfortrade = data;
		};
	};

	view.displayyourplayerstotrade = function(data){
		var usable = data[1];
		socketparam = usable;
		socket.onmessage = function(event){
			if(event.usable === (socketparam.owner + "'s team updated")){
					var usable = {username: socketparam.owner};
					document.dispatchEvent(new CustomEvent("displayhisplayers", {detail: usable}));
			}
		};
		
		var goaliedisplay = document.getElementById("your_goalies");
		var playerdisplay = document.getElementById("your_players");
		var benchplayerdisplay = document.getElementById("your_bench_players");
		var goalie = usable.G;
		var yourtradeassets = [];
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
			var checkbox = document.createElement('div');
			checkbox.classname = "checkbox";
			checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
			checkbox.onclick = function(e){
				if(checkbox.checked == false){
					checkbox.checked = true;
					yourtradeassets.push(goalie.playerID);
				};
				else{
					checkbox.checked = false;
					yourtradeassets.splice(yourtradeassets.indexOf(goalie.playerID), 1);
				};
			};
			e.append(checkbox);
		}
		playerdisplay.innerHTML = "";
		var players = usable.forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						yourtradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						yourtradeassets.splice(yourtradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
			}
		});
		players = usable.defence;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				playerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						yourtradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						yourtradeassets.splice(yourtradeassets.indexOf(player.playerID), 1);
					};
				};  
				e.append(checkbox);
			}
		});
		benchplayerdisplay.innerHTML = "";
		players = usable.bench_forward;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				benchplayerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						yourtradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						yourtradeassets.splice(yourtradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
			}
		});
		players = usable.bench_defence;
		players.forEach(function(player){
			if(player !== null){
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${player.LastName}</td><td>${player.FirstName}</td><td>${player.Position}</td>
								<td>${player.City}</td><td>${player.Name}</td><td>${player.Abbreviation}</td>
								<td>${player.Goals}</td><td>${player.Assists}</td><td>${player.Points}</td>
								<td>${player.PlusMinus}</td><td>${player.Played}</td><td>${player.points}</td>`;
				benchplayerdisplay.append(e);
				var checkbox = document.createElement('div');
				checkbox.classname = "checkbox";
				checkbox.innerHTML = `<label><input type="checkbox" value="">Trade Player</label>`;
				checkbox.onclick = function(e){
					if(checkbox.checked == false){
						checkbox.checked = true;
						yourtradeassets.push(player.playerID);
					};
					else{
						checkbox.checked = false;
						yourtradeassets.splice(yourtradeassets.indexOf(player.playerID), 1);
					};
				}; 
				e.append(checkbox);
			}
		});
		var submit = document.createElement('button');
		submit.classname = "btn btn-primary pull-right"
		submit.type = "button";
		submit.value = "Submit";
		submit.id = "submit";
		submit.onclick = function(e){
			var main = document.getElementById("main");
			main.style.display = 'none';
			var leaguejoin = document.getElementById("leaguejoin");
			var leaguecreate = document.getElementById("leaguecreate");
			var signin = document.getElementById("signin");
			var signup = document.getElementById("signup");
			var teampage = document.getElementById("team_page")
			var leaguepage = document.getElementById("league_page");
			var tradepage = document.getElementById("trade_page");
			var confirmpage = document.getElementById("tradeconfirm_page");
			var mytrades = document.getElementById("your_trades_page");
			mytrades.style.display = 'none';
			confirmpage.style.display = 'block';
			leaguecreate.style.display = 'none';
			leaguejoin.style.display = 'none';
			signin.style.display = 'none';
			signup.style.display = 'none';
			teampage.style.display = 'none';
			leaguepage.style.display = 'none';
			tradepage.style.display = 'none';
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
			document.getElementById("trade_players").style.display = "none";
			document.getElementById("my_trades").style.display = "none";
			//set visibility of bottom buttons
			document.getElementById("to_signin").style.display = "none";
			document.getElementById("to_signup").style.display = "none";
			document.getElementById("to_home").style.display = "none";
			//have lists of players now need to be displayed then confirm and delete need to be appended below
			var yourplayerdisplay = document.getElementById("sending");
			yourplayerdisplay.innerHTML = "";
			yourtradeassets.forEach(function(player){
				var info = {};
				info.sport = 'nhl';
				info.playerID = player.playerID;
				document.dispatchEvent(new CustomEvent("getplayer", {detail:info}));
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${dataofplayertodisplayfortrade.name}</td>`;
				yourplayerdisplay.append(e);
			});
			var theirplayerdisplay = document.getElementById("receiving");
			theirplayerdisplay.innerHTML = "";
			data[0].forEach(function(player){
				var info = {};
				info.sport = 'nhl';
				info.playerID = player.playerID;
				document.dispatchEvent(new CustomEvent("getplayer", {detail:info}));
				var e = document.createElement("tr");
				e.id = player.playerID;
				e.innerHTML = `<td>${dataofplayertodisplayfortrade.name}</td>`;
				theirplayerdisplay.append(e);
			});
			var confirm = document.createElement('button');
			confirm.classname = "btn btn-primary pull-left"
			confirm.type = "button";
			confirm.value = "Confirm";
			confirm.id = "confirm";
			confirm.onclick = function(e){
				//post a new trade then go to loadteam
				var info = {};
				info.reciever = activetrader;
				info.sender_players = yourtradeassets;
				info.reciever_players = data[0];
				document.dispatchEvent(new CustomEvent("maketrade", {detail:info}));
			};
			theirplayerdisplay.append(confirm);

			var decline = document.createElement('button');
			decline.classname = "btn btn-primary pull-right"
			decline.type = "button";
			decline.value = "Decline";
			decline.id = "decline";
			decline.onclick = function(e){
				loadteam();
			};
			theirplayerdisplay.append(decline);
		};
		benchplayerdisplay.append(submit);
	};
	//need function that gets trades and confirms or declines them
	view.displaytrades = function(data){
		var yourplayerstotrade = document.getElementById("yoursending");
		var yourplayerstorecieve = document.getElementById("yourreceiving");
		yourplayerstotrade.innerHTML = "";
		yourplayerstorecieve.innerHTML = "";
		data.forEach(function(trade){
			var e = document.createElement("table");
			e.classname = "table table-bordered table-responsive table-hover";
			e.innerHTML = `<thead><tr><th id="Name">Name</th></tr></thead><tbody>`;
			trade.sender_players.forEach(function(player){
				var tr = document.createElement("tr");
				tr.innerHTML = `<td>${player.name}</td>`;
				e.append(tr);
			};
			yourplayerstotrade.append(e);
			trade.reciever_players.forEach(function(player){
				var tr = document.createElement("tr");
				tr.innerHTML = `<td>${player.name}</td>`;
				e.append(tr);
			};
			yourplayerstorecieve.append(e);
			var confirm = document.createElement('button');
			confirm.classname = "btn btn-primary pull-left"
			confirm.type = "button";
			confirm.value = "Confirm";
			confirm.id = "confirm";
			confirm.onclick = function(e){
				var info = {};
				info.tradeID = trade.tradeID;
				document.dispatchEvent(new CustomEvent("completetrade", {detail:info}));
			};
			yourplayerstotrade.append(confirm);

			var decline = document.createElement('button');
			decline.classname = "btn btn-primary pull-right"
			decline.type = "button";
			decline.value = "Decline";
			decline.id = "decline";
			decline.onclick = function(e){
				var info = {};
				info.tradeID = trade.tradeID;
				document.dispatchEvent(new CustomEvent("deletetrade", {detail:info}));
			};
			yourplayerstorecieve.append(decline);
		};
	};
	view.displayallplayers = function(data){
		socket.onmessage = function(event){
			if(event.data === "nhl stats updated")
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};

		//show the correct next/prev buttons
		document.getElementById('next_player').style.display = 'inline';
		document.getElementById('next_player').style.visibility = 'hidden';
		document.getElementById('next_player_add').style.display = 'none';
		if(data.next)
			document.getElementById('next_player').style.visibility = 'visible';
		
		document.getElementById('prev_player').style.display = 'inline';
		document.getElementById('prev_player').style.visibility = 'hidden';
		document.getElementById('prev_player_add').style.display = 'none';
		if(data.prev)
			document.getElementById('prev_player').style.visibility = 'visible';

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
		socket.onmessage = function(event){
			if(event.data === "nhl stats updated")
				document.dispatchEvent(new CustomEvent("pageloaded"));
		};

		//show the correct next/prev buttons
		document.getElementById('next_goalie').style.display = 'inline';
		document.getElementById('next_goalie').style.visibility = 'hidden';
		document.getElementById('next_goalie_add').style.display = 'none';
		if(data.next)
			document.getElementById('next_goalie').style.visibility = 'visible';
		
		document.getElementById('prev_goalie').style.display = 'inline';
		document.getElementById('prev_goalie').style.visibility = 'hidden';
		document.getElementById('prev_goalie_add').style.display = 'none';
		if(data.prev)
			document.getElementById('prev_goalie').style.visibility = 'visible';

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
		socket.onmessage = function(event){
				if(event.data === ("nhl stats updated")){
					var data = {sport: 'nhl', type: 'g'};
					document.dispatchEvent(new CustomEvent("getallgoaliestoadd", {detail: data}));
					data.type = 's';
					document.dispatchEvent(new CustomEvent("getallplayerstoadd", {detail: data}));
				}
			};
		
		//show the correct next/prev buttons
		document.getElementById('next_player_add').style.display = 'inline';
		document.getElementById('next_player_add').style.visibility = 'hidden';
		document.getElementById('next_player').style.display = 'none';
		if(data.next)
			document.getElementById('next_player_add').style.visibility = 'visible';
		
		document.getElementById('prev_player_add').style.display = 'inline';
		document.getElementById('prev_player_add').style.visibility = 'hidden';
		document.getElementById('prev_player').style.display = 'none';
		if(data.prev)
			document.getElementById('prev_player_add').style.visibility = 'visible';

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
			var addbutton = document.createElement('button');
			addbutton.classname = "btn btn-primary pull-right"
			addbutton.type = "button";
			addbutton.value = "Add Player";
			addbutton.id = "addbutton";
			addbutton.onclick = function(e){
				e.preventDefault();
				var data = {};
				data.playerID = player.playerID;
				data.sport = 'nhl';
				document.dispatchEvent(new CustomEvent("addplayer", {detail:data}));
			};
			e.append(addbutton);
		});
	};

	view.displayallgoaliestoadd = function(data){
		socket.onmessage = function(event){
			if(event.data === ("nhl stats updated")){
				var data = {sport: 'nhl', type: 'g'};
				document.dispatchEvent(new CustomEvent("getallgoaliestoadd", {detail: data}));
				data.type = 's';
				document.dispatchEvent(new CustomEvent("getallplayerstoadd", {detail: data}));
			}
		};

		//show the correct next/prev buttons
		document.getElementById('next_goalie_add').style.display = 'inline';
		document.getElementById('next_goalie_add').style.visibility = 'hidden';
		document.getElementById('next_goalie').style.display = 'none';
		if(data.next)
			document.getElementById('next_goalie_add').style.visibility = 'visible';
		
		document.getElementById('prev_goalie_add').style.display = 'inline';
		document.getElementById('prev_goalie_add').style.visibility = 'hidden';
		document.getElementById('prev_goalie').style.display = 'none';
		if(data.prev)
			document.getElementById('prev_goalie_add').style.visibility = 'visible';


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
			var addbutton = document.createElement('button');
			addbutton.classname = "btn btn-primary pull-right"
			addbutton.type = "button";
			addbutton.value = "Add Player";
			addbutton.id = "addbutton";
			addbutton.onclick = function(e){
				e.preventDefault();
				var data = {};
				data.playerID = goalie.playerID;
				data.sport = 'nhl';
				document.dispatchEvent(new CustomEvent("addplayer", {detail:data}));
			};
			e.append(addbutton);
		});
	};

	view.displayusers = function(data){

		//reset the socket listener
		socket.onmessage = function(event){};

		var active = data.pop();
		var userdisplay = document.getElementById("users");
		userdisplay.innerHTML = "";
		data.forEach(function(user){
			var e = document.createElement("tr");
			e.classname = "list-group";
			e.id = user.owner;
			e.innerHTML = `<td>${user.owner}</td><td>${user.score}</td><td>${user.wins}</td>`;
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
				var tradepage = document.getElementById("trade_page");
				var confirmpage = document.getElementById("tradeconfirm_page");
				var mytrades = document.getElementById("your_trades_page");
				mytrades.style.display = 'none';
				confirmpage.style.display = 'none';
				tradepage.style.display = 'none';
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
				document.getElementById("trade_players").style.display = "block";
				document.getElementById("my_trades").style.display = "block";
				//set visibility of bottom buttons
				document.getElementById("to_signin").style.display = "none";
				document.getElementById("to_signup").style.display = "none";
				document.getElementById("to_home").style.display = "block";

				var data = {};
				data.username = user.owner;
				document.dispatchEvent(new CustomEvent("displayhisplayers", {detail:data}));
			};			
		});

		socketparam = active;
		socket.onmessage = function(event){
			if((event.data === (socketparam.sport + " stats updated")) || (event.data === ("new user added to " + socketparam.league))){
				document.dispatchEvent(new CustomEvent("getusers", {detail: socketparam}));
			}
		};
	};

	view.displaytraders = function(data){
		socket.onmessage = function(event){};

		var active = data.pop();
		var tradedisplay = document.getElementById("traders");
		tradedisplay.innerHTML = "";
		data.forEach(function(user){
			var e = document.createElement("tr");
			e.classname = "list-group";
			e.id = user.owner;
			e.innerHTML = `<td>${user.owner}</td><td>${user.score}</td><td>${user.wins}</td>`;
			tradedisplay.append(e);
			var submit = document.createElement('button');
			submit.classname = "btn btn-primary pull-right"
			submit.type = "button";
			submit.value = "Trade with Me";
			submit.id = "submit";
			submit.onclick = function(e){
				var data = {};
				data.username = user.owner;
				activetrader = user.owner;
				document.dispatchEvent(new CustomEvent("displayhisplayerstotrade", {detail:data}));
			};
			e.append(submit);		
		});
		socketparam = active;
		socket.onmessage = function(event){
			if((event.data === (socketparam.sport + " stats updated")) || (event.data === ("new user added to " + socketparam.league))){
				document.dispatchEvent(new CustomEvent("getusers", {detail: socketparam}));
			}
		};
	};

	//remove players, add home buttons for pages
	return view;
}())