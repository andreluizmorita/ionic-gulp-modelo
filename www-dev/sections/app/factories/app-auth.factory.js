(function() {
'use strict';

angular
.module('app.module')
.factory('AuthFactory', AuthFactory);

AuthFactory.$inject = ['$resource','$state','APP'];

function AuthFactory($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/profile';

    var paramDefaults = {};
    
    var actions = {
    	'refresh': { method: 'POST', timeout:APP.system.timeout }
   	};

    return $resource(url, paramDefaults, actions);
}

})();