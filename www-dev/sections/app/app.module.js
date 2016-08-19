(function() {
'use strict';

angular.module('app.module',[])
.config(config);

config.$inject = ['$stateProvider','$urlRouterProvider','$httpProvider'];

function config ($stateProvider,$urlRouterProvider,$httpProvider){

    //$httpProvider.interceptors.push('HttpInterceptorFactory');
//     $httpProvider.interceptors.push(function HttpInterceptorFactory($q, $injector){
//     return {
//         // optional method
//         // request: function(config) {
//         //   // do something on success
//         //   console.info('request',config);
//         //   return config;
//         // },
//         request: function(config) {
//             config.headers = config.headers || {};
            
//             config.headers.Authorization = 'Bearer ' + APP.user.oauth.access_token;
            
//             return config || $q.when(config);
//         },
//         // optional method
//        // requestError: function(rejection) {
//        //    console.info('requestError',reject);

          
//        //    return $q.reject(rejection);
//        //  },



//         // optional method
//         // response: function(response) {
//         //   console.info('response',response);
//         //   return response;
//         // },

//         // optional method
//        // responseError: function(rejection) {
//        //    // do something on error
//        //       //console.log(rejection);
//        //       console.info('rejection',rejection);
//        //    return $q.reject(rejection);
//        //  }
//       };
// });
    
    $stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'sections/app/views/menu-left.view.html'
    })
    .state('app.playlists', {
        url: '/playlists',
        views: {
            'menuContent': {
                templateUrl: 'sections/app/views/menu/playlists.html'
            }
        },
        resolve: {
            loadPlugin: function($ocLazyLoad) {
                return $ocLazyLoad.load ([
                    {
                        type: 'js',
                        files: [
                            'sections/app/views/app.controller.js'
                        ]
                    }
                ]);
            }
        }
    })
    .state('app.408', {
        url: '/408',
        loginRequired: false,
        templateUrl: 'sections/app/views/408.view.html',
    })
    .state('app.404', {
        url: '/404',
        loginRequired: false,
        templateUrl: 'sections/app/views/404.view.html',
    })
    .state('app.400', {
        url: '/400',
        loginRequired: false,
        templateUrl: 'sections/app/views/400.view.html',
    })
    .state('app.500', {
        url: '/500',
        loginRequired: false,
        templateUrl: 'sections/app/views/500.view.html'
    });
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