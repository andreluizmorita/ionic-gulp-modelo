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