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

angular
.module('example.module', []);

})();
(function() {
'use strict';

angular
.module('login.module', []);

})();
(function() {
'use strict';

angular
.module('app.module')
.directive('toggleSubmenu', toggleSubmenu);

function toggleSubmenu() {
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function(){
                element.next().slideToggle(200);
                element.parent().toggleClass('toggled');
            });
        }
    };
}
})();
(function() {
'use strict';

angular
.module('app.module')
.filter('fase', function(){
    return function(data) {
        var out;
        
        if(data==='1'){
            out = '1ª fase';
        }else if(data==='2'){
            out = '2ª fase';
        }else if(data==='3'){
            out = '3ª fase';
        }else if(data==='simulado'){
            out = 'Simulado';
        }else if(data==='u'){
            out = 'Fase única';
        }else{
            out = '-';
        }
        return out;
    };
})
.filter('databr', function(){
    return function(input){
        input = input || '';
        var out = '-';

        comhora = input.split(" ");
        sodata = comhora[0].split("-");
        out = sodata[2]+'/'+sodata[1]+'/'+(sodata[0].substr(2, 3));

        return out;
    };
})
.filter('databr_hora', function(){
    return function(input){
        input = input || '';
        var out = '-';

        if(input !== ''){
            var comhora = input.split(" ");
            var sodata = comhora[0].split("-");
            var hora = comhora[1].split(":");

            out = sodata[2]+'/'+sodata[1]+'/'+(sodata[0].substr(2, 3))+' '+hora[0]+':'+hora[1];
        }   

        return out;
    };
});
})();

(function() {
'use strict';

angular
.module('example.module')
.service('ExampleService', ExampleService);

ExampleService.$inject = ['$resource','$state','APP'];

function ExampleService ($resource,$state,APP) {

    var service = {
    	nomeMetodo: nomeMetodo
    };

    return service;

    function nomeMetodo(){
    	
    }
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
.module('login.module')
.factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['$resource','$state','APP'];

function LoginFactory ($resource,$state,APP) {

    var url = APP.system.urlOauth+'oauth/token';

    var paramDefaults = {email: '@user', password: '@pass' };
    
    var actions = {
        'login':{ method: 'POST',timeout:APP.system.timeout}
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
.factory('IonicExampleFactory', IonicExampleFactory);

IonicExampleFactory.$inject = ['$resource','$state','APP'];

function IonicExampleFactory($resource,$state,APP) {

  	var chats = [{
		id: 0,
		name: 'Ben Sparrow',
		lastText: 'You on your way?',
		face: 'assets/img/ben.png'
	}, {
		id: 1,
		name: 'Max Lynx',
		lastText: 'Hey, it\'s me',
		face: 'assets/img/max.png'
	}, {
		id: 2,
		name: 'Adam Bradleyson',
		lastText: 'I should buy a boat',
		face: 'assets/img/adam.jpg'
	}, {
		id: 3,
		name: 'Perry Governor',
		lastText: 'Look at my mukluks!',
		face: 'assets/img/perry.png'
	}, {
		id: 4,
		name: 'Mike Harrington',
		lastText: 'This is wicked good ice cream.',
		face: 'assets/img/mike.png'
	}];

	return {
		all: function() {
			return chats;
		},
		remove: function(chat) {
			chats.splice(chats.indexOf(chat), 1);
		},
		get: function(chatId) {
			for (var i = 0; i < chats.length; i++) {
				if (chats[i].id === parseInt(chatId)) {
				  return chats[i];
				}
			}
			return null;
		}
	};
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
.module('app.module')
.run(run);

run.$inject = ['$rootScope','$location','$state','$ionicPlatform','APP','PassportService'];

function run($rootScope, $location,$state,$ionicPlatform,APP,PassportService){

    $ionicPlatform.ready(function() {
        if (window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
            cordova.plugins.Keyboard.disableScroll(true);
        }

        if (window.StatusBar) {
            StatusBar.styleDefault();
        }
    });

    // Loading
    $rootScope.$on('loading:show', function() {
        $ionicLoading.show({template:'<ion-spinner></ion-spinner>'});
    });

    $rootScope.$on('loading:hide', function(){
        $ionicLoading.hide();
    });
   
    $rootScope.$on("$stateChangeStart", function(event, next, current){
            
        if(next.loginRequired === true){

            // if (PassportService.getToken()!==false) {

            //     if(typeof APP.user.passport.access_token === 'undefined' || APP.passport.authenticated === false) {
            //         if(next.name != 'login'){
            //             $location.path('login').replace();
            //         }
            //     } 
            // }

            console.info('RUN: TRUE',next); 
        }else{
            console.info('RUN: FALSE',next);
        }

    });
}

})();
(function() {
'use strict';

angular
.module('example.module')
.config(config);

config.$inject = ['$stateProvider'];

function config ($stateProvider){

    $stateProvider
    .state ('example', {
        url: '/example',
        abstract: true,
		templateUrl: 'sections/example/example-tabs.view.html',
    })
    .state ('example.dash', {
        url: '/example-dash',
        loginRequired: false,
        views: {
			'content': {
				templateUrl: 'sections/example/example-dash.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    })
    .state ('example.chats', {
        url: '/example-chats',
        loginRequired: false,
        views: {
			'content': {
				templateUrl: 'sections/example/example-chats.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    })
    .state ('example.chat', {
        url: '/example-chat/:chatId',
        loginRequired: false,
        views: {
            'content': {
                templateUrl: 'sections/example/example-chat-details.view.html',
                controller: 'ExampleCtrl',
                controllerAs: 'ectrl'
            }
        }
    })
    .state ('example.account', {
        url: '/example-account',
        loginRequired: false,
        views: {
			'content': {
				templateUrl: 'sections/example/example-account.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    });

}

})();
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
(function() {
'use strict';

angular
.module('app.constants', [])
.constant(
    'APP',{
        'user': {
            'passport':{},
            'profile':{},
            'data':{}
        },
        'system':{
            
            'url':'http://localhost:8000/api/',
            'urlOauth':'http://localhost:8000/',
            
            'timeout':10000,
            'version_api':'v1',
            'version_app':'0.0.1'
        },
        'oauth':{
            'grant_type':'password',
            'client_id':'clientauth',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709',
            'authenticated':false,
            'type':'oauth'
        },
        'passport':{
            'grant_type':'password',
            'client_id':'4',
            'client_secret':'9vVVuz8Bv0qHLSkeCtdm2KgG89fMG30Mt1ukaCWE',
            'authenticated':false,
            'type':'passport'

        }
    }
);

})();
(function() {
'use strict';

angular
.module('app.module')
.controller('AppCtrl',AppCtrl);

AppCtrl.$inject = ['$timeout', '$state', '$scope', 'AppService','APP'];

function AppCtrl ($timeout, $state, $scope, AppService,APP){  
    var vm = this;
    
}
})();
(function() {
'use strict';

angular
.module('example.module')
.controller('ExampleCtrl',ExampleCtrl);

ExampleCtrl.$inject = ['$state','$scope','$stateParams','APP','IonicExampleFactory'];

function ExampleCtrl ($state,$scope,$stateParams,APP,IonicExampleFactory){  
    var vm = this;

    vm.settings = { enableFriends: 0};

  	vm.chats = IonicExampleFactory.all();
  	
  	vm.remove = function(chat) {
    	IonicExampleFactory.remove(chat);
  	};

  	vm.chatId = $stateParams.chatId;

  	if(vm.chatId != 'undefinide') {
  		vm.chat = IonicExampleFactory.get($stateParams.chatId);
  	}
}

})();
(function() {
'use strict';

angular
.module('login.module')
.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$state','$scope','$http','$timeout','$window','APP','LoginFactory','PassportService'];

function LoginCtrl ($state,$scope,$http,$timeout,$window,APP,LoginFactory,PassportService){  
    var vm = this;

    // -- VARIABLES -----------
    vm.formData = { username:'andre.morita@etapa.com.br', password:'teste' };
    //vm.formData = { username:'', password:'' };

    // -- FUNCTIONS -----------
    vm.logar = logar;      

    function logar() {

        $state.go('example.dash');

        vm.postData = {
            username: vm.formData.username, 
            password: vm.formData.password,
            client_id: APP.passport.client_id,
            client_secret: APP.passport.client_secret,
            grant_type: APP.passport.grant_type,
            scope: '*',
            version_api: APP.system.version_api,
            version_app: APP.system.version_app
        };

        // LoginFactory.login( vm.postData, function(response) {
            
        // }, function(err) {
        //     //AppService.growl('Ocorreu um erro, por favor tente novamente.','danger');
        // });
    }

    // $timeout(function(){
    //     //vm.logar();
    // }, 1000);

    vm.login = 1;
    vm.register = 0;
    vm.forgot = 0;

}

})();


(function() {
'use strict';

angular
.module('app.module')
.service('AppService', AppService);

AppService.$inject = ['APP','$resource'];

function AppService(APP,$resource) {

    var services = {
        growl: growl,
        getMessage: getMessage,
        getBestselling: getBestselling
    };

    return services;

    function growl(message, type) {
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    }

    function getMessage(img, user, text){
        var gmList = $resource("data/messages-notifications.json");
            
        return gmList.get({
            img: img,
            user: user,
            text: text
        });
    }

    function getBestselling(img, name, range) {
        var gbList = $resource("data/best-selling.json");
    
        return gbList.get({
            img: img,
            name: name,
            range: range,
        });
    }
}

})();
angular.module('starter', [
    'ionic',
    'ngResource', 
    'app.constants',
    'ui.router',
    'oc.lazyLoad',
    'app.module',
    'login.module',
    'example.module'
]);
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLmpzIiwiZXhhbXBsZS9leGFtcGxlLm1vZHVsZS5qcyIsImxvZ2luL2xvZ2luLm1vZHVsZS5qcyIsImFwcC9kaXJlY3RpdmVzL2FwcC1leGFtcGxlLmRpcmVjdGl2ZS5qcyIsImFwcC9maWx0ZXJzL2FwcC1leGFtcGxlLmZpbHRlci5qcyIsImV4YW1wbGUvZXhhbXBsZS5zZXJ2aWNlLmpzIiwiYXBwL3Bhc3Nwb3J0L3Bhc3Nwb3J0LnNlcnZpY2UuanMiLCJsb2dpbi9sb2dpbi5mYWN0b3J5LmpzIiwiYXBwL2ZhY3Rvcmllcy9hcHAtZXhhbXBsZS5mYWN0b3J5LmpzIiwiYXBwL2ZhY3Rvcmllcy9hcHAtZXhhbXBsZTIuZmFjdG9yeS5qcyIsImFwcC9wYXNzcG9ydC9wYXNzcG9ydC1pbnRlcmNlcHRvci5mYWN0b3J5LmpzIiwiYXBwL2FwcC5ydW4uanMiLCJleGFtcGxlL2V4YW1wbGUucm91dGUuanMiLCJsb2dpbi9sb2dpbi5yb3V0ZS5qcyIsImFwcC9hcHAuY29uc3RhbnRzLmpzIiwiYXBwL2FwcC5jb250cm9sbGVyLmpzIiwiZXhhbXBsZS9leGFtcGxlLmNvbnRyb2xsZXIuanMiLCJsb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwibG9nb3V0L2xvZ291dC5jb250cm9sbGVyLmpzIiwiYXBwL3NlcnZpY2VzL2FwcC1zZXJ2aWNlLmpzIiwiYXBwLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNOQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3hEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3pEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3RCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BEQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNoRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoic2NyaXB0cy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2FwcC5tb2R1bGUnLFtdKVxuLmNvbmZpZyhjb25maWcpO1xuXG5jb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInLCckaHR0cFByb3ZpZGVyJ107XG5cbmZ1bmN0aW9uIGNvbmZpZyAoJHN0YXRlUHJvdmlkZXIsJHVybFJvdXRlclByb3ZpZGVyLCRodHRwUHJvdmlkZXIpe1xuXG4gICAgLy8kaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdIdHRwSW50ZXJjZXB0b3JGYWN0b3J5Jyk7XG4vLyAgICAgJGh0dHBQcm92aWRlci5pbnRlcmNlcHRvcnMucHVzaChmdW5jdGlvbiBIdHRwSW50ZXJjZXB0b3JGYWN0b3J5KCRxLCAkaW5qZWN0b3Ipe1xuLy8gICAgIHJldHVybiB7XG4vLyAgICAgICAgIC8vIG9wdGlvbmFsIG1ldGhvZFxuLy8gICAgICAgICAvLyByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcbi8vICAgICAgICAgLy8gICAvLyBkbyBzb21ldGhpbmcgb24gc3VjY2Vzc1xuLy8gICAgICAgICAvLyAgIGNvbnNvbGUuaW5mbygncmVxdWVzdCcsY29uZmlnKTtcbi8vICAgICAgICAgLy8gICByZXR1cm4gY29uZmlnO1xuLy8gICAgICAgICAvLyB9LFxuLy8gICAgICAgICByZXF1ZXN0OiBmdW5jdGlvbihjb25maWcpIHtcbi8vICAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzID0gY29uZmlnLmhlYWRlcnMgfHwge307XG4gICAgICAgICAgICBcbi8vICAgICAgICAgICAgIGNvbmZpZy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSAnQmVhcmVyICcgKyBBUFAudXNlci5vYXV0aC5hY2Nlc3NfdG9rZW47XG4gICAgICAgICAgICBcbi8vICAgICAgICAgICAgIHJldHVybiBjb25maWcgfHwgJHEud2hlbihjb25maWcpO1xuLy8gICAgICAgICB9LFxuLy8gICAgICAgICAvLyBvcHRpb25hbCBtZXRob2Rcbi8vICAgICAgICAvLyByZXF1ZXN0RXJyb3I6IGZ1bmN0aW9uKHJlamVjdGlvbikge1xuLy8gICAgICAgIC8vICAgIGNvbnNvbGUuaW5mbygncmVxdWVzdEVycm9yJyxyZWplY3QpO1xuXG4gICAgICAgICAgXG4vLyAgICAgICAgLy8gICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuLy8gICAgICAgIC8vICB9LFxuXG5cblxuLy8gICAgICAgICAvLyBvcHRpb25hbCBtZXRob2Rcbi8vICAgICAgICAgLy8gcmVzcG9uc2U6IGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4vLyAgICAgICAgIC8vICAgY29uc29sZS5pbmZvKCdyZXNwb25zZScscmVzcG9uc2UpO1xuLy8gICAgICAgICAvLyAgIHJldHVybiByZXNwb25zZTtcbi8vICAgICAgICAgLy8gfSxcblxuLy8gICAgICAgICAvLyBvcHRpb25hbCBtZXRob2Rcbi8vICAgICAgICAvLyByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZWplY3Rpb24pIHtcbi8vICAgICAgICAvLyAgICAvLyBkbyBzb21ldGhpbmcgb24gZXJyb3Jcbi8vICAgICAgICAvLyAgICAgICAvL2NvbnNvbGUubG9nKHJlamVjdGlvbik7XG4vLyAgICAgICAgLy8gICAgICAgY29uc29sZS5pbmZvKCdyZWplY3Rpb24nLHJlamVjdGlvbik7XG4vLyAgICAgICAgLy8gICAgcmV0dXJuICRxLnJlamVjdChyZWplY3Rpb24pO1xuLy8gICAgICAgIC8vICB9XG4vLyAgICAgICB9O1xuLy8gfSk7XG4gICAgXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2FwcC92aWV3cy9tZW51LWxlZnQudmlldy5odG1sJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAucGxheWxpc3RzJywge1xuICAgICAgICB1cmw6ICcvcGxheWxpc3RzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2FwcC92aWV3cy9tZW51L3BsYXlsaXN0cy5odG1sJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbigkb2NMYXp5TG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkIChbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdqcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9hcHAvdmlld3MvYXBwLmNvbnRyb2xsZXIuanMnXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDA4Jywge1xuICAgICAgICB1cmw6ICcvNDA4JyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzLzQwOC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDA0Jywge1xuICAgICAgICB1cmw6ICcvNDA0JyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzLzQwNC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDAwJywge1xuICAgICAgICB1cmw6ICcvNDAwJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzLzQwMC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNTAwJywge1xuICAgICAgICB1cmw6ICcvNTAwJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwL3ZpZXdzLzUwMC52aWV3Lmh0bWwnXG4gICAgfSk7XG4gICAgLy8gLnN0YXRlKCdsb2dpbicsIHtcbiAgICAvLyAgICAgdXJsOiAnL2xvZ2luJyxcbiAgICAvLyAgICAgbG9naW5SZXF1aXJlZDogdHJ1ZSxcbiAgICAvLyAgICAgdGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9sb2dpbi9sb2dpbi52aWV3Lmh0bWwnLFxuICAgIC8vICAgICByZXNvbHZlOiB7XG4gICAgLy8gICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbigkb2NMYXp5TG9hZCkge1xuICAgIC8vICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkIChbXG4gICAgLy8gICAgICAgICAgICAgICAgIHtcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdqcycsXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9sb2dpbi9sb2dpbi5mYWN0b3J5LmpzJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgICAgICAnc2VjdGlvbnMvbG9naW4vbG9naW4uY29udHJvbGxlci5qcydcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIF1cbiAgICAvLyAgICAgICAgICAgICAgICAgfVxuICAgIC8vICAgICAgICAgICAgIF0pO1xuICAgIC8vICAgICAgICAgfVxuICAgIC8vICAgICB9XG4gICAgICAgIFxuICAgIC8vIH0pO1xuXG4gICAgJHVybFJvdXRlclByb3ZpZGVyLm90aGVyd2lzZSgnL2xvZ2luJyk7XG59XG5cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2V4YW1wbGUubW9kdWxlJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnbG9naW4ubW9kdWxlJywgW10pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uZGlyZWN0aXZlKCd0b2dnbGVTdWJtZW51JywgdG9nZ2xlU3VibWVudSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZVN1Ym1lbnUoKSB7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgICAgICBlbGVtZW50LmNsaWNrKGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5uZXh0KCkuc2xpZGVUb2dnbGUoMjAwKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnBhcmVudCgpLnRvZ2dsZUNsYXNzKCd0b2dnbGVkJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uZmlsdGVyKCdmYXNlJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oZGF0YSkge1xuICAgICAgICB2YXIgb3V0O1xuICAgICAgICBcbiAgICAgICAgaWYoZGF0YT09PScxJyl7XG4gICAgICAgICAgICBvdXQgPSAnMcKqIGZhc2UnO1xuICAgICAgICB9ZWxzZSBpZihkYXRhPT09JzInKXtcbiAgICAgICAgICAgIG91dCA9ICcywqogZmFzZSc7XG4gICAgICAgIH1lbHNlIGlmKGRhdGE9PT0nMycpe1xuICAgICAgICAgICAgb3V0ID0gJzPCqiBmYXNlJztcbiAgICAgICAgfWVsc2UgaWYoZGF0YT09PSdzaW11bGFkbycpe1xuICAgICAgICAgICAgb3V0ID0gJ1NpbXVsYWRvJztcbiAgICAgICAgfWVsc2UgaWYoZGF0YT09PSd1Jyl7XG4gICAgICAgICAgICBvdXQgPSAnRmFzZSDDum5pY2EnO1xuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIG91dCA9ICctJztcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb3V0O1xuICAgIH07XG59KVxuLmZpbHRlcignZGF0YWJyJywgZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gZnVuY3Rpb24oaW5wdXQpe1xuICAgICAgICBpbnB1dCA9IGlucHV0IHx8ICcnO1xuICAgICAgICB2YXIgb3V0ID0gJy0nO1xuXG4gICAgICAgIGNvbWhvcmEgPSBpbnB1dC5zcGxpdChcIiBcIik7XG4gICAgICAgIHNvZGF0YSA9IGNvbWhvcmFbMF0uc3BsaXQoXCItXCIpO1xuICAgICAgICBvdXQgPSBzb2RhdGFbMl0rJy8nK3NvZGF0YVsxXSsnLycrKHNvZGF0YVswXS5zdWJzdHIoMiwgMykpO1xuXG4gICAgICAgIHJldHVybiBvdXQ7XG4gICAgfTtcbn0pXG4uZmlsdGVyKCdkYXRhYnJfaG9yYScsIGZ1bmN0aW9uKCl7XG4gICAgcmV0dXJuIGZ1bmN0aW9uKGlucHV0KXtcbiAgICAgICAgaW5wdXQgPSBpbnB1dCB8fCAnJztcbiAgICAgICAgdmFyIG91dCA9ICctJztcblxuICAgICAgICBpZihpbnB1dCAhPT0gJycpe1xuICAgICAgICAgICAgdmFyIGNvbWhvcmEgPSBpbnB1dC5zcGxpdChcIiBcIik7XG4gICAgICAgICAgICB2YXIgc29kYXRhID0gY29taG9yYVswXS5zcGxpdChcIi1cIik7XG4gICAgICAgICAgICB2YXIgaG9yYSA9IGNvbWhvcmFbMV0uc3BsaXQoXCI6XCIpO1xuXG4gICAgICAgICAgICBvdXQgPSBzb2RhdGFbMl0rJy8nK3NvZGF0YVsxXSsnLycrKHNvZGF0YVswXS5zdWJzdHIoMiwgMykpKycgJytob3JhWzBdKyc6Jytob3JhWzFdO1xuICAgICAgICB9ICAgXG5cbiAgICAgICAgcmV0dXJuIG91dDtcbiAgICB9O1xufSk7XG59KSgpO1xuIiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdleGFtcGxlLm1vZHVsZScpXG4uc2VydmljZSgnRXhhbXBsZVNlcnZpY2UnLCBFeGFtcGxlU2VydmljZSk7XG5cbkV4YW1wbGVTZXJ2aWNlLiRpbmplY3QgPSBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBFeGFtcGxlU2VydmljZSAoJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciBzZXJ2aWNlID0ge1xuICAgIFx0bm9tZU1ldG9kbzogbm9tZU1ldG9kb1xuICAgIH07XG5cbiAgICByZXR1cm4gc2VydmljZTtcblxuICAgIGZ1bmN0aW9uIG5vbWVNZXRvZG8oKXtcbiAgICBcdFxuICAgIH1cbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLnNlcnZpY2UoJ1Bhc3Nwb3J0U2VydmljZScsIFBhc3Nwb3J0U2VydmljZSk7XG5cblBhc3Nwb3J0U2VydmljZS4kaW5qZWN0ID0gWydBUFAnLCckcmVzb3VyY2UnLCAnJGh0dHAnLCAnJHdpbmRvdycsICckcSddO1xuXG5mdW5jdGlvbiBQYXNzcG9ydFNlcnZpY2UoQVBQLCRyZXNvdXJjZSwgJGh0dHAsICR3aW5kb3csICRxKSB7XG5cbiAgICByZXR1cm4ge1xuICAgICAgICBnZXRUb2tlbiA6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIHZhciB0b2tlbiA9IHR5cGVvZiAkd2luZG93LmxvY2FsU3RvcmFnZS50b2tlbjtcblxuICAgICAgICAgICAgaWYodG9rZW4gIT0gJ3VuZGVmaW5lZCcpe1xuICAgICAgICAgICAgICAgIHJldHVybiAkd2luZG93LmxvY2FsU3RvcmFnZS50b2tlbjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgXG4gICAgICAgIH0sXG4gICAgICAgIHNldFRva2VuOiBmdW5jdGlvbiAodG9rZW4pIHtcbiAgICAgICAgICAgICR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuID0gdG9rZW47XG4gICAgICAgIH0sXG4gICAgICAgIHNpZ25pbiA6IGZ1bmN0aW9uIChkYXRhKSB7XG4gICAgICAgICAgICAvLyRodHRwLnBvc3QoJ2FwaS9zaWduaW4nLCBkYXRhKTtcbiAgICAgICAgfSxcbiAgICAgICAgc2lnbnVwIDogZnVuY3Rpb24gKGRhdGEpIHtcbiAgICAgICAgICAgIC8vJGh0dHAucG9zdCgnYXBpL3NpZ251cCcsIGRhdGEpO1xuICAgICAgICB9LFxuICAgICAgICBsb2dvdXQgOiBmdW5jdGlvbiAoZGF0YSkge1xuICAgICAgICAgICAgLy9kZWxldGUgJGxvY2FsU3RvcmFnZS50b2tlbjtcbiAgICAgICAgICAgICRxLndoZW4oKTtcbiAgICAgICAgfVxuICAgIH07XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdsb2dpbi5tb2R1bGUnKVxuLmZhY3RvcnkoJ0xvZ2luRmFjdG9yeScsIExvZ2luRmFjdG9yeSk7XG5cbkxvZ2luRmFjdG9yeS4kaW5qZWN0ID0gWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnXTtcblxuZnVuY3Rpb24gTG9naW5GYWN0b3J5ICgkcmVzb3VyY2UsJHN0YXRlLEFQUCkge1xuXG4gICAgdmFyIHVybCA9IEFQUC5zeXN0ZW0udXJsT2F1dGgrJ29hdXRoL3Rva2VuJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0ge2VtYWlsOiAnQHVzZXInLCBwYXNzd29yZDogJ0BwYXNzJyB9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgICAnbG9naW4nOnsgbWV0aG9kOiAnUE9TVCcsdGltZW91dDpBUFAuc3lzdGVtLnRpbWVvdXR9XG4gICAgfTsgXG5cbiAgICByZXR1cm4gJHJlc291cmNlKHVybCwgcGFyYW1EZWZhdWx0cywgYWN0aW9ucyk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdQcm9maWxlRmFjdG9yeScsIFByb2ZpbGVGYWN0b3J5KTtcblxuUHJvZmlsZUZhY3RvcnkuJGluamVjdCA9IFsnJHJlc291cmNlJywnJHN0YXRlJywnQVBQJ107XG5cbmZ1bmN0aW9uIFByb2ZpbGVGYWN0b3J5KCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL3Byb2ZpbGUnO1xuXG4gICAgdmFyIHBhcmFtRGVmYXVsdHMgPSB7fTtcbiAgICBcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuXG4gICAgcmV0dXJuICRyZXNvdXJjZSh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMpO1xufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLm1vZHVsZScpXG4uZmFjdG9yeSgnSW9uaWNFeGFtcGxlRmFjdG9yeScsIElvbmljRXhhbXBsZUZhY3RvcnkpO1xuXG5Jb25pY0V4YW1wbGVGYWN0b3J5LiRpbmplY3QgPSBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBJb25pY0V4YW1wbGVGYWN0b3J5KCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgXHR2YXIgY2hhdHMgPSBbe1xuXHRcdGlkOiAwLFxuXHRcdG5hbWU6ICdCZW4gU3BhcnJvdycsXG5cdFx0bGFzdFRleHQ6ICdZb3Ugb24geW91ciB3YXk/Jyxcblx0XHRmYWNlOiAnYXNzZXRzL2ltZy9iZW4ucG5nJ1xuXHR9LCB7XG5cdFx0aWQ6IDEsXG5cdFx0bmFtZTogJ01heCBMeW54Jyxcblx0XHRsYXN0VGV4dDogJ0hleSwgaXRcXCdzIG1lJyxcblx0XHRmYWNlOiAnYXNzZXRzL2ltZy9tYXgucG5nJ1xuXHR9LCB7XG5cdFx0aWQ6IDIsXG5cdFx0bmFtZTogJ0FkYW0gQnJhZGxleXNvbicsXG5cdFx0bGFzdFRleHQ6ICdJIHNob3VsZCBidXkgYSBib2F0Jyxcblx0XHRmYWNlOiAnYXNzZXRzL2ltZy9hZGFtLmpwZydcblx0fSwge1xuXHRcdGlkOiAzLFxuXHRcdG5hbWU6ICdQZXJyeSBHb3Zlcm5vcicsXG5cdFx0bGFzdFRleHQ6ICdMb29rIGF0IG15IG11a2x1a3MhJyxcblx0XHRmYWNlOiAnYXNzZXRzL2ltZy9wZXJyeS5wbmcnXG5cdH0sIHtcblx0XHRpZDogNCxcblx0XHRuYW1lOiAnTWlrZSBIYXJyaW5ndG9uJyxcblx0XHRsYXN0VGV4dDogJ1RoaXMgaXMgd2lja2VkIGdvb2QgaWNlIGNyZWFtLicsXG5cdFx0ZmFjZTogJ2Fzc2V0cy9pbWcvbWlrZS5wbmcnXG5cdH1dO1xuXG5cdHJldHVybiB7XG5cdFx0YWxsOiBmdW5jdGlvbigpIHtcblx0XHRcdHJldHVybiBjaGF0cztcblx0XHR9LFxuXHRcdHJlbW92ZTogZnVuY3Rpb24oY2hhdCkge1xuXHRcdFx0Y2hhdHMuc3BsaWNlKGNoYXRzLmluZGV4T2YoY2hhdCksIDEpO1xuXHRcdH0sXG5cdFx0Z2V0OiBmdW5jdGlvbihjaGF0SWQpIHtcblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgY2hhdHMubGVuZ3RoOyBpKyspIHtcblx0XHRcdFx0aWYgKGNoYXRzW2ldLmlkID09PSBwYXJzZUludChjaGF0SWQpKSB7XG5cdFx0XHRcdCAgcmV0dXJuIGNoYXRzW2ldO1xuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm4gbnVsbDtcblx0XHR9XG5cdH07XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdQYXNzcG9ydEludGVyY2VwdG9yRmFjdG9yeScsIFBhc3Nwb3J0SW50ZXJjZXB0b3JGYWN0b3J5KTtcblxuUGFzc3BvcnRJbnRlcmNlcHRvckZhY3RvcnkuJGluamVjdCA9IFsnJHEnLCckd2luZG93JywnJGxvY2F0aW9uJ107XG5cbmZ1bmN0aW9uIFBhc3Nwb3J0SW50ZXJjZXB0b3JGYWN0b3J5KCRxLCR3aW5kb3csJGxvY2F0aW9uKSB7XG4gICAgXG4gICAgcmV0dXJuIHtcbiAgICAgICAgcmVxdWVzdDogZnVuY3Rpb24oY29uZmlnKSB7XG5cbiAgICAgICAgICAgIHZhciB1cmwgPSBjb25maWcudXJsO1xuICAgICAgICAgICAgdmFyIGluZGV4SHRtbCA9IHVybC5pbmRleE9mKCcuaHRtbCcpO1xuICAgICAgICAgICAgdmFyIGluZGV4SnNvbiA9IHVybC5pbmRleE9mKCcuanNvbicpO1xuICAgICAgICAgICAgdmFyIGluZGV4SHR0cCA9IHVybC5pbmRleE9mKCdodHRwczovLycpO1xuXG4gICAgICAgICAgICBpZihpbmRleEh0bWwgPT09IC0xICYmIGluZGV4SnNvbiA9PT0gLTEgJiYgaW5kZXhIdHRwID09PSAtMSl7XG4gICAgICAgICAgICAgICAgdmFyIHRva2VuID0gdHlwZW9mICR3aW5kb3cubG9jYWxTdG9yYWdlLnRva2VuO1xuXG4gICAgICAgICAgICAgICAgaWYodG9rZW4gIT09ICd1bmRlZmluZWQnKXtcbiAgICAgICAgICAgICAgICAgICAgXG4gICAgICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IHVybC5pbmRleE9mKCcvb2F1dGgvdG9rZW4nKTtcblxuICAgICAgICAgICAgICAgICAgICBpZiggaW5kZXggPT09IC0xKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBjb25maWcuaGVhZGVycy5BdXRob3JpemF0aW9uID0gJ0JlYXJlciAnICsgJHdpbmRvdy5sb2NhbFN0b3JhZ2UudG9rZW47XG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBjb25zb2xlLmluZm8oJ1Bhc3NQb3J0OnRva2VuJywgdG9rZW4pO1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gY29uc29sZS5pbmZvKCdQYXNzUG9ydDppbmRleCcsIGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnUGFzc1BvcnQ6aW5kZXhIdG1sJywgaW5kZXhIdG1sKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIGNvbnNvbGUuaW5mbygnUGFzc1BvcnQ6aW5kZXhKc29uJywgaW5kZXhKc29uKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFxuICAgICAgICAgICAgXG4gICAgICAgICAgICByZXR1cm4gY29uZmlnO1xuICAgICAgICB9LFxuICAgICAgICByZXNwb25zZUVycm9yOiBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgY29uc29sZS5pbmZvKCdQYXNzUG9ydDplcnJvckludGVyY2VwdG9yJywgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgICBpZiAocmVzcG9uc2Uuc3RhdHVzID09PSA0MDEgfHwgcmVzcG9uc2Uuc3RhdHVzID09PSA0MDMpIHtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnL2xvZ2luJykucmVwbGFjZSgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmKHJlc3BvbnNlLnN0YXR1cyA9PT0gNDA0KXtcbiAgICAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnLzQwNCcpLnJlcGxhY2UoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZihyZXNwb25zZS5zdGF0dXMgPT09IDUwMCl7XG4gICAgICAgICAgICAgICAgJGxvY2F0aW9uLnBhdGgoJy81MDAnKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHJldHVybiAkcS5yZWplY3QocmVzcG9uc2UpO1xuICAgICAgICB9XG4gICAgfTtcblxufVxuXG59KSgpOyIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5ydW4ocnVuKTtcblxucnVuLiRpbmplY3QgPSBbJyRyb290U2NvcGUnLCckbG9jYXRpb24nLCckc3RhdGUnLCckaW9uaWNQbGF0Zm9ybScsJ0FQUCcsJ1Bhc3Nwb3J0U2VydmljZSddO1xuXG5mdW5jdGlvbiBydW4oJHJvb3RTY29wZSwgJGxvY2F0aW9uLCRzdGF0ZSwkaW9uaWNQbGF0Zm9ybSxBUFAsUGFzc3BvcnRTZXJ2aWNlKXtcblxuICAgICRpb25pY1BsYXRmb3JtLnJlYWR5KGZ1bmN0aW9uKCkge1xuICAgICAgICBpZiAod2luZG93LmNvcmRvdmEgJiYgd2luZG93LmNvcmRvdmEucGx1Z2lucy5LZXlib2FyZCkge1xuICAgICAgICAgICAgY29yZG92YS5wbHVnaW5zLktleWJvYXJkLmhpZGVLZXlib2FyZEFjY2Vzc29yeUJhcih0cnVlKTtcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5kaXNhYmxlU2Nyb2xsKHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHdpbmRvdy5TdGF0dXNCYXIpIHtcbiAgICAgICAgICAgIFN0YXR1c0Jhci5zdHlsZURlZmF1bHQoKTtcbiAgICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gTG9hZGluZ1xuICAgICRyb290U2NvcGUuJG9uKCdsb2FkaW5nOnNob3cnLCBmdW5jdGlvbigpIHtcbiAgICAgICAgJGlvbmljTG9hZGluZy5zaG93KHt0ZW1wbGF0ZTonPGlvbi1zcGlubmVyPjwvaW9uLXNwaW5uZXI+J30pO1xuICAgIH0pO1xuXG4gICAgJHJvb3RTY29wZS4kb24oJ2xvYWRpbmc6aGlkZScsIGZ1bmN0aW9uKCl7XG4gICAgICAgICRpb25pY0xvYWRpbmcuaGlkZSgpO1xuICAgIH0pO1xuICAgXG4gICAgJHJvb3RTY29wZS4kb24oXCIkc3RhdGVDaGFuZ2VTdGFydFwiLCBmdW5jdGlvbihldmVudCwgbmV4dCwgY3VycmVudCl7XG4gICAgICAgICAgICBcbiAgICAgICAgaWYobmV4dC5sb2dpblJlcXVpcmVkID09PSB0cnVlKXtcblxuICAgICAgICAgICAgLy8gaWYgKFBhc3Nwb3J0U2VydmljZS5nZXRUb2tlbigpIT09ZmFsc2UpIHtcblxuICAgICAgICAgICAgLy8gICAgIGlmKHR5cGVvZiBBUFAudXNlci5wYXNzcG9ydC5hY2Nlc3NfdG9rZW4gPT09ICd1bmRlZmluZWQnIHx8IEFQUC5wYXNzcG9ydC5hdXRoZW50aWNhdGVkID09PSBmYWxzZSkge1xuICAgICAgICAgICAgLy8gICAgICAgICBpZihuZXh0Lm5hbWUgIT0gJ2xvZ2luJyl7XG4gICAgICAgICAgICAvLyAgICAgICAgICAgICAkbG9jYXRpb24ucGF0aCgnbG9naW4nKS5yZXBsYWNlKCk7XG4gICAgICAgICAgICAvLyAgICAgICAgIH1cbiAgICAgICAgICAgIC8vICAgICB9IFxuICAgICAgICAgICAgLy8gfVxuXG4gICAgICAgICAgICBjb25zb2xlLmluZm8oJ1JVTjogVFJVRScsbmV4dCk7IFxuICAgICAgICB9ZWxzZXtcbiAgICAgICAgICAgIGNvbnNvbGUuaW5mbygnUlVOOiBGQUxTRScsbmV4dCk7XG4gICAgICAgIH1cblxuICAgIH0pO1xufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnZXhhbXBsZS5tb2R1bGUnKVxuLmNvbmZpZyhjb25maWcpO1xuXG5jb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInXTtcblxuZnVuY3Rpb24gY29uZmlnICgkc3RhdGVQcm92aWRlcil7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSAoJ2V4YW1wbGUnLCB7XG4gICAgICAgIHVybDogJy9leGFtcGxlJyxcbiAgICAgICAgYWJzdHJhY3Q6IHRydWUsXG5cdFx0dGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9leGFtcGxlL2V4YW1wbGUtdGFicy52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlICgnZXhhbXBsZS5kYXNoJywge1xuICAgICAgICB1cmw6ICcvZXhhbXBsZS1kYXNoJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHZpZXdzOiB7XG5cdFx0XHQnY29udGVudCc6IHtcblx0XHRcdFx0dGVtcGxhdGVVcmw6ICdzZWN0aW9ucy9leGFtcGxlL2V4YW1wbGUtZGFzaC52aWV3Lmh0bWwnLFxuXHRcdFx0XHRjb250cm9sbGVyOiAnRXhhbXBsZUN0cmwnLFxuXHRcdFx0XHRjb250cm9sbGVyQXM6ICdlY3RybCdcblx0XHRcdH1cblx0XHR9XG4gICAgfSlcbiAgICAuc3RhdGUgKCdleGFtcGxlLmNoYXRzJywge1xuICAgICAgICB1cmw6ICcvZXhhbXBsZS1jaGF0cycsXG4gICAgICAgIGxvZ2luUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB2aWV3czoge1xuXHRcdFx0J2NvbnRlbnQnOiB7XG5cdFx0XHRcdHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvZXhhbXBsZS9leGFtcGxlLWNoYXRzLnZpZXcuaHRtbCcsXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdFeGFtcGxlQ3RybCcsXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2VjdHJsJ1xuXHRcdFx0fVxuXHRcdH1cbiAgICB9KVxuICAgIC5zdGF0ZSAoJ2V4YW1wbGUuY2hhdCcsIHtcbiAgICAgICAgdXJsOiAnL2V4YW1wbGUtY2hhdC86Y2hhdElkJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHZpZXdzOiB7XG4gICAgICAgICAgICAnY29udGVudCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2V4YW1wbGUvZXhhbXBsZS1jaGF0LWRldGFpbHMudmlldy5odG1sJyxcbiAgICAgICAgICAgICAgICBjb250cm9sbGVyOiAnRXhhbXBsZUN0cmwnLFxuICAgICAgICAgICAgICAgIGNvbnRyb2xsZXJBczogJ2VjdHJsJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfSlcbiAgICAuc3RhdGUgKCdleGFtcGxlLmFjY291bnQnLCB7XG4gICAgICAgIHVybDogJy9leGFtcGxlLWFjY291bnQnLFxuICAgICAgICBsb2dpblJlcXVpcmVkOiBmYWxzZSxcbiAgICAgICAgdmlld3M6IHtcblx0XHRcdCdjb250ZW50Jzoge1xuXHRcdFx0XHR0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2V4YW1wbGUvZXhhbXBsZS1hY2NvdW50LnZpZXcuaHRtbCcsXG5cdFx0XHRcdGNvbnRyb2xsZXI6ICdFeGFtcGxlQ3RybCcsXG5cdFx0XHRcdGNvbnRyb2xsZXJBczogJ2VjdHJsJ1xuXHRcdFx0fVxuXHRcdH1cbiAgICB9KTtcblxufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnbG9naW4ubW9kdWxlJylcbi5jb25maWcoY29uZmlnKTtcblxuY29uZmlnLiRpbmplY3QgPSBbJyRzdGF0ZVByb3ZpZGVyJywnJHVybFJvdXRlclByb3ZpZGVyJywnJGh0dHBQcm92aWRlcicsJ0FQUCddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlciwkaHR0cFByb3ZpZGVyLEFQUCl7XG5cdFxuXHQkaHR0cFByb3ZpZGVyLmludGVyY2VwdG9ycy5wdXNoKCdQYXNzcG9ydEludGVyY2VwdG9yRmFjdG9yeScpO1xuXHRcdFxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlICgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvbG9naW4vbG9naW4udmlldy5odG1sJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2VcbiAgICB9KTtcbn1cblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLmNvbnN0YW50cycsIFtdKVxuLmNvbnN0YW50KFxuICAgICdBUFAnLHtcbiAgICAgICAgJ3VzZXInOiB7XG4gICAgICAgICAgICAncGFzc3BvcnQnOnt9LFxuICAgICAgICAgICAgJ3Byb2ZpbGUnOnt9LFxuICAgICAgICAgICAgJ2RhdGEnOnt9XG4gICAgICAgIH0sXG4gICAgICAgICdzeXN0ZW0nOntcbiAgICAgICAgICAgIFxuICAgICAgICAgICAgJ3VybCc6J2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC9hcGkvJyxcbiAgICAgICAgICAgICd1cmxPYXV0aCc6J2h0dHA6Ly9sb2NhbGhvc3Q6ODAwMC8nLFxuICAgICAgICAgICAgXG4gICAgICAgICAgICAndGltZW91dCc6MTAwMDAsXG4gICAgICAgICAgICAndmVyc2lvbl9hcGknOid2MScsXG4gICAgICAgICAgICAndmVyc2lvbl9hcHAnOicwLjAuMSdcbiAgICAgICAgfSxcbiAgICAgICAgJ29hdXRoJzp7XG4gICAgICAgICAgICAnZ3JhbnRfdHlwZSc6J3Bhc3N3b3JkJyxcbiAgICAgICAgICAgICdjbGllbnRfaWQnOidjbGllbnRhdXRoJyxcbiAgICAgICAgICAgICdjbGllbnRfc2VjcmV0JzonZGEzOWEzZWU1ZTZiNGIwZDMyNTViZmVmOTU2MDE4OTBhZmQ4MDcwOScsXG4gICAgICAgICAgICAnYXV0aGVudGljYXRlZCc6ZmFsc2UsXG4gICAgICAgICAgICAndHlwZSc6J29hdXRoJ1xuICAgICAgICB9LFxuICAgICAgICAncGFzc3BvcnQnOntcbiAgICAgICAgICAgICdncmFudF90eXBlJzoncGFzc3dvcmQnLFxuICAgICAgICAgICAgJ2NsaWVudF9pZCc6JzQnLFxuICAgICAgICAgICAgJ2NsaWVudF9zZWNyZXQnOic5dlZWdXo4QnYwcUhMU2tlQ3RkbTJLZ0c4OWZNRzMwTXQxdWthQ1dFJyxcbiAgICAgICAgICAgICdhdXRoZW50aWNhdGVkJzpmYWxzZSxcbiAgICAgICAgICAgICd0eXBlJzoncGFzc3BvcnQnXG5cbiAgICAgICAgfVxuICAgIH1cbik7XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5jb250cm9sbGVyKCdBcHBDdHJsJyxBcHBDdHJsKTtcblxuQXBwQ3RybC4kaW5qZWN0ID0gWyckdGltZW91dCcsICckc3RhdGUnLCAnJHNjb3BlJywgJ0FwcFNlcnZpY2UnLCdBUFAnXTtcblxuZnVuY3Rpb24gQXBwQ3RybCAoJHRpbWVvdXQsICRzdGF0ZSwgJHNjb3BlLCBBcHBTZXJ2aWNlLEFQUCl7ICBcbiAgICB2YXIgdm0gPSB0aGlzO1xuICAgIFxufVxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2V4YW1wbGUubW9kdWxlJylcbi5jb250cm9sbGVyKCdFeGFtcGxlQ3RybCcsRXhhbXBsZUN0cmwpO1xuXG5FeGFtcGxlQ3RybC4kaW5qZWN0ID0gWyckc3RhdGUnLCckc2NvcGUnLCckc3RhdGVQYXJhbXMnLCdBUFAnLCdJb25pY0V4YW1wbGVGYWN0b3J5J107XG5cbmZ1bmN0aW9uIEV4YW1wbGVDdHJsICgkc3RhdGUsJHNjb3BlLCRzdGF0ZVBhcmFtcyxBUFAsSW9uaWNFeGFtcGxlRmFjdG9yeSl7ICBcbiAgICB2YXIgdm0gPSB0aGlzO1xuXG4gICAgdm0uc2V0dGluZ3MgPSB7IGVuYWJsZUZyaWVuZHM6IDB9O1xuXG4gIFx0dm0uY2hhdHMgPSBJb25pY0V4YW1wbGVGYWN0b3J5LmFsbCgpO1xuICBcdFxuICBcdHZtLnJlbW92ZSA9IGZ1bmN0aW9uKGNoYXQpIHtcbiAgICBcdElvbmljRXhhbXBsZUZhY3RvcnkucmVtb3ZlKGNoYXQpO1xuICBcdH07XG5cbiAgXHR2bS5jaGF0SWQgPSAkc3RhdGVQYXJhbXMuY2hhdElkO1xuXG4gIFx0aWYodm0uY2hhdElkICE9ICd1bmRlZmluaWRlJykge1xuICBcdFx0dm0uY2hhdCA9IElvbmljRXhhbXBsZUZhY3RvcnkuZ2V0KCRzdGF0ZVBhcmFtcy5jaGF0SWQpO1xuICBcdH1cbn1cblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2xvZ2luLm1vZHVsZScpXG4uY29udHJvbGxlcignTG9naW5DdHJsJyxMb2dpbkN0cmwpO1xuXG5Mb2dpbkN0cmwuJGluamVjdCA9IFsnJHN0YXRlJywnJHNjb3BlJywnJGh0dHAnLCckdGltZW91dCcsJyR3aW5kb3cnLCdBUFAnLCdMb2dpbkZhY3RvcnknLCdQYXNzcG9ydFNlcnZpY2UnXTtcblxuZnVuY3Rpb24gTG9naW5DdHJsICgkc3RhdGUsJHNjb3BlLCRodHRwLCR0aW1lb3V0LCR3aW5kb3csQVBQLExvZ2luRmFjdG9yeSxQYXNzcG9ydFNlcnZpY2UpeyAgXG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgIC8vIC0tIFZBUklBQkxFUyAtLS0tLS0tLS0tLVxuICAgIHZtLmZvcm1EYXRhID0geyB1c2VybmFtZTonYW5kcmUubW9yaXRhQGV0YXBhLmNvbS5icicsIHBhc3N3b3JkOid0ZXN0ZScgfTtcbiAgICAvL3ZtLmZvcm1EYXRhID0geyB1c2VybmFtZTonJywgcGFzc3dvcmQ6JycgfTtcblxuICAgIC8vIC0tIEZVTkNUSU9OUyAtLS0tLS0tLS0tLVxuICAgIHZtLmxvZ2FyID0gbG9nYXI7ICAgICAgXG5cbiAgICBmdW5jdGlvbiBsb2dhcigpIHtcblxuICAgICAgICAkc3RhdGUuZ28oJ2V4YW1wbGUuZGFzaCcpO1xuXG4gICAgICAgIHZtLnBvc3REYXRhID0ge1xuICAgICAgICAgICAgdXNlcm5hbWU6IHZtLmZvcm1EYXRhLnVzZXJuYW1lLCBcbiAgICAgICAgICAgIHBhc3N3b3JkOiB2bS5mb3JtRGF0YS5wYXNzd29yZCxcbiAgICAgICAgICAgIGNsaWVudF9pZDogQVBQLnBhc3Nwb3J0LmNsaWVudF9pZCxcbiAgICAgICAgICAgIGNsaWVudF9zZWNyZXQ6IEFQUC5wYXNzcG9ydC5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgZ3JhbnRfdHlwZTogQVBQLnBhc3Nwb3J0LmdyYW50X3R5cGUsXG4gICAgICAgICAgICBzY29wZTogJyonLFxuICAgICAgICAgICAgdmVyc2lvbl9hcGk6IEFQUC5zeXN0ZW0udmVyc2lvbl9hcGksXG4gICAgICAgICAgICB2ZXJzaW9uX2FwcDogQVBQLnN5c3RlbS52ZXJzaW9uX2FwcFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIExvZ2luRmFjdG9yeS5sb2dpbiggdm0ucG9zdERhdGEsIGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgICBcbiAgICAgICAgLy8gfSwgZnVuY3Rpb24oZXJyKSB7XG4gICAgICAgIC8vICAgICAvL0FwcFNlcnZpY2UuZ3Jvd2woJ09jb3JyZXUgdW0gZXJybywgcG9yIGZhdm9yIHRlbnRlIG5vdmFtZW50ZS4nLCdkYW5nZXInKTtcbiAgICAgICAgLy8gfSk7XG4gICAgfVxuXG4gICAgLy8gJHRpbWVvdXQoZnVuY3Rpb24oKXtcbiAgICAvLyAgICAgLy92bS5sb2dhcigpO1xuICAgIC8vIH0sIDEwMDApO1xuXG4gICAgdm0ubG9naW4gPSAxO1xuICAgIHZtLnJlZ2lzdGVyID0gMDtcbiAgICB2bS5mb3Jnb3QgPSAwO1xuXG59XG5cbn0pKCk7XG4iLCIiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLnNlcnZpY2UoJ0FwcFNlcnZpY2UnLCBBcHBTZXJ2aWNlKTtcblxuQXBwU2VydmljZS4kaW5qZWN0ID0gWydBUFAnLCckcmVzb3VyY2UnXTtcblxuZnVuY3Rpb24gQXBwU2VydmljZShBUFAsJHJlc291cmNlKSB7XG5cbiAgICB2YXIgc2VydmljZXMgPSB7XG4gICAgICAgIGdyb3dsOiBncm93bCxcbiAgICAgICAgZ2V0TWVzc2FnZTogZ2V0TWVzc2FnZSxcbiAgICAgICAgZ2V0QmVzdHNlbGxpbmc6IGdldEJlc3RzZWxsaW5nXG4gICAgfTtcblxuICAgIHJldHVybiBzZXJ2aWNlcztcblxuICAgIGZ1bmN0aW9uIGdyb3dsKG1lc3NhZ2UsIHR5cGUpIHtcbiAgICAgICAgJC5ncm93bCh7XG4gICAgICAgICAgICBtZXNzYWdlOiBtZXNzYWdlXG4gICAgICAgIH0se1xuICAgICAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgICAgIGFsbG93X2Rpc21pc3M6IGZhbHNlLFxuICAgICAgICAgICAgbGFiZWw6ICdDYW5jZWwnLFxuICAgICAgICAgICAgY2xhc3NOYW1lOiAnYnRuLXhzIGJ0bi1pbnZlcnNlJyxcbiAgICAgICAgICAgIHBsYWNlbWVudDoge1xuICAgICAgICAgICAgICAgIGZyb206ICd0b3AnLFxuICAgICAgICAgICAgICAgIGFsaWduOiAncmlnaHQnXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgZGVsYXk6IDI1MDAsXG4gICAgICAgICAgICBhbmltYXRlOiB7XG4gICAgICAgICAgICAgICAgICAgIGVudGVyOiAnYW5pbWF0ZWQgYm91bmNlSW4nLFxuICAgICAgICAgICAgICAgICAgICBleGl0OiAnYW5pbWF0ZWQgYm91bmNlT3V0J1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG9mZnNldDoge1xuICAgICAgICAgICAgICAgIHg6IDIwLFxuICAgICAgICAgICAgICAgIHk6IDg1XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE1lc3NhZ2UoaW1nLCB1c2VyLCB0ZXh0KXtcbiAgICAgICAgdmFyIGdtTGlzdCA9ICRyZXNvdXJjZShcImRhdGEvbWVzc2FnZXMtbm90aWZpY2F0aW9ucy5qc29uXCIpO1xuICAgICAgICAgICAgXG4gICAgICAgIHJldHVybiBnbUxpc3QuZ2V0KHtcbiAgICAgICAgICAgIGltZzogaW1nLFxuICAgICAgICAgICAgdXNlcjogdXNlcixcbiAgICAgICAgICAgIHRleHQ6IHRleHRcbiAgICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QmVzdHNlbGxpbmcoaW1nLCBuYW1lLCByYW5nZSkge1xuICAgICAgICB2YXIgZ2JMaXN0ID0gJHJlc291cmNlKFwiZGF0YS9iZXN0LXNlbGxpbmcuanNvblwiKTtcbiAgICBcbiAgICAgICAgcmV0dXJuIGdiTGlzdC5nZXQoe1xuICAgICAgICAgICAgaW1nOiBpbWcsXG4gICAgICAgICAgICBuYW1lOiBuYW1lLFxuICAgICAgICAgICAgcmFuZ2U6IHJhbmdlLFxuICAgICAgICB9KTtcbiAgICB9XG59XG5cbn0pKCk7IiwiYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbXG4gICAgJ2lvbmljJyxcbiAgICAnbmdSZXNvdXJjZScsIFxuICAgICdhcHAuY29uc3RhbnRzJyxcbiAgICAndWkucm91dGVyJyxcbiAgICAnb2MubGF6eUxvYWQnLFxuICAgICdhcHAubW9kdWxlJyxcbiAgICAnbG9naW4ubW9kdWxlJyxcbiAgICAnZXhhbXBsZS5tb2R1bGUnXG5dKTsiXX0=
