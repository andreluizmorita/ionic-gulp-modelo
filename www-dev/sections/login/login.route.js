(function() {
'use strict';

angular
.module('login.module')
.config(config);

config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider','APP'];

function config ($stateProvider,$urlRouterProvider,$httpProvider,APP){
	
	$httpProvider.interceptors.push('PassportInterceptorFactory');
		
    $stateProvider
    .state ('login', {
        url: '/login',
        templateUrl: 'sections/login/login.view.html',
        loginRequired: false
    });
}


})();