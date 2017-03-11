var model = (function() {
	"use strict";

	var activeuser;

	var model = {};
	model.signin = function(data) {
		console.log("here");
		var method = "POST"; // either POST, PUT, GET, PATCH, DELETE
		var url = "/api/signin/"; // the full url http:// ...
		var body = JSON.stringify(data); // should be set to null for GET and DELETE
		var xhr = new XMLHttpRequest();
		body.append('username', data.username);
		body.append('password', data.password);
		xhr.onreadystatechange = function() {
			if (this.readyState === XMLHttpRequest.DONE) {
				if (this.status >= 400) {
					console.log("here");
					document.dispatchEvent(new CustomEvent("error", {detail: this.responseText}));
					return;
				} else {
					console.log("there");
					activeuser = JSON.parse(this.responseText).username;
					document.dispatchEvent(new CustomEvent("signedin"));
				}
			}
		};
		xhr.open(method, url, true);
		xhr.send(body);
	};
	return model;
}())