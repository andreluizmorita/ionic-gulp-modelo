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
.module('app.constants', [])
.constant(
    'APP',{
    	'user': {
    		'oauth':false,
    		'profile':{}
    	},
        'system':{
            'client_id':'provafacil',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709',
            'url':'http://localhost:8080/server.etapadigital/etapadigital.com.br/app/public/api/provafacil/',
            'timeout':100000,
            'version_api':'v1',
            'version_app':'0.0.1'
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
            client_id: APP.system.client_id,
            client_secret: APP.system.client_secret,
            grant_type: 'password',
            version_api: APP.system.version_api,
            version_app: APP.system.version_app
        };

        LoginFactory.login( vm.postData,
            function(response) {
                
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

    var paramDefaults = { 
    	email: '@user', password: '@pass' };
    
    var actions = {
        'login':{ method: 'POST', timeout:APP.system.timeout },
    };

    return $resource(url, paramDefaults, actions);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImFwcC9hcHAubW9kdWxlLmpzIiwiaG9tZS9ob21lLm1vZHVsZS5qcyIsImxvZ2luL2xvZ2luLm1vZHVsZS5qcyIsImFwcC9hcHAtcHJvZmlsZS5mYWN0b3J5LmpzIiwiYXBwL2FwcC5jb25zdGFudHMuanMiLCJhcHAvYXBwLmNvbnRyb2xsZXIuanMiLCJhcHAvYXBwLnJ1bi5qcyIsImhvbWUvaG9tZS5jb250cm9sbGVyLmpzIiwiaG9tZS9ob21lLmZhY3RvcnkuanMiLCJsb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzIiwibG9naW4vbG9naW4uZmFjdG9yeS5qcyIsImxvZ291dC9sb2dvdXQuY29udHJvbGxlci5qcyIsImFwcC5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2pGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3BCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ3ZDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQzdCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUMzREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FDdkJBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJzY3JpcHRzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnYXBwLm1vZHVsZScsIFtdKVxuLmNvbmZpZyhjb25maWcpO1xuXG5jb25maWcuJGluamVjdCA9IFsnJHN0YXRlUHJvdmlkZXInLCckdXJsUm91dGVyUHJvdmlkZXInXTtcblxuZnVuY3Rpb24gY29uZmlnICgkc3RhdGVQcm92aWRlciwkdXJsUm91dGVyUHJvdmlkZXIpe1xuXG4gICAgJHN0YXRlUHJvdmlkZXJcbiAgICAuc3RhdGUoJ2FwcCcsIHtcbiAgICAgICAgdXJsOiAnL2FwcCcsXG4gICAgICAgIGFic3RyYWN0OiB0cnVlLFxuICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2FwcC9tZW51LWxlZnQudmlldy5odG1sJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAucGxheWxpc3RzJywge1xuICAgICAgICB1cmw6ICcvcGxheWxpc3RzJyxcbiAgICAgICAgdmlld3M6IHtcbiAgICAgICAgICAgICdtZW51Q29udGVudCc6IHtcbiAgICAgICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2FwcC9tZW51L3BsYXlsaXN0cy5odG1sJ1xuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiB7XG4gICAgICAgICAgICBsb2FkUGx1Z2luOiBmdW5jdGlvbigkb2NMYXp5TG9hZCkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkb2NMYXp5TG9hZC5sb2FkIChbXG4gICAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdqcycsXG4gICAgICAgICAgICAgICAgICAgICAgICBmaWxlczogW1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9hcHAvYXBwLmNvbnRyb2xsZXIuanMnXG4gICAgICAgICAgICAgICAgICAgICAgICBdXG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDA4Jywge1xuICAgICAgICB1cmw6ICcvNDA4JyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwLzQwOC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDA0Jywge1xuICAgICAgICB1cmw6ICcvNDA0JyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwLzQwNC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNDAwJywge1xuICAgICAgICB1cmw6ICcvNDAwJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwLzQwMC52aWV3Lmh0bWwnLFxuICAgIH0pXG4gICAgLnN0YXRlKCdhcHAuNTAwJywge1xuICAgICAgICB1cmw6ICcvNTAwJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogZmFsc2UsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvYXBwLzUwMC52aWV3Lmh0bWwnXG4gICAgfSlcbiAgICAvLyAuc3RhdGUoJ2xvZ2luJywge1xuICAgIC8vICAgICB1cmw6ICcvbG9naW4nLFxuICAgIC8vICAgICBsb2dpblJlcXVpcmVkOiB0cnVlLFxuICAgIC8vICAgICB0ZW1wbGF0ZVVybDogJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLnZpZXcuaHRtbCcsXG4gICAgLy8gICAgIHJlc29sdmU6IHtcbiAgICAvLyAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgLy8gICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAvLyAgICAgICAgICAgICAgICAge1xuICAgIC8vICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAvLyAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgLy8gICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2xvZ2luL2xvZ2luLmZhY3RvcnkuanMnLFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgICAgICdzZWN0aW9ucy9sb2dpbi9sb2dpbi5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgIC8vICAgICAgICAgICAgICAgICAgICAgXVxuICAgIC8vICAgICAgICAgICAgICAgICB9XG4gICAgLy8gICAgICAgICAgICAgXSk7XG4gICAgLy8gICAgICAgICB9XG4gICAgLy8gICAgIH1cbiAgICAgICAgXG4gICAgLy8gfSk7XG5cbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKCcvbG9naW4nKTtcbn1cblxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhci5tb2R1bGUoJ2hvbWUubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyKXtcblxuICAgICRzdGF0ZVByb3ZpZGVyXG4gICAgLnN0YXRlKCdob21lJywge1xuICAgICAgICB1cmw6ICcvbG9naW4nLFxuICAgICAgICBhYnN0cmFjdDogdHJ1ZSxcbiAgICAgICAgdGVtcGxhdGVVcmw6ICdhcHAvdGVtcGxhdGVzL2lvbmljL21lbnUuaHRtbCcsXG4gICAgICAgIGNvbnRyb2xsZXI6ICdBcHBDdHJsJ1xuICAgIH0pXG4gICAgLnN0YXRlKCdob21lLnByaW5jaXBhbCcsIHtcbiAgICAgICAgdXJsOiAnL2hvbWUtcHJpbmNpcGFsJyxcbiAgICAgICAgbG9naW5SZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgY29udHJvbGxlcjogJ0hvbWVDdHJsJyxcbiAgICAgICAgY29udHJvbGxlckFzOiAnaGN0cmwnLFxuICAgICAgICB2aWV3czoge1xuICAgICAgICAgICAgJ21lbnVDb250ZW50Jzoge1xuICAgICAgICAgICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvaG9tZS9ob21lLnZpZXcuaHRtbCcsXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlc29sdmU6IHtcbiAgICAgICAgICAgIGxvYWRQbHVnaW46IGZ1bmN0aW9uKCRvY0xhenlMb2FkKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRvY0xhenlMb2FkLmxvYWQgKFtcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2pzJyxcbiAgICAgICAgICAgICAgICAgICAgICAgIGZpbGVzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICBcdCdzZWN0aW9ucy9ob21lL2hvbWUuZmFjdG9yeS5qcycsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJ3NlY3Rpb25zL2hvbWUvaG9tZS5jb250cm9sbGVyLmpzJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIFxuICAgICAgICAgICAgICAgICAgICAgICAgXVxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgXG4gICAgfSk7XG59XG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyLm1vZHVsZSgnbG9naW4ubW9kdWxlJywgW10pXG4uY29uZmlnKGNvbmZpZyk7XG5cbmNvbmZpZy4kaW5qZWN0ID0gWyckc3RhdGVQcm92aWRlcicsJyR1cmxSb3V0ZXJQcm92aWRlciddO1xuXG5mdW5jdGlvbiBjb25maWcgKCRzdGF0ZVByb3ZpZGVyLCR1cmxSb3V0ZXJQcm92aWRlcil7XG5cbiAgICAkc3RhdGVQcm92aWRlclxuICAgIC5zdGF0ZSgnbG9naW4nLCB7XG4gICAgICAgIHVybDogJy9sb2dpbicsXG4gICAgICAgIGxvZ2luUmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIHRlbXBsYXRlVXJsOiAnc2VjdGlvbnMvbG9naW4vbG9naW4udmlldy5odG1sJ1xuICAgIH0pO1xufVxuXG5cbn0pKCk7IiwiKGZ1bmN0aW9uKCkge1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAubW9kdWxlJylcbi5mYWN0b3J5KCdQcm9maWxlRmFjdG9yeScsIFByb2ZpbGVGYWN0b3J5KTtcblxuUHJvZmlsZUZhY3RvcnkuJGluamVjdCA9IFsnJHJlc291cmNlJywnJHN0YXRlJywnQVBQJ107XG5cbmZ1bmN0aW9uIFByb2ZpbGVGYWN0b3J5KCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL3Byb2ZpbGUnO1xuXG4gICAgdmFyIHBhcmFtRGVmYXVsdHMgPSB7fTtcbiAgICBcbiAgICB2YXIgYWN0aW9ucyA9IHt9O1xuXG4gICAgcmV0dXJuICRyZXNvdXJjZSh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMpO1xufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnYXBwLmNvbnN0YW50cycsIFtdKVxuLmNvbnN0YW50KFxuICAgICdBUFAnLHtcbiAgICBcdCd1c2VyJzoge1xuICAgIFx0XHQnb2F1dGgnOmZhbHNlLFxuICAgIFx0XHQncHJvZmlsZSc6e31cbiAgICBcdH0sXG4gICAgICAgICdzeXN0ZW0nOntcbiAgICAgICAgICAgICdjbGllbnRfaWQnOidwcm92YWZhY2lsJyxcbiAgICAgICAgICAgICdjbGllbnRfc2VjcmV0JzonZGEzOWEzZWU1ZTZiNGIwZDMyNTViZmVmOTU2MDE4OTBhZmQ4MDcwOScsXG4gICAgICAgICAgICAndXJsJzonaHR0cDovL2xvY2FsaG9zdDo4MDgwL3NlcnZlci5ldGFwYWRpZ2l0YWwvZXRhcGFkaWdpdGFsLmNvbS5ici9hcHAvcHVibGljL2FwaS9wcm92YWZhY2lsLycsXG4gICAgICAgICAgICAndGltZW91dCc6MTAwMDAwLFxuICAgICAgICAgICAgJ3ZlcnNpb25fYXBpJzondjEnLFxuICAgICAgICAgICAgJ3ZlcnNpb25fYXBwJzonMC4wLjEnXG4gICAgICAgIH1cblx0fVxuKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2FwcC5tb2R1bGUnKVxuLmNvbnRyb2xsZXIoJ0FwcEN0cmwnLEFwcEN0cmwpO1xuXG5BcHBDdHJsLiRpbmplY3QgPSBbJyRzdGF0ZScsJyRzY29wZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBBcHBDdHJsICgkc3RhdGUsJHNjb3BlLEFQUCl7ICBcbiAgICB2YXIgdm0gPSB0aGlzO1xuXG59XG59KSgpOyIsIihmdW5jdGlvbigpe1xuJ3VzZSBzdHJpY3QnO1xuXG5hbmd1bGFyXG4ubW9kdWxlKCdhcHAucnVuJywgW10pXG4ucnVuKFsnJHJvb3RTY29wZScsJyRsb2NhdGlvbicsJyRzdGF0ZScsJyRpb25pY1BsYXRmb3JtJywnQVBQJyxmdW5jdGlvbiAoJHJvb3RTY29wZSwgJGxvY2F0aW9uLCRzdGF0ZSwkaW9uaWNQbGF0Zm9ybSxBUFApIHtcbiAgICBcbiAgICAkaW9uaWNQbGF0Zm9ybS5yZWFkeShmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKHdpbmRvdy5jb3Jkb3ZhICYmIHdpbmRvdy5jb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQpIHtcbiAgICAgICAgICAgIGNvcmRvdmEucGx1Z2lucy5LZXlib2FyZC5oaWRlS2V5Ym9hcmRBY2Nlc3NvcnlCYXIodHJ1ZSk7XG4gICAgICAgICAgICBjb3Jkb3ZhLnBsdWdpbnMuS2V5Ym9hcmQuZGlzYWJsZVNjcm9sbCh0cnVlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICh3aW5kb3cuU3RhdHVzQmFyKSB7XG4gICAgICAgICAgICBTdGF0dXNCYXIuc3R5bGVEZWZhdWx0KCk7XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKFwiJHN0YXRlQ2hhbmdlU3RhcnRcIiwgZnVuY3Rpb24oZXZlbnQsIG5leHQsIGN1cnJlbnQpe1xuICAgICAgICBjb25zb2xlLmxvZyhuZXh0KTtcblxuICAgICAgICBpZihuZXh0LmxvZ2luUmVxdWlyZWQpe1xuICAgICAgICAgICAgaWYoQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuKSB7XG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coQVBQLnVzZXIub2F1dGguYWNjZXNzX3Rva2VuLmxlbmdodCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIExvYWRpbmdcbiAgICAkcm9vdFNjb3BlLiRvbignbG9hZGluZzpzaG93JywgZnVuY3Rpb24oKSB7XG4gICAgICAgICRpb25pY0xvYWRpbmcuc2hvdyh7dGVtcGxhdGU6Jzxpb24tc3Bpbm5lcj48L2lvbi1zcGlubmVyPid9KTtcbiAgICB9KTtcblxuICAgICRyb290U2NvcGUuJG9uKCdsb2FkaW5nOmhpZGUnLCBmdW5jdGlvbigpe1xuICAgICAgICAkaW9uaWNMb2FkaW5nLmhpZGUoKTtcbiAgICB9KTtcblxufV0pO1xuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnaG9tZS5tb2R1bGUnKVxuLmNvbnRyb2xsZXIoJ0hvbWVDdHJsJyxIb21lQ3RybCk7XG5cbkhvbWVDdHJsLiRpbmplY3QgPSBbJyRzdGF0ZScsJyRzY29wZScsJ0FQUCddO1xuXG5mdW5jdGlvbiBIb21lQ3RybCAoJHN0YXRlLCRzY29wZSxBUFApeyAgXG4gICAgdmFyIHZtID0gdGhpcztcblxuICAgIFxufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnaG9tZS5tb2R1bGUnLCBbXSlcbi5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBbJyRyZXNvdXJjZScsJyRzdGF0ZScsJ0FQUCcsIGZ1bmN0aW9uKCRyZXNvdXJjZSwkc3RhdGUsQVBQKSB7XG5cbiAgICB2YXIgdXJsID0gQVBQLnN5c3RlbS51cmwrQVBQLnN5c3RlbS52ZXJzaW9uX2FwaSsnL2xvZ2luJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0geyBcbiAgICBcdGVtYWlsOiAnQHVzZXInLCBwYXNzd29yZDogJ0BwYXNzJyB9O1xuICAgIFxuICAgIHZhciBhY3Rpb25zID0ge1xuICAgICAgICAnbG9naW4nOnsgbWV0aG9kOiAnUE9TVCcsIHRpbWVvdXQ6QVBQLnN5c3RlbS50aW1lb3V0IH0sXG4gICAgfTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1dKVxuLmZhY3RvcnkoJ1Byb2ZpbGVGYWN0b3J5JywgWyckcmVzb3VyY2UnLCckc3RhdGUnLCdBUFAnLCBmdW5jdGlvbigkcmVzb3VyY2UsJHN0YXRlLEFQUCkge1xuXG4gICAgdmFyIHVybCA9IEFQUC5zeXN0ZW0udXJsK0FQUC5zeXN0ZW0udmVyc2lvbl9hcGkrJy9wcm9maWxlJztcblxuICAgIHZhciBwYXJhbURlZmF1bHRzID0ge307XG4gICAgXG4gICAgdmFyIGFjdGlvbnMgPSB7fTtcblxuICAgIHJldHVybiAkcmVzb3VyY2UodXJsLCBwYXJhbURlZmF1bHRzLCBhY3Rpb25zKTtcbn1dKTtcblxufSkoKTsiLCIoZnVuY3Rpb24oKSB7XG4ndXNlIHN0cmljdCc7XG5cbmFuZ3VsYXJcbi5tb2R1bGUoJ2xvZ2luLm1vZHVsZScpXG4uY29udHJvbGxlcignTG9naW5DdHJsJyxMb2dpbkN0cmwpO1xuXG5Mb2dpbkN0cmwuJGluamVjdCA9IFsnJHN0YXRlJywnJHNjb3BlJywnJGh0dHAnLCckdGltZW91dCcsJ0FQUCcsJ0xvZ2luRmFjdG9yeScsJ1Byb2ZpbGVGYWN0b3J5J107XG5cbmZ1bmN0aW9uIExvZ2luQ3RybCAoJHN0YXRlLCRzY29wZSwkaHR0cCwkdGltZW91dCxBUFAsTG9naW5GYWN0b3J5LFByb2ZpbGVGYWN0b3J5KXsgIFxuICAgIHZhciB2bSA9IHRoaXM7XG5cbiAgICAvLyAtLSBWQVJJQUJMRVMgLS0tLS0tLS0tLS1cbiAgICB2bS5mb3JtRGF0YSA9IHsgdXNlcm5hbWU6J2FuZHJlLm1vcml0YUBldGFwYS5jb20uYnInLCBwYXNzd29yZDonMTIzNGFiY0AnIH07XG5cbiAgICAvLyAtLSBGVU5DVElPTlMgLS0tLS0tLS0tLS1cbiAgICAkc2NvcGUubG9nYXIgPSBsb2dhcjsgICAgIFxuICAgICRzY29wZS5wZXJmaWwgPSBwZXJmaWw7ICAgICBcblxuICAgIGZ1bmN0aW9uIGxvZ2FyKCkge1xuICAgICAgICB2bS5wb3N0RGF0YSA9IHtcbiAgICAgICAgICAgIHVzZXJuYW1lOiB2bS5mb3JtRGF0YS51c2VybmFtZSwgXG4gICAgICAgICAgICBwYXNzd29yZDogdm0uZm9ybURhdGEucGFzc3dvcmQsXG4gICAgICAgICAgICBjbGllbnRfaWQ6IEFQUC5zeXN0ZW0uY2xpZW50X2lkLFxuICAgICAgICAgICAgY2xpZW50X3NlY3JldDogQVBQLnN5c3RlbS5jbGllbnRfc2VjcmV0LFxuICAgICAgICAgICAgZ3JhbnRfdHlwZTogJ3Bhc3N3b3JkJyxcbiAgICAgICAgICAgIHZlcnNpb25fYXBpOiBBUFAuc3lzdGVtLnZlcnNpb25fYXBpLFxuICAgICAgICAgICAgdmVyc2lvbl9hcHA6IEFQUC5zeXN0ZW0udmVyc2lvbl9hcHBcbiAgICAgICAgfTtcblxuICAgICAgICBMb2dpbkZhY3RvcnkubG9naW4oIHZtLnBvc3REYXRhLFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICAgICAgICBcbiAgICAgICAgICAgICAgICBBUFAudXNlci5vYXV0aCA9IHtcbiAgICAgICAgICAgICAgICAgICAgYWNjZXNzX3Rva2VuOiByZXNwb25zZS5hY2Nlc3NfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIHJlZnJlc2hfdG9rZW46IHJlc3BvbnNlLnJlZnJlc2hfdG9rZW4sXG4gICAgICAgICAgICAgICAgICAgIGV4cGlyZXNfaW46IHJlc3BvbnNlLmV4cGlyZXNfaW4sXG4gICAgICAgICAgICAgICAgICAgIHRva2VuX3R5cGU6IHJlc3BvbnNlLnRva2VuX3R5cGVcbiAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgICAgJHNjb3BlLnBlcmZpbCgpO1xuICAgICAgICAgICAgfSwgXG4gICAgICAgICAgICBmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHBlcmZpbCgpe1xuICAgICAgICBQcm9maWxlRmFjdG9yeS5nZXQoe2FjY2Vzc190b2tlbjpBUFAudXNlci5vYXV0aC5hY2Nlc3NfdG9rZW59LFxuICAgICAgICAgICAgZnVuY3Rpb24ocmVzcG9uc2Upe1xuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKHJlc3BvbnNlKTtcbiAgICAgICAgICAgIH0pO1xuICAgIH1cblxuICAgICR0aW1lb3V0KGZ1bmN0aW9uKCl7XG4gICAgICAgICRzY29wZS5sb2dhcigpO1xuICAgIH0sIDEwMDApO1xufVxuXG59KSgpOyIsIihmdW5jdGlvbigpIHtcbid1c2Ugc3RyaWN0JztcblxuYW5ndWxhclxuLm1vZHVsZSgnbG9naW4ubW9kdWxlJylcbi5mYWN0b3J5KCdMb2dpbkZhY3RvcnknLCBMb2dpbkZhY3RvcnkpO1xuXG5Mb2dpbkZhY3RvcnkuJGluamVjdCA9IFsnJHJlc291cmNlJywnJHN0YXRlJywnQVBQJ107XG5cbmZ1bmN0aW9uIExvZ2luRmFjdG9yeSAoJHJlc291cmNlLCRzdGF0ZSxBUFApIHtcblxuICAgIHZhciB1cmwgPSBBUFAuc3lzdGVtLnVybCtBUFAuc3lzdGVtLnZlcnNpb25fYXBpKycvbG9naW4nO1xuXG4gICAgdmFyIHBhcmFtRGVmYXVsdHMgPSB7IFxuICAgIFx0ZW1haWw6ICdAdXNlcicsIHBhc3N3b3JkOiAnQHBhc3MnIH07XG4gICAgXG4gICAgdmFyIGFjdGlvbnMgPSB7XG4gICAgICAgICdsb2dpbic6eyBtZXRob2Q6ICdQT1NUJywgdGltZW91dDpBUFAuc3lzdGVtLnRpbWVvdXQgfSxcbiAgICB9O1xuXG4gICAgcmV0dXJuICRyZXNvdXJjZSh1cmwsIHBhcmFtRGVmYXVsdHMsIGFjdGlvbnMpO1xufVxuXG59KSgpOyIsIiIsIi8vIElvbmljIFN0YXJ0ZXIgQXBwXG5cbi8vIGFuZ3VsYXIubW9kdWxlIGlzIGEgZ2xvYmFsIHBsYWNlIGZvciBjcmVhdGluZywgcmVnaXN0ZXJpbmcgYW5kIHJldHJpZXZpbmcgQW5ndWxhciBtb2R1bGVzXG4vLyAnc3RhcnRlcicgaXMgdGhlIG5hbWUgb2YgdGhpcyBhbmd1bGFyIG1vZHVsZSBleGFtcGxlIChhbHNvIHNldCBpbiBhIDxib2R5PiBhdHRyaWJ1dGUgaW4gaW5kZXguaHRtbClcbi8vIHRoZSAybmQgcGFyYW1ldGVyIGlzIGFuIGFycmF5IG9mICdyZXF1aXJlcydcbi8vICdzdGFydGVyLmNvbnRyb2xsZXJzJyBpcyBmb3VuZCBpbiBjb250cm9sbGVycy5qc1xuYW5ndWxhci5tb2R1bGUoJ3N0YXJ0ZXInLCBbXG4gICAgJ2lvbmljJyxcbiAgICAnbmdSZXNvdXJjZScsIFxuICAgICdhcHAuY29uc3RhbnRzJyxcbiAgICAnYXBwLnJ1bicsXG4gICAgJ2FwcC5tb2R1bGUnLFxuICAgICdsb2dpbi5tb2R1bGUnXG5dKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
