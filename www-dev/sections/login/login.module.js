(function() {
'use strict';

angular.module('login.module', [])
.config(config);

config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider','APP'];

function config ($stateProvider,$urlRouterProvider,$httpProvider,APP){

	$httpProvider.interceptors.push(function HttpInterceptorFactory($q, $injector){
		return {
		    request: function(config) {
            	config.headers = config.headers || {};
	            
                config.headers.Authorization = 'Bearer ' + APP.user.oauth.access_token;
	            
	            return config || $q.when(config);
	        }
	  	};
	});

    $stateProvider
    .state('login', {
        url: '/login',
        loginRequired: true,
        templateUrl: 'sections/login/login.view.html'
    });
}


})();