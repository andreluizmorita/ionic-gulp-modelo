var fs    = require('fs');
var plist = require('plist');
var parseString = require('xml2js').parseString;

var configPath = 'config.xml';

module.exports = function (context) {
	var xml = fs.readFileSync(configPath, 'utf8');

	parseString(xml, function (err, result) {
	    var nomeApp = result.widget.name[0];
	    var FILEPATH = 'platforms/ios/'+ nomeApp +'/'+ nomeApp + '-Info.plist';

		var xml = fs.readFileSync(FILEPATH, 'utf8');
		var obj = plist.parse(xml);

		//obj.LSApplicationQueriesSchemes = ['ETAPADIGITAL'];
		obj.NSLocationAlwaysUsageDescription = "Sua localização é usada para definir seu local de atendimento do plantão de dúvidas";

		xml = plist.build(obj);

		fs.writeFileSync(FILEPATH, xml, {encoding: 'utf8'});
	});
};