(function() {
'use strict';

angular
.module('login.module')
.controller('LoginCtrl',LoginCtrl);

LoginCtrl.$inject = ['$state','$scope','$http','$timeout','$window','APP','LoginFactory','PassportService'];

function LoginCtrl ($state,$scope,$http,$timeout,$window,APP,LoginFactory,PassportService){  
    var vm = this;

    // -- VARIABLES -----------
    vm.formData = { username:'andreluizmorita@gmail.com', password:'andremorita' };
    //vm.formData = { username:'', password:'' };

    // -- FUNCTIONS -----------
    vm.logar = logar;      

    function logar() {

        //$state.go('example.dash');

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

        LoginFactory.login( vm.postData, function(response) {
            
        }, function(err) {
            //AppService.growl('Ocorreu um erro, por favor tente novamente.','danger');
        });
    }

    // $timeout(function(){
    //     //vm.logar();
    // }, 1000);

    vm.login = 1;
    vm.register = 0;
    vm.forgot = 0;

}

})();
