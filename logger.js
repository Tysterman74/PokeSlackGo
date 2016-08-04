module.exports = {
    init(db) {
        database = db;
    },
    getLogs(message, callback) {
        getLogs(message, callback);
    }
}

var database;

function getLogs(message, callback) {
    var parseObject = parseMessage(message);

    database.getLogs(function (result) {
        if (result) {
            callback(JSON.stringify(result));
        }
        else {
            callback("Error getting logs.");
        }
    });
}

function parseMessage(message) {
    var parsedMessage = message.split(" ");
    return {
        type: parsedMessage[1]
    };

}