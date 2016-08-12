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