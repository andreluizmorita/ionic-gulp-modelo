(function() {
'use strict';

angular
.module('example.module')
.config(config);

config.$inject = ['$stateProvider'];

function config ($stateProvider){

    $stateProvider
    .state ('example', {
        url: '/example',
        abstract: true,
		templateUrl: 'sections/example/example-tabs.view.html',
    })
    .state ('example.dash', {
        url: '/example-dash',
        loginRequired: true,
        views: {
			'content-home': {
				templateUrl: 'sections/example/example-dash.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    })
    .state ('example.chats', {
        url: '/example-chats',
        loginRequired: true,
        views: {
			'content-chats': {
				templateUrl: 'sections/example/example-chats.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    })
    .state ('example.chat', {
        url: '/example-chat/:chatId',
        loginRequired: true,
        views: {
            'content-chats': {
                templateUrl: 'sections/example/example-chat-details.view.html',
                controller: 'ExampleCtrl',
                controllerAs: 'ectrl'
            }
        }
    })
    .state ('example.account', {
        url: '/example-account',
        loginRequired: true,
        views: {
			'content-account': {
				templateUrl: 'sections/example/example-account.view.html',
				controller: 'ExampleCtrl',
				controllerAs: 'ectrl'
			}
		}
    });

}

})();