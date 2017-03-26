(function(model, view){
	document.addEventListener('pageloaded', function(e){
		model.pageloaded();
	});

	document.addEventListener('loadmain', function(e){
		view.loadmain();
	});
	
	document.addEventListener('loadteam', function(e){
		view.loadteam();
	});

	document.addEventListener('credentialsSent', function(e){
		model.signin(e.detail);
	});

	document.addEventListener('error', function(e){
		view.error(e.detail);
	});

	document.addEventListener('signedin', function(e){
		view.authenticated(e.detail);
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

	document.addEventListener('signout', function(e){
		model.signout(e.detail);
	});

	document.addEventListener('signedout', function(e){
		view.signedout(e.detail);
	});

	document.addEventListener('displayplayers', function(e){
		model.displayplayers();
	});

	document.addEventListener('playersdisplayed', function(e){
		view.displayplayers(e.detail);
	});

	document.addEventListener('getallplayers', function(e){
		model.getallplayers(e.detail);
	});

	document.addEventListener('getallgoalies', function(e){
		model.getallgoalies(e.detail);
	});

	document.addEventListener('displayallplayers', function(e){
		view.displayallplayers(e.detail);
	});

	document.addEventListener('getallplayersat', function(e){
		model.getallplayersat(e.detail);
	});

	document.addEventListener('getallgoaliesat', function(e){
		model.getallgoaliesat(e.detail);
	});

	document.addEventListener('getallplayerstoaddat', function(e){
		model.getallplayerstoaddat(e.detail);
	});

	document.addEventListener('getallgoaliestoaddat', function(e){
		model.getallgoaliestoaddat(e.detail);
	});

	document.addEventListener('displayallgoalies', function(e){
		view.displayallgoalies(e.detail);
	});

	document.addEventListener('getusers', function(e){
		model.getusers(e.detail);
	});

	document.addEventListener('displayusers', function(e){
		view.displayusers(e.detail);
	});

	document.addEventListener('displayhisplayers', function(e){
		model.displayhisplayers(e.detail);
	});

	document.addEventListener('getallplayerstoadd', function(e){
		model.getallplayerstoadd(e.detail);
	});

	document.addEventListener('getallgoaliestoadd', function(e){
		model.getallgoaliestoadd(e.detail);
	});

	document.addEventListener('displayallplayerstoadd', function(e){
		view.displayallplayerstoadd(e.detail);
	});

	document.addEventListener('displayallgoaliestoadd', function(e){
		view.displayallgoaliestoadd(e.detail);
	});

	document.addEventListener('addplayer', function(e){
		model.addplayer(e.detail);
	});

	document.addEventListener('deleteplayer', function(e){
		model.deleteplayers(e.detail);
	});

	document.addEventListener('gettraders', function(e){
		model.getuserstotrade(e.detail);
	});

	document.addEventListener('displaytraders', function(e){
		view.displaytraders(e.detail);
	});

	document.addEventListener('displayhisplayerstotrade', function(e){
		model.displayhisplayerstotrade(e.detail);
	});

	document.addEventListener('playersdisplayedtotrade', function(e){
		view.displayplayerstotrade(e.detail);
	});

	document.addEventListener('getyourplayerstotrade', function(e){
		model.getyourplayerstotrade(e.detail);
	});

	document.addEventListener('displayyourplayerstotrade', function(e){
		view.displayyourplayerstotrade(e.detail);
	});

	document.addEventListener('getplayer', function(e){
		model.getplayer(e.detail);
	});

	document.addEventListener('helper', function(e){
		view.helper(e.detail);
	});

	document.addEventListener('maketrade', function(e){
		model.maketrade(e.detail);
	});

	document.addEventListener('gettrades', function(e){
		model.gettrades(e.detail);
	});

	document.addEventListener('displaytrades', function(e){
		view.displaytrades(e.detail);
	});

	document.addEventListener('completetrade', function(e){
		model.completetrade(e.detail);
	});

	document.addEventListener('deletetrade', function(e){
		model.deletetrade(e.detail);
	});
}(model, view));