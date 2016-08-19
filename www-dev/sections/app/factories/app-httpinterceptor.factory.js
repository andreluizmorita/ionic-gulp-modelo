(function() {
'use strict';

angular
.module('app.module')
.factory('HttpInterceptorFactory', HttpInterceptorFactory);

HttpInterceptorFactory.$inject = ['$q', '$injector'];

function HttpInterceptorFactory($q, $injector){
	return {
		responseError: function(rejection) {
			console.log('rejection', rejection);
			console.log($injector);
			if (rejection.status >= 400 && rejection.status < 404){
				$injector.get('$state').transitionTo('access.signin');
			}
			return $q.reject(rejection);
		}
	};
}

})();