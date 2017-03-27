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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		document.dispatchEvent(new CustomEvent("signout"));

		reset_sort();
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById("trade_players").style.display = "block";
		document.getElementById("my_trades").style.display = "block";
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";

		reset_add_sort();
	};

	var next_player = function(event, type, element){
		var data = {};
		data.sport = 'nhl';
		data.type = type;
		var players = document.getElementById(element).children
		data.id = players[players.length-1].id;

		//gets the attribute that is being sorted by
		get_titles(type).forEach(function(title){
			if(title && (title.style.display !== 'none')){

				data.sortField = title.id.split('_')[1];
				if(title.id.includes('Lastname'))
					data.sortField = 'LastName';
				if(title.id.includes('Firstname'))
					data.sortField = 'FirstName';
				else if(title.id.includes('GAA'))
					data.sortField = 'GoalsAgainstAverage';
				
				data.sort = 'decreasing';
				if(title.className === "down_arrow")
					data.sort = 'increasing';
			}
		});

		document.dispatchEvent(new CustomEvent(event, {detail: data}));
	};

	var prev_player = function(event, type, element){
		var data = {};
		data.sport = 'nhl';
		data.type = type;
		var players = document.getElementById(element).children
		data.id = players[0].id;

		//gets the attribute that is being sorted by
		get_titles(type).forEach(function(title){
			if(title && (title.style.display !== 'none')){

				data.sortField = title.id.split('_')[1];
				if(title.id.includes('Lastname'))
					data.sortField = 'LastName';
				if(title.id.includes('Firstname'))
					data.sortField = 'FirstName';
				else if(title.id.includes('GAA'))
					data.sortField = 'GoalsAgainstAverage';
				
				data.sort = 'increasing';
				data.flip = true;
				if(title.className === "down_arrow")
					data.sort = 'decreasing';
			}
		});

		document.dispatchEvent(new CustomEvent(event, {detail: data}));
	};

	document.getElementById('next_player').onclick = function(e){
		e.preventDefault();
		next_player("getallplayersat", "s", "players");
	};

	document.getElementById('prev_player').onclick = function(e){
		e.preventDefault();
		prev_player("getallplayersat", "s", "players");
	};

	document.getElementById('next_goalie').onclick = function(e){
		e.preventDefault();
		next_player("getallgoaliesat", "g", "goalies");
	};

	document.getElementById('prev_goalie').onclick = function(e){
		e.preventDefault();
		prev_player("getallgoaliesat", "g", "goalies");
	};

	document.getElementById('next_player_add').onclick = function(e){
		e.preventDefault();
		next_player("getallplayerstoaddat", "s", "players");
	};

	document.getElementById('prev_player_add').onclick = function(e){
		e.preventDefault();
		prev_player("getallplayerstoaddat", "s", "players");
	};

	document.getElementById('next_goalie_add').onclick = function(e){
		e.preventDefault();
		next_player("getallgoaliestoaddat", "g", "goalies");
	};

	document.getElementById('prev_goalie_add').onclick = function(e){
		e.preventDefault();
		prev_player("getallgoaliestoaddat", "g", "goalies");
	};

	var get_titles = function(type){
		var attributes = "player_attributes";
		if(type === 'g')
			attributes = "goalie_attributes";

		//get the attribute titles
		var titles = Array.prototype.slice.call(document.getElementById(attributes).children);
		return titles.map(function(title){if(title.children[0]) return title.children[0].children[0]});
	}

	var reset_sort = function(){
		document.getElementById("player_Lastname_sort").className = "up_arrow";
		document.getElementById("goalie_Lastname_sort").className = "up_arrow";
		sort_player("getallplayers", 'player_Lastname_sort', 'LastName', 's');
		sort_player("getallgoalies", 'goalie_Lastname_sort', 'LastName', 'g');
	};

	var reset_add_sort = function(){
		document.getElementById("player_Lastname_sort").className = "up_arrow";
		document.getElementById("goalie_Lastname_sort").className = "up_arrow";
		sort_player("getallplayerstoadd", 'player_Lastname_sort', 'LastName', 's');
		sort_player("getallgoaliestoadd", 'goalie_Lastname_sort', 'LastName', 'g');
	};

	var sort_player = function(event, curr_attribute, attributeName, type){
		document.getElementById(curr_attribute).style.display = "flex";

		//reset all other attributes
		get_titles(type).forEach(function(attribute){
			if(attribute){
				if(attribute.id !== curr_attribute){
					document.getElementById(attribute.id).style.display = "none";
					document.getElementById(attribute.id).className = "up_arrow";
				}
			}
		});

		var data = {};
		data.sport = 'nhl';
		data.type = type;
		data.sortField = attributeName;
		if(document.getElementById(curr_attribute).className === "down_arrow"){
			document.getElementById(curr_attribute).className = "up_arrow";
			data.sort = "decreasing";
		}
		else{
			document.getElementById(curr_attribute).className = "down_arrow";
			data.sort = "increasing";
		}
		document.dispatchEvent(new CustomEvent(event, {detail: data}));
	};


	//player sorts
	document.getElementById('player_Lastname_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Lastname_sort', 'LastName', 's');
	};

	document.getElementById('player_Firstname_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Firstname_sort', 'FirstName', 's');
	};

	document.getElementById('player_Position_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Position_sort', 'Position', 's');
	};

	document.getElementById('player_City_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_City_sort', 'City', 's');
	};

	document.getElementById('player_Name_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Name_sort', 'Name', 's');
	};

	document.getElementById('player_Abbreviation_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Abbreviation_sort', 'Abbreviation', 's');
	};

	document.getElementById('player_Goals_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Goals_sort', 'Goals', 's');
	};

	document.getElementById('player_Assists_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Assists_sort', 'Assists', 's');
	};

	document.getElementById('player_Points_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Points_sort', 'Points', 's');
	};

	document.getElementById('player_PlusMinus_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_PlusMinus_sort', 'PlusMinus', 's');
	};

	document.getElementById('player_Played_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_Played_sort', 'Played', 's');
	};

	document.getElementById('player_points_button').onclick = function(){
		var event = "getallplayers";
		if(document.getElementById('next_player_add').style.display !== "none")
			event = "getallplayerstoadd";
		sort_player(event, 'player_points_sort', 'points', 's');
	};


	//goalie sorts
	document.getElementById('goalie_Lastname_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Lastname_sort', 'LastName', 'g');
	};

	document.getElementById('goalie_Firstname_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Firstname_sort', 'FirstName', 'g');
	};

	document.getElementById('goalie_City_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_City_sort', 'City', 'g');
	};

	document.getElementById('goalie_Name_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Name_sort', 'Name', 'g');
	};

	document.getElementById('goalie_Abbreviation_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Abbreviation_sort', 'Abbreviation', 'g');
	};

	document.getElementById('goalie_Wins_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Wins_sort', 'Wins', 'g');
	};

	document.getElementById('goalie_Losses_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Losses_sort', 'Losses', 'g');
	};

	document.getElementById('goalie_GAA_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_GAA_sort', 'GoalsAgainstAverage', 'g');
	};

	document.getElementById('goalie_SavePercentage_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_SavePercentage_sort', 'SavePercentage', 'g');
	};

	document.getElementById('goalie_Shutouts_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Shutouts_sort', 'Shutouts', 'g');
	};

	document.getElementById('goalie_Played_button').onclick = function(){
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_Played_sort', 'Played', 'g');
	};

	document.getElementById('goalie_points_button').onclick = function(e){
		e.preventDefault();
		var event = "getallgoalies";
		if(document.getElementById('next_goalie_add').style.display !== "none")
			event = "getallgoaliestoadd";
		sort_player(event, 'goalie_points_sort', 'points', 'g');
	};


	var view = {};
	//if error is raised
	view.error = function(data){
		document.getElementById('error').innerHTML = data;

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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";
		
		reset_sort();

		socketparam = 'nhl';
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		reset_sort();

		socketparam = 'nhl';
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";
		
		reset_sort();

		socketparam = 'nhl';
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";
		document.getElementById('confirmTrade').style.display = "none";
		document.getElementById('rejectTrade').style.display = "none";
		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "none";

		reset_sort();

		socketparam = 'nhl';
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
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
			var removebutton = document.createElement('input');
			removebutton.classname = "btn btn-primary pull-right"
			removebutton.type = "button";
			removebutton.value = "Remove Player";
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
				var removebutton = document.createElement('input');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
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
				var removebutton = document.createElement('input');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
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
				var removebutton = document.createElement('input');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
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
				var removebutton = document.createElement('input');
				removebutton.classname = "btn btn-primary pull-right"
				removebutton.type = "button";
				removebutton.value = "Remove Player";
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
		var i = 0;

		var goaliedisplay = document.getElementById("your_goalies");
		var playerdisplay = document.getElementById("your_players");
		var benchplayerdisplay = document.getElementById("your_bench_players");
		var goalie = data.G;
		var tradeassets = [];
		goaliedisplay.innerHTML = "";
		if(goalie !== null){
			var e = document.createElement("tr");
			e.id = goalie.playerID;
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
			var checkbox = document.createElement('div');
			checkbox.classname = "checkbox";
			checkbox.innerHTML = `<label><input type="checkbox" value="" id=otherCheckbox${i}>Trade Player</label>`;
			i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=otherCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=otherCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=otherCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=otherCheckbox${i}>Trade Player</label>`;
				i++;
				e.append(checkbox);
				
			}
		});
		var submit = document.getElementById('my_players');
		submit.style.display = "inline";
		submit.onclick = function(e){
			for(var j=0; j<i; j++){
				var checkbox = document.getElementById("otherCheckbox" + j);
				if(checkbox.checked)
					tradeassets.push(checkbox.parentNode.parentNode.parentNode.id);
			}
			var data = {};
			data.players = tradeassets;
			document.dispatchEvent(new CustomEvent("getyourplayerstotrade", {detail:data}));
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
		var i = 0;
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
			checkbox.innerHTML = `<label><input type="checkbox" value="" id=myCheckbox${i}>Trade Player</label>`;
			i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=myCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=myCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=myCheckbox${i}>Trade Player</label>`;
				i++;
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
				checkbox.innerHTML = `<label><input type="checkbox" value="" id=myCheckbox${i}>Trade Player</label>`;
				i++;
				e.append(checkbox);
			}
		});
		var submit = document.getElementById('submit_trade');
		submit.style.display = "inline";
		document.getElementById('my_players').style.display = "none";

		submit.onclick = function(e){
			for(var j=0; j<i; j++){
				var checkbox = document.getElementById("myCheckbox" + j);
				if(checkbox.checked)
					yourtradeassets.push(checkbox.parentNode.parentNode.parentNode.id);
			}
			var all_players = {sender_players: yourtradeassets, reciever_players: data[0]}
			document.dispatchEvent(new CustomEvent("getplayers", {detail: all_players}));
		};
	};


	view.displaySampleTrade = function(data){
		var yourtradeassets = data.sender_players;
		var theirtradeassets = data.reciever_players;

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
		document.getElementById('title').innerHTML = "FantasyGenius";
		document.getElementById('subtitle').innerHTML = "Trade Confirmation";
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
		document.getElementById('my_players').style.display = "none";
		document.getElementById('submit_trade').style.display = "none";

		//set visibility of bottom buttons
		document.getElementById("to_signin").style.display = "none";
		document.getElementById("to_signup").style.display = "none";
		document.getElementById("to_home").style.display = "block";
		//have lists of players now need to be displayed then confirm and delete need to be appended below
		var yourplayerdisplay = document.getElementById("sending");
		yourplayerdisplay.innerHTML = "";

		yourtradeassets.forEach(function(player){
			var e = document.createElement("tr");
			e.id = player.playerID;
			e.innerHTML = `<td>${player.FirstName + " " +player.LastName}</td>`;
			yourplayerdisplay.append(e);
		});
		var theirplayerdisplay = document.getElementById("receiving");
		theirplayerdisplay.innerHTML = "";
		theirtradeassets.forEach(function(player){
			var e = document.createElement("tr");
			e.id = player.playerID;
			e.innerHTML = `<td>${player.FirstName + " " + player.LastName}</td>`;
			theirplayerdisplay.append(e);
		});
		var confirm = document.getElementById('confirmTrade');
		confirm.style.display = "inline";
		
		confirm.onclick = function(e){
			//post a new trade then go to loadteam

			var info = {};
			info.reciever = activetrader;
			info.sender_players = yourtradeassets.map(function(player){return player.playerID});
			info.reciever_players = theirtradeassets.map(function(player){return player.playerID});
			document.dispatchEvent(new CustomEvent("maketrade", {detail:info}));
		};

		var decline = document.getElementById('rejectTrade');
		decline.style.display = "inline";
		decline.onclick = function(e){
			loadteam();
		};
	};

	//need function that gets trades and confirms or declines them
	view.displaytrades = function(data){
		var yourplayerstotrade = document.getElementById("yoursending");
		var yourplayerstorecieve = document.getElementById("yourreceiving");
		yourplayerstotrade.innerHTML = "";
		yourplayerstorecieve.innerHTML = "";
		var activeuser = data.pop();
		data.forEach(function(trade){
			var e = document.createElement("table");
			e.classname = "table table-bordered table-responsive table-hover";
			e.innerHTML = `<thead><tr><th></th><th id="Name">Name</th></tr></thead><tbody>`;
			trade.sender_players.forEach(function(player){
				var tr = document.createElement("tr");
				tr.innerHTML = `<td>Traded to ${trade.reciever}:</td><td>${player.FirstName + " " + player.LastName}</td>`;
				e.append(tr);
			});
			yourplayerstotrade.append(e);
			trade.reciever_players.forEach(function(player){
				var tr = document.createElement("tr");
				tr.innerHTML = `<td>Traded to ${trade.sender}:</td><td>${player.FirstName + " " + player.LastName}</td>`;
				e.append(tr);
			});
			yourplayerstorecieve.append(e);
			if(activeuser === trade.reciever){
				var confirm = document.createElement('input');
				confirm.classname = "btn btn-primary pull-left"
				confirm.type = "button";
				confirm.value = "Confirm";
				confirm.id = trade._id + "confirm";
				confirm.onclick = function(e){
					var info = {};
					info.tradeID = trade._id;
					document.dispatchEvent(new CustomEvent("completetrade", {detail:info}));
				};
				/*yourplayerstotrade*/yourplayerstorecieve.append(confirm);
			}

			var decline = document.createElement('input');
			decline.classname = "btn btn-primary pull-right"
			decline.type = "button";
			decline.value = "Decline";
			decline.id = trade._id + "decline";
			decline.onclick = function(e){
				var info = {};
				info.tradeID = trade._id;
				document.dispatchEvent(new CustomEvent("deletetrade", {detail:info}));
			};
			yourplayerstorecieve.append(decline);
		});
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
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
		});
	};

	view.displayallplayerstoadd = function(data){
		socket.onmessage = function(event){
			if(event.data === ("nhl stats updated"))
				reset_add_sort();
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
			var addbutton = document.createElement('input');
			addbutton.classname = "btn btn-primary pull-right"
			addbutton.type = "button";
			addbutton.value = "Add Player";
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
			if(event.data === ("nhl stats updated"))
				reset_add_sort();
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
			e.innerHTML = `<td>${goalie.LastName}</td><td>${goalie.FirstName}</td>
								<td>${goalie.City}</td><td>${goalie.Name}</td><td>${goalie.Abbreviation}</td>
								<td>${goalie.Wins}</td><td>${goalie.Losses}</td><td>${goalie.GoalsAgainstAverage}</td>
								<td>${goalie.SavePercentage}</td><td>${goalie.Shutouts}</td><td>${goalie.Played}</td>
								<td>${goalie.points}</td>`;
			goaliedisplay.append(e);
			var addbutton = document.createElement('input');
			addbutton.classname = "btn btn-primary pull-right"
			addbutton.type = "button";
			addbutton.value = "Add Player";
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
				document.getElementById('confirmTrade').style.display = "none";
				document.getElementById('rejectTrade').style.display = "none";
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
			if(active.user !== user.owner){
				var e = document.createElement("tr");
				e.classname = "list-group";
				e.id = user.owner;
				e.innerHTML = `<td>${user.owner}</td><td>${user.score}</td><td>${user.wins}</td>`;
				tradedisplay.append(e);
				var submit = document.createElement('input');
				submit.classname = "btn btn-primary pull-right"
				submit.type = "button";
				submit.value = "Trade with Me";
				submit.id = "submit";
				submit.onclick = function(e){
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
					document.getElementById('confirmTrade').style.display = "none";
					document.getElementById('rejectTrade').style.display = "none";
					//set visibility of bottom buttons
					document.getElementById("to_signin").style.display = "none";
					document.getElementById("to_signup").style.display = "none";
					document.getElementById("to_home").style.display = "block";
					var data = {};
					data.username = user.owner;
					activetrader = user.owner;
					document.dispatchEvent(new CustomEvent("displayhisplayerstotrade", {detail:data}));
				};
				e.append(submit);
			}
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