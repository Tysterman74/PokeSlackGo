module.exports = {
    init(db) {
        database = db;
    },
    getLogs(message, filter, callback) {
        getLogs(message, callback);
    }
}

var database;

function getLogs(message, callback) {
    var parseObject = parseMessage(message);
    callback("Returning shit here.");
}

function parseMessage() {

}