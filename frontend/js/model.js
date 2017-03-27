var model = (function() {
	"use strict";

	var activeuser;
	var activeleague;
	var activesport

	var model = {};
	model.pageloaded = function(){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/currentUser/"; // the full url http:// ...
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
    			if(JSON.parse(this.responseText) === null){
    				activeuser = null;
					activeleague = null;
					document.dispatchEvent(new CustomEvent("loadmain"));
    			}
    			else{
        			activeuser = JSON.parse(this.responseText).username;
					activeleague = JSON.parse(this.responseText).nhl_league;
					activesport = 'nhl';
					if(activeleague === null){
						//try another sport
					}
					var data = {activeuser: activeuser, activeleague: activeleague, activesport: activesport};
	            	document.dispatchEvent(new CustomEvent("signedin", {detail: data}));
	            }
        	}
    	};
		xhr.open(method, url, true);
		xhr.send(null);
	};

	model.signin = function(data) {
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/signin/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					activeuser = JSON.parse(this.responseText).username;
					activeleague = JSON.parse(this.responseText).nhl_league;
					activesport = 'nhl';
					if(activeleague === null){
						//try another sport
					}
					var data = {activeuser: activeuser, activeleague: activeleague, activesport: activesport};
					document.dispatchEvent(new CustomEvent("signedin", {detail: data}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.signup = function(data) {
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					activeuser = JSON.parse(this.responseText).username;
					activeleague = JSON.parse(this.responseText).nhl_league;
					activesport = 'nhl';
					if(activeleague === null){
						//try another sport
					}
					var data = {activeuser: activeuser, activeleague: activeleague, activesport: activesport};
					document.dispatchEvent(new CustomEvent("signedin", {detail: data}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.signout = function(){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/signout/"; // the full url http:// ...
		var body = null;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				}
				else{
					activeuser = null;
					activeleague = null;
					document.dispatchEvent(new CustomEvent("signedout", {detail: activesport}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.joinleague = function(data) {
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/" + data.league + "/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					activeleague = JSON.parse(this.responseText).name;
					document.dispatchEvent(new CustomEvent("leaguejoined"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.createleague = function(data) {
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					activeleague = JSON.parse(this.responseText).name;
					document.dispatchEvent(new CustomEvent("leaguecreated"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.addplayer = function(data){
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + activeuser + "/sports/" + data.sport + "/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				}
				else{
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.maketrade = function(data){
		data.sender = activeuser;
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/" + activeleague + "/trades/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				}
				else{
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.completetrade = function(data){
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/" + activeleague + "/trades/" + data.tradeID + "/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				}
				else{
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};
	
	model.displayplayers = function() {
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + activeuser + "/leagues/" + activeleague + "/team/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var result = JSON.parse(this.responseText);
					result.activeuser = activeuser;
					document.dispatchEvent(new CustomEvent("playersdisplayed", {detail: result}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.displayyourplayerstotrade = function(data) {
		//need to also send back list of players
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + activeuser + "/leagues/" + activeleague + "/team/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent("displayyourplayerstotrade", {detail: [data.players, JSON.parse(this.responseText)]}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.displayhisplayers = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + data.username + "/leagues/" + activeleague + "/team/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent("playersdisplayed", {detail: JSON.parse(this.responseText)}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.displayhisplayerstotrade = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + data.username + "/leagues/" + activeleague + "/team/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent("playersdisplayedtotrade", {detail: JSON.parse(this.responseText)}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	var getallplayers = function(event, data){
		var sort = "";
		var sortField = "";
		if(data.sort !== undefined)
			sort = "&sort=" + data.sort;

		if(data.sortField !== undefined)
			sortField = "&sortField=" + data.sortField;

		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/sports/" + data.sport + "/players/type/" + data.type + "/?limit=11" + sort + sortField; // the full url http:// ...
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var players = JSON.parse(this.responseText);
					players.next = false;
					players.prev = false;
					if(players.length === 11){
						players.pop();
						players.next = true;
					}
					document.dispatchEvent(new CustomEvent(event, {detail: players}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.send(null);
	};

	var getallplayersat = function(event, data){
		var sort = "";
		var sortField = "";
		if(data.sort !== undefined)
			sort = "&sort=" + data.sort;

		if(data.sortField !== undefined)
			sortField = "&sortField=" + data.sortField;

		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE	
		var url = "/api/sports/" + data.sport + "/players/type/" + data.type + "/?limit=12&firstPlayer=" + data.id + sort + sortField;
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var players = JSON.parse(this.responseText);
					if(players.length === 1)
						return;
					
					players.next = false;
					players.prev = true;
					players.splice(0,1);
					if(players.length === 11){
						players.pop();
						players.next = true;
					}
					if(data.flip){
						players.reverse();
						var temp = players.next;
						players.next = players.prev;
						players.prev = temp;
					}
					document.dispatchEvent(new CustomEvent(event, {detail: players}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.send(null);
	};

	model.getallplayers = function(data){
		getallplayers("displayallplayers", data);
	};

	model.getallplayersat = function(data){
		getallplayersat("displayallplayers", data);
	};

	model.getallgoalies = function(data){
		getallplayers("displayallgoalies", data);
	};

	model.getallgoaliesat = function(data){
		getallplayersat("displayallgoalies", data);
	};

	model.getallplayerstoadd = function(data){
		getallplayers("displayallplayerstoadd", data);
	};

	model.getallgoaliestoadd = function(data){
		getallplayers("displayallgoaliestoadd", data);
	};

	model.getallplayerstoaddat = function(data){
		getallplayersat("displayallplayerstoadd", data);
	};

	model.getallgoaliestoaddat = function(data){
		getallplayersat("displayallgoaliestoadd", data);
	};

	model.getusers = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/sports/" + data.sport + "/leagues/" + activeleague + "/teams/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var teams = JSON.parse(this.responseText)
					teams[teams.length] = {sport: activesport, league: activeleague};
					document.dispatchEvent(new CustomEvent("displayusers", {detail: teams}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.getuserstotrade = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/sports/" + data.sport + "/leagues/" + activeleague + "/teams/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var teams = JSON.parse(this.responseText)
					teams[teams.length] = {sport: activesport, league: activeleague};
					document.dispatchEvent(new CustomEvent("displaytraders", {detail: teams}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.getplayers = function(data){
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/sports/" + activesport + "/trades/"; // the full url http:// ...
		var body = JSON.stringify(data);
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent(/*"helper"*/"displaySampleTrade", {detail: JSON.parse(this.responseText)}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.gettrades = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/" + activeleague + "/users/" + activeuser + "/trades/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					var result = JSON.parse(this.responseText);
					result[result.length] = activeuser
					document.dispatchEvent(new CustomEvent("displaytrades", {detail: result}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.moveplayer = function(data){
		var method = "PATCH"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + activeuser + "/sports/" + activesport + "/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				}
				else{
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.deleteplayers = function(data){
		var method = "DELETE"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/users/" + activeuser + "/sports/" + activesport + "/players/" + data.player + "/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.deletetrade = function(data){
		var method = "DELETE"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/leagues/" + activeleague + "/trades/" + data.tradeID + "/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					document.dispatchEvent(new CustomEvent("loadteam"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};
	return model;
}())