module.exports = {
    init(characterLookup,weaponLookup) {
        init(characterLookup,weaponLookup);
    },
    execute(parsedLine, callback) {
        execute(parsedLine, callback);
    }
}

var characterLookupObj;
var weaponLookupObj;

var commandEnums = {
    CHARACTERLOOKUP: 'CHARACTER',
	WEAPONLOOKUP: 'WEAPON'
}

function init(characterLookup,weaponLookup) {
    characterLookupObj = characterLookup,
	weaponLookupObj = weaponLookup
}

function execute(parsedLine, callback) {
    var command = String(parsedLine.command).toUpperCase();

    switch (command) {
        case commandEnums.CHARACTERLOOKUP:
            characterLookup(parsedLine, callback);
            break;
		case commandEnums.WEAPONLOOKUP:
			weaponLookup(parsedLine, callback);
			break;
        default:
            break;
    }
}

function characterLookup(parsedLine, callback) {
    var name = parsedLine.data;
    characterLookupObj.lookUp(name, function (result) {
        callback(result);
    });
}

function weaponLookup(parsedLine, callback){
	var name = parsedLine.data;
	weaponLookupObj.lookUp(name,function(result){
		callback(result);
	});
}