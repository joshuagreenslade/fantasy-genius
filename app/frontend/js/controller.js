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
}(model, view));