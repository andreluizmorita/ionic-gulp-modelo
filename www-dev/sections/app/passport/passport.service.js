(function() {
'use strict';

angular
.module('app.module')
.service('PassportService', PassportService);

PassportService.$inject = ['APP','$resource', '$http', '$window', '$q'];

function PassportService(APP,$resource, $http, $window, $q) {

    return {
        getToken : function () {
            var token = typeof $window.localStorage.token;

            if(token != 'undefined'){
                return $window.localStorage.token;
            } else {
                return false;
            }
            
        },
        setToken: function (token) {
            $window.localStorage.token = token;
        },
        signin : function (data) {
            //$http.post('api/signin', data);
        },
        signup : function (data) {
            //$http.post('api/signup', data);
        },
        logout : function (data) {
            //delete $localStorage.token;
            $q.when();
        }
    };
}

})();