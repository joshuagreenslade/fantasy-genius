var model = (function() {
	"use strict";

	var activeuser;
	var activeleague;

	var model = {};
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
					document.dispatchEvent(new CustomEvent("signedin"));
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
					document.dispatchEvent(new CustomEvent("signedup"));
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
					activeleague = JSON.parse(this.responseText).league;
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
					document.dispatchEvent(new CustomEvent("playersdisplayed", {detail: this.responseText}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};

	model.getallplayers = function(data){
		var method = "GET"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/sports/" + data.sport + "/players/type/" + data.type + "/"; // the full url http:// ...
		var body = null; // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					//CHANGE EVENT
					document.dispatchEvent(new CustomEvent("displayallplayers", {detail: this.responseText}));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.setRequestHeader('Content-Type', 'application/json');
		xhr.send(body);
	};
	return model;
}())