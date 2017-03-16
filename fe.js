module.exports = {
    init(characterLookup) {
        init(characterLookup);
    },
    execute(parsedLine, callback) {
        execute(parsedLine, callback);
    }
}

var characterLookupObj;

var commandEnums = {
    CHARACTERLOOKUP: 'CHARACTER'
}

function init(characterLookup) {
    characterLookupObj = characterLookup;
}

function execute(parsedLine, callback) {
    var command = String(parsedLine.command).toUpperCase();

    switch (command) {
        case commandEnums.CHARACTERLOOKUP:
            characterLookup(parsedLine, callback);
            break;
        default:
            break;
    }
}

function characterLookup(parsedLine, callback) {
    var name = parsedLine[2];
    characterLookupObj.lookUp(name, function (result) {
        callback(result);
    });
}