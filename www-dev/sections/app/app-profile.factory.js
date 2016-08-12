(function() {
'use strict';

angular
.module('app.module')
.factory('ProfileFactory', ProfileFactory);

ProfileFactory.$inject = ['$resource','$state','APP'];

function ProfileFactory($resource,$state,APP) {

    var url = APP.system.url+APP.system.version_api+'/profile';

    var paramDefaults = {};
    
    var actions = {};

    return $resource(url, paramDefaults, actions);
}

})();