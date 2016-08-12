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