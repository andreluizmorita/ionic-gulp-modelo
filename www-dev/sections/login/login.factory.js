(function() {
'use strict';

angular
.module('login.module')
.factory('LoginFactory', LoginFactory);

LoginFactory.$inject = ['$resource','$state','APP'];

function LoginFactory ($resource,$state,APP) {

    var url = APP.system.urlOauth+'oauth/token';

    var paramDefaults = {email: '@user', password: '@pass' };
    
    var actions = {
        'login':{ method: 'POST',timeout:APP.system.timeout}
    }; 

    return $resource(url, paramDefaults, actions);
}

})();