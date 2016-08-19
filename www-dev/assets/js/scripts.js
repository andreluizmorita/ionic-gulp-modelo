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
            'url':'http://localhost:8001/api/provafacil/',
            'timeout':100000,
            'version_api':'v1',
            'version_app':'0.0.1'
        },
        'auth':{
            'grant_type':'auth',
            'client_id':'provafacil',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709'
        }
	}
);

})();
(function() {
'use strict';

angular
.module('app.module')
.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$state','$scope','APP'];

function AppCtrl ($state,$scope,APP){  
    var vm = this;
    
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
            function(response, status, headers, config) {
                console.log(response);
                console.log(status);
                console.log(headers);
                console.log(config);

                APP.user.oauth = {
                    access_token: response.access_token,
                    refresh_token: response.refresh_token,
                    expires_in: response.expires_in,
                    token_type: response.token_type
                };

                $scope.perfil();
            }, 
            function(response) {
                console.log(response);
            });
    }

    function perfil(){
        ProfileFactory.get({access_token:APP.user.oauth.access_token},
            function(response){
                console.log(response);
            });
    }

    $timeout(function(){
        $scope.logar();
    }, 1000);
}

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
        'login':{ method: 'POST', timeout:APP.system.timeout },
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
.factory('HttpInterceptorFactory', HttpInterceptorFactory);

HttpInterceptorFactory.$inject = ['$resource','$state','APP'];

function httpInterceptor($q, $injector){
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLmpzIiwiaG9tZS9ob21lLm1vZHVsZS5qcyIsImxvZ2luL2xvZ2luLm1vZHVsZS5qcyIsImFwcC9hcHAuY29uc3RhbnRzLmpzIiwiYXBwL2FwcC5jb250cm9sbGVyLmpzIiwiYXBwL2FwcC5ydW4uanMiLCJob21lL2hvbWUuY29udHJvbGxlci5qcyIsImhvbWUvaG9tZS5mYWN0b3J5LmpzIiwibG9naW4vbG9naW4uY29udHJvbGxlci5qcyIsImxvZ2luL2xvZ2luLmZhY3RvcnkuanMiLCJsb2dvdXQvbG9nb3V0LmNvbnRyb2xsZXIuanMiLCJhcHAvZmFjdG9yaWVzL2FwcC1hdXRoLmZhY3RvcnkuanMiLCJhcHAvZmFjdG9yaWVzL2FwcC1wcm9maWxlLmZhY3RvcnkuanMiLCJhcHAvZmFjdG9yaWVzL2FwcC5mYWN0b3J5LmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDakZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDMUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQy9EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNwQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6InNjcmlwdHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXIubW9kdWxlKCdhcHAubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnYXBwJywge1xuICAgICAgICB1cmw6ICcvYXBwJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzL21lbnUtbGVmdC52aWV3Lmh0bWwnXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC5wbGF5bGlzdHMnLCB7XG4gICAgICAgIHVybDogJy9wbGF5bGlzdHMnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzL21lbnUvcGxheWxpc3RzLmh0bWwnXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2FwcC92aWV3cy9hcHAuY29udHJvbGxlci5qcydcbiAgICAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIF0pO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDgnLCB7XG4gICAgICAgIHVybDogJy80MDgnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDA4LnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDQnLCB7XG4gICAgICAgIHVybDogJy80MDQnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDA0LnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC40MDAnLCB7XG4gICAgICAgIHVybDogJy80MDAnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNDAwLnZpZXcuaHRtbCcsXG4gICAgfSlcbiAgICAuc3RhdGUoJ2FwcC41MDAnLCB7XG4gICAgICAgIHVybDogJy81MDAnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9hcHAvdmlld3MvNTAwLnZpZXcuaHRtbCdcbiAgICB9KTtcbiAgICAvLyAuc3RhdGUoJ2xvZ2luJywge1xuICAgIC8vICAgICB1cmw6ICcvbG9naW4nLFxuICAgIC8vICAgICBsb2dpblJlcXVpcmVkOiB0cnVlLFxuICAgIC8vICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgLy8gICAgIHJlc29sdmU6IHtcbiAgICAvLyAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLmZhY3RvcnkuanMnLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgXVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgXSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfSk7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn1cblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2hvbWUubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyKXtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdGVtcGxhdGVzL2lvbmljL21lbnUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdob21lLnByaW5jaXBhbCcsIHtcbiAgICAgICAgdXJsOiAnL2hvbWUtcHJpbmNpcGFsJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnaGN0cmwnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvaG9tZS9ob21lLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcdCdzZWN0aW9ucy9ob21lL2hvbWUuZmFjdG9yeS5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbG9naW4ubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIGxvZ2luUmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvbG9naW4vbG9naW4udmlldy5odG1sJ1xuICAgIH0pO1xufVxuXG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAuY29uc3RhbnRzJywgW10pXG4uY29uc3RhbnQoXG4gICAgJ0FQUCcse1xuICAgIFx0J3VzZXInOiB7XG4gICAgXHRcdCdvYXV0aCc6ZmFsc2UsXG4gICAgXHRcdCdwcm9maWxlJzp7fSxcbiAgICBcdH0sXG4gICAgICAgICdzeXN0ZW0nOntcbiAgICAgICAgICAgIC8vJ3VybCc6J2h0dHA6Ly9sb2NhbGhvc3Q6ODA4MC9zZXJ2ZXIuZXRhcGFkaWdpdGFsL2V0YXBhZGlnaXRhbC5jb20uYnIvYXBwL3B1YmxpYy9hcGkvcHJvdmFmYWNpbC8nLFxuICAgICAgICAgICAgJ3VybCc6J2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMS9hcGkvcHJvdmFmYWNpbC8nLFxuICAgICAgICAgICAgJ3RpbWVvdXQnOjEwMDAwMCxcbiAgICAgICAgICAgICd2ZXJzaW9uX2FwaSc6J3YxJyxcbiAgICAgICAgICAgICd2ZXJzaW9uX2FwcCc6JzAuMC4xJ1xuICAgICAgICB9LFxuICAgICAgICAnYXV0aCc6e1xuICAgICAgICAgICAgJ2dyYW50X3R5cGUnOidhdXRoJyxcbiAgICAgICAgICAgICdjbGllbnRfaWQnOidwcm92YWZhY2lsJyxcbiAgICAgICAgICAgICdjbGllbnRfc2VjcmV0JzonZGEzOWEzZWU1ZTZiNGIwZDMyNTViZmVmOTU2MDE4OTBhZmQ4MDcwOSdcbiAgICAgICAgfVxuXHR9XG4pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uY29udHJvbGxlcignQXBwQ3RybCcsQXBwQ3RybCk7XG5cbkFwcEN0cmwuJGluamVjdCA9IFsnJHN0YXRlJywnJHNjb3BlJywnQVBQJ107XG5cbmZ1bmN0aW9uIEFwcEN0cmwgKCRzdGF0ZSwkc2NvcGUsQVBQKXsgIFxuICAgIHZhciB2bSA9IHRoaXM7XG4gICAgXG59XG59KSgpOyIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAucnVuJywgW10pXG4ucnVuKFsnJHJvb3RTY29wZScsJyRsb2NhdGlvbicsJyRzdGF0ZScsJyRpb25pY1BsYXRmb3JtJywnQVBQJyxmdW5jdGlvbiAoJHJvb3RTY29wZSwgJGxvY2F0aW9uLCRzdGF0ZSwkaW9uaWNQbGF0Zm9ybSxBUFApIHtcbiAgICBcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhuZXh0KTtcblxuICAgICAgICBpZihuZXh0LmxvZ2luUmVxdWlyZWQpe1xuICAgICAgICAgICAgaWYoQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuLmxlbmdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExvYWRpbmdcbiAgICAkcm9vdFNjb3BlLiRvbignbG9hZGluZzpzaG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRpb25pY0xvYWRpbmcuc2hvdyh7dGVtcGxhdGU6Jzxpb24tc3Bpbm5lcj48L2lvbi1zcGlubmVyPid9KTtcbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKCdsb2FkaW5nOmhpZGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAkaW9uaWNMb2FkaW5nLmhpZGUoKTtcbiAgICB9KTtcblxufV0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnaG9tZS5tb2R1bGUnKVxuLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJyxIb21lQ3RybCk7XG5cbkhvbWVDdHJsLiRpbmplY3QgPSBbJyRzdGF0ZScsJyRzY29wZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBIb21lQ3RybCAoJHN0YXRlLCRzY29wZSxBUFApeyAgXG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgIFxufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnaG9tZS5tb2R1bGUnLCBbXSlcbi5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCcsIGZ1bmN0aW9uKCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL2xvZ2luJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0geyBcbiAgICBcdGVtYWlsOiAnQHVzZXInLCBwYXNzd29yZDogJ0BwYXNzJyB9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgICAnbG9naW4nOnsgbWV0aG9kOiAnUE9TVCcsIHRpbWVvdXQ6QVBQLnN5c3RlbS50aW1lb3V0IH0sXG4gICAgfTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1dKVxuLmZhY3RvcnkoJ1Byb2ZpbGVGYWN0b3J5JywgWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnLCBmdW5jdGlvbigkcmVzb3VyY2UsJHN0YXRlLEFQUCkge1xuXG4gICAgdmFyIHVybCA9IEFQUC5zeXN0ZW0udXJsK0FQUC5zeXN0ZW0udmVyc2lvbl9hcGkrJy9wcm9maWxlJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0ge307XG4gICAgXG4gICAgdmFyIGFjdGlvbnMgPSB7fTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2xvZ2luLm1vZHVsZScpXG4uY29udHJvbGxlcignTG9naW5DdHJsJyxMb2dpbkN0cmwpO1xuXG5Mb2dpbkN0cmwuJGluamVjdCA9IFsnJHN0YXRlJywnJHNjb3BlJywnJGh0dHAnLCckdGltZW91dCcsJ0FQUCcsJ0xvZ2luRmFjdG9yeScsJ1Byb2ZpbGVGYWN0b3J5J107XG5cbmZ1bmN0aW9uIExvZ2luQ3RybCAoJHN0YXRlLCRzY29wZSwkaHR0cCwkdGltZW91dCxBUFAsTG9naW5GYWN0b3J5LFByb2ZpbGVGYWN0b3J5KXsgIFxuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAvLyAtLSBWQVJJQUJMRVMgLS0tLS0tLS0tLS1cbiAgICB2bS5mb3JtRGF0YSA9IHsgdXNlcm5hbWU6J2FuZHJlLm1vcml0YUBldGFwYS5jb20uYnInLCBwYXNzd29yZDonMTIzNGFiY0AnIH07XG5cbiAgICAvLyAtLSBGVU5DVElPTlMgLS0tLS0tLS0tLS1cbiAgICAkc2NvcGUubG9nYXIgPSBsb2dhcjsgICAgIFxuICAgICRzY29wZS5wZXJmaWwgPSBwZXJmaWw7ICAgICBcblxuICAgIGZ1bmN0aW9uIGxvZ2FyKCkge1xuICAgICAgICB2bS5wb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB2bS5mb3JtRGF0YS51c2VybmFtZSwgXG4gICAgICAgICAgICBwYXNzd29yZDogdm0uZm9ybURhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICBjbGllbnRfaWQ6IEFQUC5hdXRoLmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IEFQUC5hdXRoLmNsaWVudF9zZWNyZXQsXG4gICAgICAgICAgICBncmFudF90eXBlOiBBUFAuYXV0aC5ncmFudF90eXBlLFxuICAgICAgICAgICAgdmVyc2lvbl9hcGk6IEFQUC5zeXN0ZW0udmVyc2lvbl9hcGksXG4gICAgICAgICAgICB2ZXJzaW9uX2FwcDogQVBQLnN5c3RlbS52ZXJzaW9uX2FwcFxuICAgICAgICB9O1xuXG4gICAgICAgIExvZ2luRmFjdG9yeS5sb2dpbiggdm0ucG9zdERhdGEsXG4gICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSwgc3RhdHVzLCBoZWFkZXJzLCBjb25maWcpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coc3RhdHVzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhoZWFkZXJzKTtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhjb25maWcpO1xuXG4gICAgICAgICAgICAgICAgQVBQLnVzZXIub2F1dGggPSB7XG4gICAgICAgICAgICAgICAgICAgIGFjY2Vzc190b2tlbjogcmVzcG9uc2UuYWNjZXNzX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICByZWZyZXNoX3Rva2VuOiByZXNwb25zZS5yZWZyZXNoX3Rva2VuLFxuICAgICAgICAgICAgICAgICAgICBleHBpcmVzX2luOiByZXNwb25zZS5leHBpcmVzX2luLFxuICAgICAgICAgICAgICAgICAgICB0b2tlbl90eXBlOiByZXNwb25zZS50b2tlbl90eXBlXG4gICAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICAgICRzY29wZS5wZXJmaWwoKTtcbiAgICAgICAgICAgIH0sIFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwZXJmaWwoKXtcbiAgICAgICAgUHJvZmlsZUZhY3RvcnkuZ2V0KHthY2Nlc3NfdG9rZW46QVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VufSxcbiAgICAgICAgICAgIGZ1bmN0aW9uKHJlc3BvbnNlKXtcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhyZXNwb25zZSk7XG4gICAgICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAkdGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICAkc2NvcGUubG9nYXIoKTtcbiAgICB9LCAxMDAwKTtcbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2xvZ2luLm1vZHVsZScpXG4uZmFjdG9yeSgnTG9naW5GYWN0b3J5JywgTG9naW5GYWN0b3J5KTtcblxuTG9naW5GYWN0b3J5LiRpbmplY3QgPSBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBMb2dpbkZhY3RvcnkgKCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL2xvZ2luJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0ge2VtYWlsOiAnQHVzZXInLCBwYXNzd29yZDogJ0BwYXNzJyB9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgICAnbG9naW4nOnsgbWV0aG9kOiAnUE9TVCcsIHRpbWVvdXQ6QVBQLnN5c3RlbS50aW1lb3V0IH0sXG4gICAgfTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1cblxufSkoKTsiLCIiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLmZhY3RvcnkoJ0F1dGhGYWN0b3J5JywgQXV0aEZhY3RvcnkpO1xuXG5BdXRoRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gQXV0aEZhY3RvcnkoJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciB1cmwgPSBBUFAuc3lzdGVtLnVybCtBUFAuc3lzdGVtLnZlcnNpb25fYXBpKycvcHJvZmlsZSc7XG5cbiAgICB2YXIgcGFyYW1EZWZhdWx0cyA9IHt9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgIFx0J3JlZnJlc2gnOiB7IG1ldGhvZDogJ1BPU1QnLCB0aW1lb3V0OkFQUC5zeXN0ZW0udGltZW91dCB9XG4gICBcdH07XG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdQcm9maWxlRmFjdG9yeScsIFByb2ZpbGVGYWN0b3J5KTtcblxuUHJvZmlsZUZhY3RvcnkuJGluamVjdCA9IFsnJHJlc291cmNlJywnJHN0YXRlJywnQVBQJ107XG5cbmZ1bmN0aW9uIFByb2ZpbGVGYWN0b3J5KCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL3Byb2ZpbGUnO1xuXG4gICAgdmFyIHBhcmFtRGVmYXVsdHMgPSB7fTtcbiAgICBcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuXG4gICAgcmV0dXJuICRyZXNvdXJjZSh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMpO1xufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uZmFjdG9yeSgnSHR0cEludGVyY2VwdG9yRmFjdG9yeScsIEh0dHBJbnRlcmNlcHRvckZhY3RvcnkpO1xuXG5IdHRwSW50ZXJjZXB0b3JGYWN0b3J5LiRpbmplY3QgPSBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBodHRwSW50ZXJjZXB0b3IoJHEsICRpbmplY3Rvcil7XG5cdHJldHVybiB7XG5cdFx0cmVzcG9uc2VFcnJvcjogZnVuY3Rpb24ocmVqZWN0aW9uKSB7XG5cdFx0XHRjb25zb2xlLmxvZygncmVqZWN0aW9uJywgcmVqZWN0aW9uKTtcblx0XHRcdGNvbnNvbGUubG9nKCRpbmplY3Rvcik7XG5cdFx0XHRpZiAocmVqZWN0aW9uLnN0YXR1cyA+PSA0MDAgJiYgcmVqZWN0aW9uLnN0YXR1cyA8IDQwNCl7XG5cdFx0XHRcdCRpbmplY3Rvci5nZXQoJyRzdGF0ZScpLnRyYW5zaXRpb25UbygnYWNjZXNzLnNpZ25pbicpO1xuXHRcdFx0fVxuXHRcdFx0cmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuXHRcdH1cblx0fTtcbn1cblxufSkoKTsiLCIvLyBJb25pYyBTdGFydGVyIEFwcFxuXG4vLyBhbmd1bGFyLm1vZHVsZSBpcyBhIGdsb2JhbCBwbGFjZSBmb3IgY3JlYXRpbmcsIHJlZ2lzdGVyaW5nIGFuZCByZXRyaWV2aW5nIEFuZ3VsYXIgbW9kdWxlc1xuLy8gJ3N0YXJ0ZXInIGlzIHRoZSBuYW1lIG9mIHRoaXMgYW5ndWxhciBtb2R1bGUgZXhhbXBsZSAoYWxzbyBzZXQgaW4gYSA8Ym9keT4gYXR0cmlidXRlIGluIGluZGV4Lmh0bWwpXG4vLyB0aGUgMm5kIHBhcmFtZXRlciBpcyBhbiBhcnJheSBvZiAncmVxdWlyZXMnXG4vLyAnc3RhcnRlci5jb250cm9sbGVycycgaXMgZm91bmQgaW4gY29udHJvbGxlcnMuanNcbmFuZ3VsYXIubW9kdWxlKCdzdGFydGVyJywgW1xuICAgICdpb25pYycsXG4gICAgJ25nUmVzb3VyY2UnLCBcbiAgICAnYXBwLmNvbnN0YW50cycsXG4gICAgJ2FwcC5ydW4nLFxuICAgICdhcHAubW9kdWxlJyxcbiAgICAnbG9naW4ubW9kdWxlJ1xuXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
