(function() {
'use strict';

angular.module('home.module', [])
.config(config);

config.$inject = ['$stateProvider'];

function config ($stateProvider){

    $stateProvider
    .state('home', {
        url: '/login',
        abstract: true,
        templateUrl: 'app/templates/ionic/menu.html',
        controller: 'AppCtrl'
    })
    .state('home.principal', {
        url: '/home-principal',
        loginRequired: true,
        controller: 'HomeCtrl',
        controllerAs: 'hctrl',
        views: {
            'menuContent': {
                templateUrl: 'sections/home/home.view.html',
            }
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load ([
                    {
                        type: 'js',
                        files: [
                        	'sections/home/home.factory.js',
                            'sections/home/home.controller.js'
                            
                        ]
                    }
                ]);
            }
        }
        
    });
}

})();