var model = (function() {
	"use strict";

	var activeuser;

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
		xhr.send(body);
	};
	return model;
}())