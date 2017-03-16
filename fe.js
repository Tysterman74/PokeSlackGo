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
            characterLookup(name, callback);
            break;
        default:
            break;
    }
}

function characterLookup(name, callback) {
    characterLookupObj.setName(name)
    characterLookupObj.lookUp(name, function (result) {
        callback(result);
    });
}