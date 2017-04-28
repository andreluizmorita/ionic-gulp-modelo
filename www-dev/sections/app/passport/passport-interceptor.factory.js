(function() {
'use strict';

angular
.module('app.module')
.factory('PassportInterceptorFactory', PassportInterceptorFactory);

PassportInterceptorFactory.$inject = ['$q','$window','$location'];

function PassportInterceptorFactory($q,$window,$location) {
    
    return {
        request: function(config) {

            var url = config.url;
            var indexHtml = url.indexOf('.html');
            var indexJson = url.indexOf('.json');
            var indexHttp = url.indexOf('https://');

            if(indexHtml === -1 && indexJson === -1 && indexHttp === -1){
                var token = typeof $window.localStorage.token;

                if(token !== 'undefined'){
                    
                    var index = url.indexOf('/oauth/token');

                    if( index === -1) {
                        config.headers.Authorization = 'Bearer ' + $window.localStorage.token;
                    } else {
                        // console.info('PassPort:token', token);
                        // console.info('PassPort:index', index);
                        // console.info('PassPort:indexHtml', indexHtml);
                        // console.info('PassPort:indexJson', indexJson);
                    }
                }
            }
            
            
            return config;
        },
        responseError: function(response) {
            console.info('PassPort:errorInterceptor', response);

            if (response.status === 401 || response.status === 403) {
                $location.path('/login').replace();
            } else if(response.status === 404){
                $location.path('/404').replace();
            } else if(response.status === 500){
                $location.path('/500').replace();
            }

            return $q.reject(response);
        }
    };

}

})();