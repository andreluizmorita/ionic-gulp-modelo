(function() {
'use strict';

angular
.module('app.constants', [])
.constant(
    'APP',{
    	'user': {
    		'oauth':false,
    		'profile':{},
    	},
        'system':{
            //'url':'http://localhost:8080/server.etapadigital/etapadigital.com.br/app/public/api/provafacil/',
            'url':'http://localhost:8000/api/provafacil/',
            'timeout':100000,
            'version_api':'v1',
            'version_app':'0.0.1'
        },
        'auth':{
            'grant_type':'password',
            'client_id':'provafacil',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709',

        }
	}
);

})();