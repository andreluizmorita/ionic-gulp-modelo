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