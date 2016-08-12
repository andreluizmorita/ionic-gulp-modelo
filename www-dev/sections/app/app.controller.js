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