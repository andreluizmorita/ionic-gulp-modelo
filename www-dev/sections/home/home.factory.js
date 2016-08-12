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