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