(function() {
'use strict';

angular
.module('app.module')
.directive('toggleSubmenu', toggleSubmenu);

function toggleSubmenu() {
    
    return {
        restrict: 'A',
        link: function(scope, element, attrs) {
            element.click(function(){
                element.next().slideToggle(200);
                element.parent().toggleClass('toggled');
            });
        }
    };
}
})();