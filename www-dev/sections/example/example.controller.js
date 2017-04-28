(function() {
'use strict';

angular
.module('example.module')
.controller('ExampleCtrl',ExampleCtrl);

ExampleCtrl.$inject = ['$state','$scope','$stateParams','APP','IonicExampleFactory'];

function ExampleCtrl ($state,$scope,$stateParams,APP,IonicExampleFactory){  
    var vm = this;

    vm.settings = { enableFriends: 0};

  	vm.chats = IonicExampleFactory.all();
  	
  	vm.remove = function(chat) {
    	IonicExampleFactory.remove(chat);
  	};

  	vm.chatId = $stateParams.chatId;

  	if(vm.chatId != 'undefinide') {
  		vm.chat = IonicExampleFactory.get($stateParams.chatId);
  	}
}

})();