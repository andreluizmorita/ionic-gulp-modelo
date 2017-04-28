(function() {
'use strict';

angular
.module('app.module')
.service('AppService', AppService);

AppService.$inject = ['APP','$resource'];

function AppService(APP,$resource) {

    var services = {
        growl: growl,
        getMessage: getMessage,
        getBestselling: getBestselling
    };

    return services;

    function growl(message, type) {
        $.growl({
            message: message
        },{
            type: type,
            allow_dismiss: false,
            label: 'Cancel',
            className: 'btn-xs btn-inverse',
            placement: {
                from: 'top',
                align: 'right'
            },
            delay: 2500,
            animate: {
                    enter: 'animated bounceIn',
                    exit: 'animated bounceOut'
            },
            offset: {
                x: 20,
                y: 85
            }
        });
    }

    function getMessage(img, user, text){
        var gmList = $resource("data/messages-notifications.json");
            
        return gmList.get({
            img: img,
            user: user,
            text: text
        });
    }

    function getBestselling(img, name, range) {
        var gbList = $resource("data/best-selling.json");
    
        return gbList.get({
            img: img,
            name: name,
            range: range,
        });
    }
}

})();