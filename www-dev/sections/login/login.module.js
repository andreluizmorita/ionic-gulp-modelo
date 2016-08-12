(function() {
'use strict';

angular.module('login.module', [])
.config(config);

config.$inject = ['$stateProvider','$urlRouterProvider'];

function config ($stateProvider,$urlRouterProvider){

    $stateProvider
    .state('login', {
        url: '/login',
        loginRequired: true,
        templateUrl: 'sections/login/login.view.html'
    });
}


})();