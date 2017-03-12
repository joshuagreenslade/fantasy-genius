var view = (function() {
	"use strict";

	window.onload = function() {
		var leaguejoin = document.getElementById("leaguejoin");
		var leaguecreate = document.getElementById("leaguecreate");
		var signin = document.getElementById("signin");
		var signup = document.getElementById("signup");
		var authenticated = document.getElementById("authenticated");
		leaguecreate.style.display = 'none';
		leaguejoin.style.display = 'none';
		signin.style.display = 'none';
		signup.style.display = 'none';
		authenticated.style.display = 'none';
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
	};

	view.usercreated = function(){
		var main = document.getElementById("main");
		main.style.display = 'block';
		var signup = document.getElementById("signup");
		signup.style.display = 'none'; 
	};

	view.leaguejoined = function(){
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'block';
		var leaguejoin = document.getElementById("leaguejoin");
		leaguejoin.style.display = 'none';
	};

	view.leaguecreated = function(){
		var authenticated = document.getElementById("authenticated");
		authenticated.style.display = 'block';
		var leaguecreate = document.getElementById("leaguecreate");
		leaguecreate.style.display = 'none';
	}

	return view;
}())