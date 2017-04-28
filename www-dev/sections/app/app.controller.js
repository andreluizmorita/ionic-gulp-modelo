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