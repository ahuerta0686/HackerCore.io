angular
	.module('HackerCore.io', ['ui.bootstrap', 'ui.router', 'ngCookies', 'uiGmapgoogle-maps'])
	.config(function(uiGmapGoogleMapApiProvider) {
	    uiGmapGoogleMapApiProvider.configure({
	        key: 'AIzaSyCc1ETFRBRHE8a7TP0mdPBQ_r_t-4nIkFs',
	        v: '3.20', //defaults to latest 3.X anyhow
	        libraries: 'visualization'
	    });
	})
	.run(ModuleRun);

ModuleRun.$inject = ['$rootScope', 'userservice'];

function ModuleRun($rootScope, userservice) {
	userservice.loginStatus()
	.then(function (data) {
		console.log(data);
		$rootScope.loggedIn = data.loggedIn;

		if($rootScope.loggedIn)
			return userservice.me();
	})
	.then(function (me) {
		if ($rootScope.loggedIn) {
			$rootScope.username = me.username;
			$rootScope.notifications = me.notifications;
		}	
			
	})
	.catch(function (error) {
		console.log(error);
	});
};