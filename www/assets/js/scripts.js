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
(function() {
'use strict';

angular
.module('app.module')
.service('PassportService', PassportService);

PassportService.$inject = ['APP','$resource', '$http', '$window', '$q'];

function PassportService(APP,$resource, $http, $window, $q) {

    return {
        getToken : function () {
            var token = typeof $window.localStorage.token;

            if(token != 'undefined'){
                return $window.localStorage.token;
            } else {
                return false;
            }
            
        },
        setToken: function (token) {
            $window.localStorage.token = token;
        },
        signin : function (data) {
            //$http.post('api/signin', data);
        },
        signup : function (data) {
            //$http.post('api/signup', data);
        },
        logout : function (data) {
            //delete $localStorage.token;
            $q.when();
        }
    };
}

})();
(function() {
'use strict';

angular
.module('home.module', [])
.factory('LoginFactory', ['$resource','$state','APP', function($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/login';

    var paramDefaults = { 
    	email: '@user', password: '@pass' };
    
    var actions = {
        'login':{ method: 'POST', timeout:APP.system.timeout },
    };

    return $resource(url, paramDefaults, actions);
}])
.factory('ProfileFactory', ['$resource','$state','APP', function($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/profile';

    var paramDefaults = {};
    
    var actions = {};

    return $resource(url, paramDefaults, actions);
}]);

})();
(function() {
'use strict';

angular
.module('login.module')
.factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['$resource','$state','APP'];

function LoginFactory ($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/login';

    var paramDefaults = {email: '@user', password: '@pass' };
    
    var actions = {
        'login':{ method: 'POST', timeout:APP.system.timeout }
    };

    return $resource(url, paramDefaults, actions);
}

})();
(function() {
'use strict';

angular
.module('app.module')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$resource','$state','APP'];

function AuthFactory($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/profile';

    var paramDefaults = {};
    
    var actions = {
    	'refresh': { method: 'POST', timeout:APP.system.timeout }
   	};

    return $resource(url, paramDefaults, actions);
}

})();
(function() {
'use strict';

angular
.module('app.module')
.factory('HttpInterceptorFactory', HttpInterceptorFactory);

HttpInterceptorFactory.$inject = ['$q', '$injector'];

function HttpInterceptorFactory($q, $injector){
	return {
		responseError: function(rejection) {
			console.log('rejection', rejection);
			console.log($injector);
			if (rejection.status >= 400 && rejection.status < 404){
				$injector.get('$state').transitionTo('access.signin');
			}
			return $q.reject(rejection);
		}
	};
}

})();
(function() {
'use strict';

angular
.module('app.module')
.factory('ProfileFactory', ProfileFactory);

ProfileFactory.$inject = ['$resource','$state','APP'];

function ProfileFactory($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/profile';

    var paramDefaults = {};
    
    var actions = {};

    return $resource(url, paramDefaults, actions);
}

})();
(function() {
'use strict';

angular
.module('app.module')
.factory('PassportInterceptorFactory', PassportInterceptorFactory);

PassportInterceptorFactory.$inject = ['$q','$window','$location'];

function PassportInterceptorFactory($q,$window,$location) {
    
    return {
        request: function(config) {

            var url = config.url;
            var indexHtml = url.indexOf('.html');
            var indexJson = url.indexOf('.json');
            var indexHttp = url.indexOf('https://');

            if(indexHtml === -1 && indexJson === -1 && indexHttp === -1){
                var token = typeof $window.localStorage.token;

                if(token !== 'undefined'){
                    
                    var index = url.indexOf('/oauth/token');

                    if( index === -1) {
                        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    } else {
                        // console.info('PassPort:token', token);
                        // console.info('PassPort:index', index);
                        // console.info('PassPort:indexHtml', indexHtml);
                        // console.info('PassPort:indexJson', indexJson);
                    }
                }
            }
            
            
            return config;
        },
        responseError: function(response) {
            console.info('PassPort:errorInterceptor', response);

            if (response.status === 401 || response.status === 403) {
                $location.path('/login').replace();
            } else if(response.status === 404){
                $location.path('/404').replace();
            } else if(response.status === 500){
                $location.path('/500').replace();
            }

            return $q.reject(response);
        }
    };

}

})();
(function(){
'use strict';

angular
.module('app.run', [])
.run(['$rootScope','$location','$state','$ionicPlatform','APP',function ($rootScope, $location,$state,$ionicPlatform,APP) {
    
    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    $rootScope.$on("$stateChangeStart", function(event, next, current){
        console.log(next);

        if(next.loginRequired){
            if(APP.user.oauth.access_token) {
                console.log(APP.user.oauth.access_token.lenght);
            }
        }
    });

    // Loading
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});
    });

    $rootScope.$on('loading:hide', function(){
        $ionicLoading.hide();
    });

}]);

})();
(function() {
'use strict';

angular
.module('app.constants', [])
.constant(
    'APP',{
    	'user': {
    		'oauth':false,
    		'profile':{},
    	},
        'system':{
            //'url':'http://localhost:8080/server.etapadigital/etapadigital.com.br/app/public/api/provafacil/',
            'url':'http://localhost:8000/api/provafacil/',
            'timeout':100000,
            'version_api':'v1',
            'version_app':'0.0.1'
        },
        'auth':{
            'grant_type':'password',
            'client_id':'provafacil',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709',

        }
	}
);

})();
(function() {
'use strict';

angular
.module('app.module')
.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$state','$scope','APP','HttpInterceptorFactory'];

function AppCtrl ($state,$scope,APP,HttpInterceptorFactory){  
    var vm = this;

}
})();
(function() {
'use strict';

angular
.module('home.module')
.controller('HomeCtrl',HomeCtrl);

HomeCtrl.$inject = ['$state','$scope','APP'];

function HomeCtrl ($state,$scope,APP){  
    var vm = this;

    
}

})();
(function() {
'use strict';

angular
.module('login.module')
.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$state','$scope','$http','$timeout','APP','LoginFactory','ProfileFactory'];

function LoginCtrl ($state,$scope,$http,$timeout,APP,LoginFactory,ProfileFactory){  
    var vm = this;

    // -- VARIABLES -----------
    vm.formData = { username:'andre.morita@etapa.com.br', password:'1234abc@' };

    // -- FUNCTIONS -----------
    $scope.logar = logar;     
    $scope.perfil = perfil;     

    function logar() {
        vm.postData = {
            username: vm.formData.username, 
            password: vm.formData.password,
            client_id: APP.auth.client_id,
            client_secret: APP.auth.client_secret,
            grant_type: APP.auth.grant_type,
            version_api: APP.system.version_api,
            version_app: APP.system.version_app
        };

        LoginFactory.login( vm.postData,
            function(response) {
                console.log(typeof response.access_token);

                if(typeof response.access_token != 'undefined' && typeof response.refresh_token != 'undefined' )
                {
                    APP.user.oauth = {
                        access_token: response.access_token,
                        refresh_token: response.refresh_token,
                        expires_in: response.expires_in,
                        token_type: response.token_type
                    };

                    $scope.perfil();
                }
                
            }, 
            function(response) {
                console.log(response);
            });
    }

    function perfil(){
        ProfileFactory.get({},
            function(response){
                console.log(response);
            });
    }

    $timeout(function(){
        $scope.logar();
    }, 1000);
}

})();

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
    'ionic',
    'ngResource', 
    'app.constants',
    'app.run',
    'app.module',
    'login.module'
]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLmpzIiwiaG9tZS9ob21lLm1vZHVsZS5qcyIsImxvZ2luL2xvZ2luLm1vZHVsZS5qcyIsImFwcC9wYXNzcG9ydC9wYXNzcG9ydC5zZXJ2aWNlLmpzIiwiaG9tZS9ob21lLmZhY3RvcnkuanMiLCJsb2dpbi9sb2dpbi5mYWN0b3J5LmpzIiwiYXBwL2ZhY3Rvcmllcy9hcHAtYXV0aC5mYWN0b3J5LmpzIiwiYXBwL2ZhY3Rvcmllcy9hcHAtaHR0cGludGVyY2VwdG9yLmZhY3RvcnkuanMiLCJhcHAvZmFjdG9yaWVzL2FwcC1wcm9maWxlLmZhY3RvcnkuanMiLCJhcHAvcGFzc3BvcnQvcGFzc3BvcnQtaW50ZXJjZXB0b3IuZmFjdG9yeS5qcyIsImFwcC9hcHAucnVuLmpzIiwiYXBwL2FwcC5jb25zdGFudHMuanMiLCJhcHAvYXBwLmNvbnRyb2xsZXIuanMiLCJob21lL2hvbWUuY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLmNvbnRyb2xsZXIuanMiLCJsb2dvdXQvbG9nb3V0LmNvbnRyb2xsZXIuanMiLCJhcHAuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzSEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUM3Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9CQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzNCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNmQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDaEVBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLm1vZHVsZScsW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsJyRodHRwUHJvdmlkZXInXTtcblxuZnVuY3Rpb24gY29uZmlnICgkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIsJGh0dHBQcm92aWRlcil7XG5cbiAgICAvLyRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goJ0h0dHBJbnRlcmNlcHRvckZhY3RvcnknKTtcbi8vICAgICAkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKGZ1bmN0aW9uIEh0dHBJbnRlcmNlcHRvckZhY3RvcnkoJHEsICRpbmplY3Rvcil7XG4vLyAgICAgcmV0dXJuIHtcbi8vICAgICAgICAgLy8gb3B0aW9uYWwgbWV0aG9kXG4vLyAgICAgICAgIC8vIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xuLy8gICAgICAgICAvLyAgIC8vIGRvIHNvbWV0aGluZyBvbiBzdWNjZXNzXG4vLyAgICAgICAgIC8vICAgY29uc29sZS5pbmZvKCdyZXF1ZXN0Jyxjb25maWcpO1xuLy8gICAgICAgICAvLyAgIHJldHVybiBjb25maWc7XG4vLyAgICAgICAgIC8vIH0sXG4vLyAgICAgICAgIHJlcXVlc3Q6IGZ1bmN0aW9uKGNvbmZpZykge1xuLy8gICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcbiAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIEFQUC51c2VyLm9hdXRoLmFjY2Vzc190b2tlbjtcbiAgICAgICAgICAgIFxuLy8gICAgICAgICAgICAgcmV0dXJuIGNvbmZpZyB8fCAkcS53aGVuKGNvbmZpZyk7XG4vLyAgICAgICAgIH0sXG4vLyAgICAgICAgIC8vIG9wdGlvbmFsIG1ldGhvZFxuLy8gICAgICAgIC8vIHJlcXVlc3RFcnJvcjogZnVuY3Rpb24ocmVqZWN0aW9uKSB7XG4vLyAgICAgICAgLy8gICAgY29uc29sZS5pbmZvKCdyZXF1ZXN0RXJyb3InLHJlamVjdCk7XG5cbiAgICAgICAgICBcbi8vICAgICAgICAvLyAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4vLyAgICAgICAgLy8gIH0sXG5cblxuXG4vLyAgICAgICAgIC8vIG9wdGlvbmFsIG1ldGhvZFxuLy8gICAgICAgICAvLyByZXNwb25zZTogZnVuY3Rpb24ocmVzcG9uc2UpIHtcbi8vICAgICAgICAgLy8gICBjb25zb2xlLmluZm8oJ3Jlc3BvbnNlJyxyZXNwb25zZSk7XG4vLyAgICAgICAgIC8vICAgcmV0dXJuIHJlc3BvbnNlO1xuLy8gICAgICAgICAvLyB9LFxuXG4vLyAgICAgICAgIC8vIG9wdGlvbmFsIG1ldGhvZFxuLy8gICAgICAgIC8vIHJlc3BvbnNlRXJyb3I6IGZ1bmN0aW9uKHJlamVjdGlvbikge1xuLy8gICAgICAgIC8vICAgIC8vIGRvIHNvbWV0aGluZyBvbiBlcnJvclxuLy8gICAgICAgIC8vICAgICAgIC8vY29uc29sZS5sb2cocmVqZWN0aW9uKTtcbi8vICAgICAgICAvLyAgICAgICBjb25zb2xlLmluZm8oJ3JlamVjdGlvbicscmVqZWN0aW9uKTtcbi8vICAgICAgICAvLyAgICByZXR1cm4gJHEucmVqZWN0KHJlamVjdGlvbik7XG4vLyAgICAgICAgLy8gIH1cbi8vICAgICAgIH07XG4vLyB9KTtcbiAgICBcbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzL21lbnUtbGVmdC52aWV3Lmh0bWwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC5wbGF5bGlzdHMnLCB7XG4gICAgICAgIHVybDogJy9wbGF5bGlzdHMnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzL21lbnUvcGxheWxpc3RzLmh0bWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2FwcC92aWV3cy9hcHAuY29udHJvbGxlci5qcydcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDgnLCB7XG4gICAgICAgIHVybDogJy80MDgnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDA4LnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDQnLCB7XG4gICAgICAgIHVybDogJy80MDQnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDA0LnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDAnLCB7XG4gICAgICAgIHVybDogJy80MDAnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDAwLnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC41MDAnLCB7XG4gICAgICAgIHVybDogJy81MDAnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNTAwLnZpZXcuaHRtbCdcbiAgICB9KTtcbiAgICAvLyAuc3RhdGUoJ2xvZ2luJywge1xuICAgIC8vICAgICB1cmw6ICcvbG9naW4nLFxuICAgIC8vICAgICBsb2dpblJlcXVpcmVkOiB0cnVlLFxuICAgIC8vICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgLy8gICAgIHJlc29sdmU6IHtcbiAgICAvLyAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLmZhY3RvcnkuanMnLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgXVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgXSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfSk7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn1cblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2hvbWUubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyKXtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdGVtcGxhdGVzL2lvbmljL21lbnUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdob21lLnByaW5jaXBhbCcsIHtcbiAgICAgICAgdXJsOiAnL2hvbWUtcHJpbmNpcGFsJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnaGN0cmwnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvaG9tZS9ob21lLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcdCdzZWN0aW9ucy9ob21lL2hvbWUuZmFjdG9yeS5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbG9naW4ubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlcicsJyRodHRwUHJvdmlkZXInLCdBUFAnXTtcblxuZnVuY3Rpb24gY29uZmlnICgkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIsJGh0dHBQcm92aWRlcixBUFApe1xuXG5cdCRodHRwUHJvdmlkZXIuaW50ZXJjZXB0b3JzLnB1c2goZnVuY3Rpb24gSHR0cEludGVyY2VwdG9yRmFjdG9yeSgkcSwgJGluamVjdG9yKXtcblx0XHRyZXR1cm4ge1xuXHRcdCAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcbiAgICAgICAgICAgIFx0Y29uZmlnLmhlYWRlcnMgPSBjb25maWcuaGVhZGVycyB8fCB7fTtcblx0ICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgY29uZmlnLmhlYWRlcnMuQXV0aG9yaXphdGlvbiA9ICdCZWFyZXIgJyArIEFQUC51c2VyLm9hdXRoLmFjY2Vzc190b2tlbjtcblx0ICAgICAgICAgICAgXG5cdCAgICAgICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuXHQgICAgICAgIH1cblx0ICBcdH07XG5cdH0pO1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2xvZ2luJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCdcbiAgICB9KTtcbn1cblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uc2VydmljZSgnUGFzc3BvcnRTZXJ2aWNlJywgUGFzc3BvcnRTZXJ2aWNlKTtcblxuUGFzc3BvcnRTZXJ2aWNlLiRpbmplY3QgPSBbJ0FQUCcsJyRyZXNvdXJjZScsICckaHR0cCcsICckd2luZG93JywgJyRxJ107XG5cbmZ1bmN0aW9uIFBhc3Nwb3J0U2VydmljZShBUFAsJHJlc291cmNlLCAkaHR0cCwgJHdpbmRvdywgJHEpIHtcblxuICAgIHJldHVybiB7XG4gICAgICAgIGdldFRva2VuIDogZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHRva2VuID0gdHlwZW9mICR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuO1xuXG4gICAgICAgICAgICBpZih0b2tlbiAhPSAndW5kZWZpbmVkJyl7XG4gICAgICAgICAgICAgICAgcmV0dXJuICR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBcbiAgICAgICAgfSxcbiAgICAgICAgc2V0VG9rZW46IGZ1bmN0aW9uICh0b2tlbikge1xuICAgICAgICAgICAgJHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW4gPSB0b2tlbjtcbiAgICAgICAgfSxcbiAgICAgICAgc2lnbmluIDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vJGh0dHAucG9zdCgnYXBpL3NpZ25pbicsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBzaWdudXAgOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy8kaHR0cC5wb3N0KCdhcGkvc2lnbnVwJywgZGF0YSk7XG4gICAgICAgIH0sXG4gICAgICAgIGxvZ291dCA6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvL2RlbGV0ZSAkbG9jYWxTdG9yYWdlLnRva2VuO1xuICAgICAgICAgICAgJHEud2hlbigpO1xuICAgICAgICB9XG4gICAgfTtcbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2hvbWUubW9kdWxlJywgW10pXG4uZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnLCBmdW5jdGlvbigkcmVzb3VyY2UsJHN0YXRlLEFQUCkge1xuXG4gICAgdmFyIHVybCA9IEFQUC5zeXN0ZW0udXJsK0FQUC5zeXN0ZW0udmVyc2lvbl9hcGkrJy9sb2dpbic7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHsgXG4gICAgXHRlbWFpbDogJ0B1c2VyJywgcGFzc3dvcmQ6ICdAcGFzcycgfTtcbiAgICBcbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgICAgJ2xvZ2luJzp7IG1ldGhvZDogJ1BPU1QnLCB0aW1lb3V0OkFQUC5zeXN0ZW0udGltZW91dCB9LFxuICAgIH07XG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XSlcbi5mYWN0b3J5KCdQcm9maWxlRmFjdG9yeScsIFsnJHJlc291cmNlJywnJHN0YXRlJywnQVBQJywgZnVuY3Rpb24oJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciB1cmwgPSBBUFAuc3lzdGVtLnVybCtBUFAuc3lzdGVtLnZlcnNpb25fYXBpKycvcHJvZmlsZSc7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHt9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge307XG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XSk7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdsb2dpbi5tb2R1bGUnKVxuLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIExvZ2luRmFjdG9yeSk7XG5cbkxvZ2luRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gTG9naW5GYWN0b3J5ICgkcmVzb3VyY2UsJHN0YXRlLEFQUCkge1xuXG4gICAgdmFyIHVybCA9IEFQUC5zeXN0ZW0udXJsK0FQUC5zeXN0ZW0udmVyc2lvbl9hcGkrJy9sb2dpbic7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHtlbWFpbDogJ0B1c2VyJywgcGFzc3dvcmQ6ICdAcGFzcycgfTtcbiAgICBcbiAgICB2YXIgYWN0aW9ucyA9IHtcbiAgICAgICAgJ2xvZ2luJzp7IG1ldGhvZDogJ1BPU1QnLCB0aW1lb3V0OkFQUC5zeXN0ZW0udGltZW91dCB9XG4gICAgfTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLmZhY3RvcnkoJ0F1dGhGYWN0b3J5JywgQXV0aEZhY3RvcnkpO1xuXG5BdXRoRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gQXV0aEZhY3RvcnkoJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciB1cmwgPSBBUFAuc3lzdGVtLnVybCtBUFAuc3lzdGVtLnZlcnNpb25fYXBpKycvcHJvZmlsZSc7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHt9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgIFx0J3JlZnJlc2gnOiB7IG1ldGhvZDogJ1BPU1QnLCB0aW1lb3V0OkFQUC5zeXN0ZW0udGltZW91dCB9XG4gICBcdH07XG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdIdHRwSW50ZXJjZXB0b3JGYWN0b3J5JywgSHR0cEludGVyY2VwdG9yRmFjdG9yeSk7XG5cbkh0dHBJbnRlcmNlcHRvckZhY3RvcnkuJGluamVjdCA9IFsnJHEnLCAnJGluamVjdG9yJ107XG5cbmZ1bmN0aW9uIEh0dHBJbnRlcmNlcHRvckZhY3RvcnkoJHEsICRpbmplY3Rvcil7XG5cdHJldHVybiB7XG5cdFx0cmVzcG9uc2VFcnJvcjogZnVuY3Rpb24ocmVqZWN0aW9uKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncmVqZWN0aW9uJywgcmVqZWN0aW9uKTtcblx0XHRcdGNvbnNvbGUubG9nKCRpbmplY3Rvcik7XG5cdFx0XHRpZiAocmVqZWN0aW9uLnN0YXR1cyA+PSA0MDAgJiYgcmVqZWN0aW9uLnN0YXR1cyA8IDQwNCl7XG5cdFx0XHRcdCRpbmplY3Rvci5nZXQoJyRzdGF0ZScpLnRyYW5zaXRpb25UbygnYWNjZXNzLnNpZ25pbicpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuXHRcdH1cblx0fTtcbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLmZhY3RvcnkoJ1Byb2ZpbGVGYWN0b3J5JywgUHJvZmlsZUZhY3RvcnkpO1xuXG5Qcm9maWxlRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gUHJvZmlsZUZhY3RvcnkoJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciB1cmwgPSBBUFAuc3lzdGVtLnVybCtBUFAuc3lzdGVtLnZlcnNpb25fYXBpKycvcHJvZmlsZSc7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHt9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge307XG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdQYXNzcG9ydEludGVyY2VwdG9yRmFjdG9yeScsIFBhc3Nwb3J0SW50ZXJjZXB0b3JGYWN0b3J5KTtcblxuUGFzc3BvcnRJbnRlcmNlcHRvckZhY3RvcnkuJGluamVjdCA9IFsnJHEnLCckd2luZG93JywnJGxvY2F0aW9uJ107XG5cbmZ1bmN0aW9uIFBhc3Nwb3J0SW50ZXJjZXB0b3JGYWN0b3J5KCRxLCR3aW5kb3csJGxvY2F0aW9uKSB7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XG5cbiAgICAgICAgICAgIHZhciB1cmwgPSBjb25maWcudXJsO1xuICAgICAgICAgICAgdmFyIGluZGV4SHRtbCA9IHVybC5pbmRleE9mKCcuaHRtbCcpO1xuICAgICAgICAgICAgdmFyIGluZGV4SnNvbiA9IHVybC5pbmRleE9mKCcuanNvbicpO1xuICAgICAgICAgICAgdmFyIGluZGV4SHR0cCA9IHVybC5pbmRleE9mKCdodHRwczovLycpO1xuXG4gICAgICAgICAgICBpZihpbmRleEh0bWwgPT09IC0xICYmIGluZGV4SnNvbiA9PT0gLTEgJiYgaW5kZXhIdHRwID09PSAtMSl7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdHlwZW9mICR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuO1xuXG4gICAgICAgICAgICAgICAgaWYodG9rZW4gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHVybC5pbmRleE9mKCcvb2F1dGgvdG9rZW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgJHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ1Bhc3NQb3J0OnRva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdQYXNzUG9ydDppbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnUGFzc1BvcnQ6aW5kZXhIdG1sJywgaW5kZXhIdG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnUGFzc1BvcnQ6aW5kZXhKc29uJywgaW5kZXhKc29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdQYXNzUG9ydDplcnJvckludGVyY2VwdG9yJywgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJykucmVwbGFjZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KXtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLzQwNCcpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXNwb25zZS5zdGF0dXMgPT09IDUwMCl7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy81MDAnKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxufVxuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAucnVuJywgW10pXG4ucnVuKFsnJHJvb3RTY29wZScsJyRsb2NhdGlvbicsJyRzdGF0ZScsJyRpb25pY1BsYXRmb3JtJywnQVBQJyxmdW5jdGlvbiAoJHJvb3RTY29wZSwgJGxvY2F0aW9uLCRzdGF0ZSwkaW9uaWNQbGF0Zm9ybSxBUFApIHtcbiAgICBcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhuZXh0KTtcblxuICAgICAgICBpZihuZXh0LmxvZ2luUmVxdWlyZWQpe1xuICAgICAgICAgICAgaWYoQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuLmxlbmdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExvYWRpbmdcbiAgICAkcm9vdFNjb3BlLiRvbignbG9hZGluZzpzaG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRpb25pY0xvYWRpbmcuc2hvdyh7dGVtcGxhdGU6Jzxpb24tc3Bpbm5lcj48L2lvbi1zcGlubmVyPid9KTtcbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKCdsb2FkaW5nOmhpZGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAkaW9uaWNMb2FkaW5nLmhpZGUoKTtcbiAgICB9KTtcblxufV0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLmNvbnN0YW50cycsIFtdKVxuLmNvbnN0YW50KFxuICAgICdBUFAnLHtcbiAgICBcdCd1c2VyJzoge1xuICAgIFx0XHQnb2F1dGgnOmZhbHNlLFxuICAgIFx0XHQncHJvZmlsZSc6e30sXG4gICAgXHR9LFxuICAgICAgICAnc3lzdGVtJzp7XG4gICAgICAgICAgICAvLyd1cmwnOidodHRwOi8vbG9jYWxob3N0OjgwODAvc2VydmVyLmV0YXBhZGlnaXRhbC9ldGFwYWRpZ2l0YWwuY29tLmJyL2FwcC9wdWJsaWMvYXBpL3Byb3ZhZmFjaWwvJyxcbiAgICAgICAgICAgICd1cmwnOidodHRwOi8vbG9jYWxob3N0OjgwMDAvYXBpL3Byb3ZhZmFjaWwvJyxcbiAgICAgICAgICAgICd0aW1lb3V0JzoxMDAwMDAsXG4gICAgICAgICAgICAndmVyc2lvbl9hcGknOid2MScsXG4gICAgICAgICAgICAndmVyc2lvbl9hcHAnOicwLjAuMSdcbiAgICAgICAgfSxcbiAgICAgICAgJ2F1dGgnOntcbiAgICAgICAgICAgICdncmFudF90eXBlJzoncGFzc3dvcmQnLFxuICAgICAgICAgICAgJ2NsaWVudF9pZCc6J3Byb3ZhZmFjaWwnLFxuICAgICAgICAgICAgJ2NsaWVudF9zZWNyZXQnOidkYTM5YTNlZTVlNmI0YjBkMzI1NWJmZWY5NTYwMTg5MGFmZDgwNzA5JyxcblxuICAgICAgICB9XG5cdH1cbik7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5jb250cm9sbGVyKCdBcHBDdHJsJyxBcHBDdHJsKTtcblxuQXBwQ3RybC4kaW5qZWN0ID0gWyckc3RhdGUnLCckc2NvcGUnLCdBUFAnLCdIdHRwSW50ZXJjZXB0b3JGYWN0b3J5J107XG5cbmZ1bmN0aW9uIEFwcEN0cmwgKCRzdGF0ZSwkc2NvcGUsQVBQLEh0dHBJbnRlcmNlcHRvckZhY3RvcnkpeyAgXG4gICAgdmFyIHZtID0gdGhpcztcblxufVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2hvbWUubW9kdWxlJylcbi5jb250cm9sbGVyKCdIb21lQ3RybCcsSG9tZUN0cmwpO1xuXG5Ib21lQ3RybC4kaW5qZWN0ID0gWyckc3RhdGUnLCckc2NvcGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gSG9tZUN0cmwgKCRzdGF0ZSwkc2NvcGUsQVBQKXsgIFxuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICBcbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2xvZ2luLm1vZHVsZScpXG4uY29udHJvbGxlcignTG9naW5DdHJsJyxMb2dpbkN0cmwpO1xuXG5Mb2dpbkN0cmwuJGluamVjdCA9IFsnJHN0YXRlJywnJHNjb3BlJywnJGh0dHAnLCckdGltZW91dCcsJ0FQUCcsJ0xvZ2luRmFjdG9yeScsJ1Byb2ZpbGVGYWN0b3J5J107XG5cbmZ1bmN0aW9uIExvZ2luQ3RybCAoJHN0YXRlLCRzY29wZSwkaHR0cCwkdGltZW91dCxBUFAsTG9naW5GYWN0b3J5LFByb2ZpbGVGYWN0b3J5KXsgIFxuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAvLyAtLSBWQVJJQUJMRVMgLS0tLS0tLS0tLS1cbiAgICB2bS5mb3JtRGF0YSA9IHsgdXNlcm5hbWU6J2FuZHJlLm1vcml0YUBldGFwYS5jb20uYnInLCBwYXNzd29yZDonMTIzNGFiY0AnIH07XG5cbiAgICAvLyAtLSBGVU5DVElPTlMgLS0tLS0tLS0tLS1cbiAgICAkc2NvcGUubG9nYXIgPSBsb2dhcjsgICAgIFxuICAgICRzY29wZS5wZXJmaWwgPSBwZXJmaWw7ICAgICBcblxuICAgIGZ1bmN0aW9uIGxvZ2FyKCkge1xuICAgICAgICB2bS5wb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB2bS5mb3JtRGF0YS51c2VybmFtZSwgXG4gICAgICAgICAgICBwYXNzd29yZDogdm0uZm9ybURhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICBjbGllbnRfaWQ6IEFQUC5hdXRoLmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IEFQUC5hdXRoLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBncmFudF90eXBlOiBBUFAuYXV0aC5ncmFudF90eXBlLFxuICAgICAgICAgICAgdmVyc2lvbl9hcGk6IEFQUC5zeXN0ZW0udmVyc2lvbl9hcGksXG4gICAgICAgICAgICB2ZXJzaW9uX2FwcDogQVBQLnN5c3RlbS52ZXJzaW9uX2FwcFxuICAgICAgICB9O1xuXG4gICAgICAgIExvZ2luRmFjdG9yeS5sb2dpbiggdm0ucG9zdERhdGEsXG4gICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHR5cGVvZiByZXNwb25zZS5hY2Nlc3NfdG9rZW4pO1xuXG4gICAgICAgICAgICAgICAgaWYodHlwZW9mIHJlc3BvbnNlLmFjY2Vzc190b2tlbiAhPSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgcmVzcG9uc2UucmVmcmVzaF90b2tlbiAhPSAndW5kZWZpbmVkJyApXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBBUFAudXNlci5vYXV0aCA9IHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICAgICAgcmVmcmVzaF90b2tlbjogcmVzcG9uc2UucmVmcmVzaF90b2tlbixcbiAgICAgICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IHJlc3BvbnNlLmV4cGlyZXNfaW4sXG4gICAgICAgICAgICAgICAgICAgICAgICB0b2tlbl90eXBlOiByZXNwb25zZS50b2tlbl90eXBlXG4gICAgICAgICAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgICAgICAgICAgJHNjb3BlLnBlcmZpbCgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZXJmaWwoKXtcbiAgICAgICAgUHJvZmlsZUZhY3RvcnkuZ2V0KHt9LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICRzY29wZS5sb2dhcigpO1xuICAgIH0sIDEwMDApO1xufVxuXG59KSgpOyIsIiIsIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbXG4gICAgJ2lvbmljJyxcbiAgICAnbmdSZXNvdXJjZScsIFxuICAgICdhcHAuY29uc3RhbnRzJyxcbiAgICAnYXBwLnJ1bicsXG4gICAgJ2FwcC5tb2R1bGUnLFxuICAgICdsb2dpbi5tb2R1bGUnXG5dKTsiXX0=
