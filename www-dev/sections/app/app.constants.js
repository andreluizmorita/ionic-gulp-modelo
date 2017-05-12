(function() {
'use strict';

angular
.module('app.constants', [])
.constant(
    'APP',{
        'user': {
            'passport':{},
            'profile':{},
            'data':{}
        },
        'system':{
            
            'url':'http://localhost:8000/api/',
            'urlOauth':'http://localhost:8000/',
            
            'timeout':10000,
            'version_api':'v1',
            'version_app':'0.0.1'
        },
        'oauth':{
            'grant_type':'password',
            'client_id':'clientauth',
            'client_secret':'da39a3ee5e6b4b0d3255bfef95601890afd80709',
            'authenticated':false,
            'type':'oauth'
        },
        'passport':{
            'grant_type':'password',
            'client_id':'1',
            'client_secret':'FxnKWj7zndst2tJACVyxveC56j9GzUAZVpEgjcxt',
            'authenticated':false,
            'type':'passport'

        }
    }
);

})();