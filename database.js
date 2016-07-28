module.exports = {
    test: function () {
        console.log("testing");
    },
    initializeDatabase() {
        init();
    }
}

var sqlite = require('sqlite3').verbose();
var db;

function init() {
    db = new sqlite.Database('myDb');

    db.serialize(function () {
        db.run("CREATE TABLE TestTable (id INT, stuff TEXT)", function (error) {
            console.log(error);
        });

        /*for (var i = 0; i < 10; i++) {
            db.run("INSERT INTO TestTable VALUES ($id, $stuff)", {
                $id: i,
                $stuff: 'test ' + i
            });
        }*/

        db.each("SELECT * FROM TestTable", function (err, row) {
            console.log(row.id + ' ' + row.stuff);
        });
        //var statement = db.prepare("INSERT INTO TestTable VALUES ($id, $stuff)");


        //statement.run("")
    });
}

function createTables() {
    db.run("CREATE TABLE TestTable (id INT, stuff TEXT)", function (error) {
        console.log(error);
    });

    db.run("CREATE TABLE LogTable " +
        "(LogTableId INTEGER PRIMARY KEY AUTOINCREMENT," +
        " )")
}
/*
var database = function () {
    console.log("Creating DB.");
};

database.prototype.test = function () {
    console.log("NYEHHH SEE?");
};
console.log("ASFDHGASDG");*/