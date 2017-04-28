(function() {
'use strict';

angular
.module('app.module')
.filter('fase', function(){
    return function(data) {
        var out;
        
        if(data==='1'){
            out = '1ª fase';
        }else if(data==='2'){
            out = '2ª fase';
        }else if(data==='3'){
            out = '3ª fase';
        }else if(data==='simulado'){
            out = 'Simulado';
        }else if(data==='u'){
            out = 'Fase única';
        }else{
            out = '-';
        }
        return out;
    };
})
.filter('databr', function(){
    return function(input){
        input = input || '';
        var out = '-';

        comhora = input.split(" ");
        sodata = comhora[0].split("-");
        out = sodata[2]+'/'+sodata[1]+'/'+(sodata[0].substr(2, 3));

        return out;
    };
})
.filter('databr_hora', function(){
    return function(input){
        input = input || '';
        var out = '-';

        if(input !== ''){
            var comhora = input.split(" ");
            var sodata = comhora[0].split("-");
            var hora = comhora[1].split(":");

            out = sodata[2]+'/'+sodata[1]+'/'+(sodata[0].substr(2, 3))+' '+hora[0]+':'+hora[1];
        }   

        return out;
    };
});
})();
