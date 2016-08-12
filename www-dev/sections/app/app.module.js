(function() {
'use strict';

angular.module('app.module', [])
.config(config);

config.$inject = ['$stateProvider','$urlRouterProvider'];

function config ($stateProvider,$urlRouterProvider){

    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'sections/app/menu-left.view.html'
    })
    .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'sections/app/menu/playlists.html'
            }
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load ([
                    {
                        type: 'js',
                        files: [
                            'sections/app/app.controller.js'
                        ]
                    }
                ]);
            }
        }
    })
    .state('app.408', {
        url: '/408',
        loginRequired: false,
        templateUrl: 'sections/app/408.view.html',
    })
    .state('app.404', {
        url: '/404',
        loginRequired: false,
        templateUrl: 'sections/app/404.view.html',
    })
    .state('app.400', {
        url: '/400',
        loginRequired: false,
        templateUrl: 'sections/app/400.view.html',
    })
    .state('app.500', {
        url: '/500',
        loginRequired: false,
        templateUrl: 'sections/app/500.view.html'
    })
    // .state('login', {
    //     url: '/login',
    //     loginRequired: true,
    //     templateUrl: 'sections/login/login.view.html',
    //     resolve: {
    //         loadPlugin: function($ocLazyLoad) {
    //             return $ocLazyLoad.load ([
    //                 {
    //                     type: 'js',
    //                     files: [
    //                         'sections/login/login.factory.js',
    //                         'sections/login/login.controller.js'
                            
    //                     ]
    //                 }
    //             ]);
    //         }
    //     }
        
    // });

    $urlRouterProvider.otherwise('/login');
}


})();