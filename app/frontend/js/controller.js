(function(model, view){
	document.addEventListener('credentialsSent', function(e){
		model.signin(e.detail);
	});

	document.addEventListener('error', function(e){
		view.error(e.detail);
	});

	document.addEventListener('signedin', function(e){
		view.authenticated();
	});

	document.addEventListener('signedup', function(e){
		view.usercreated();
	});

	document.addEventListener('usercreated', function(e){
		model.signup(e.detail);
	});

	document.addEventListener('joiningleague', function(e){
		model.joinleague(e.detail);
	});

	document.addEventListener('creatingleague', function(e){
		model.createleague(e.detail);
	});

	document.addEventListener('leaguejoined', function(e){
		view.leaguejoined(e.detail);
	});

	document.addEventListener('leaguecreated', function(e){
		view.leaguecreated(e.detail);
	});

	document.addEventListener('signedout', function(e)){
		model.signout(e.detail);
	});
}(model, view));