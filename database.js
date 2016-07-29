module.exports = {
    test: function () {
        console.log("testing");
    },
    initializeDatabase() {
        init();
    },
    addLocation(locationName, latitude, longitude) {
        addLocation(locationName, latitude, longitude);
    }
}

var sqlite = require('sqlite3').verbose();
var db;

function init() {
    db = new sqlite.Database('myDb');

    db.serialize(function () {
        //createTables();

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

function addLocation(locationName, latitude, longitude) {
    db.get("SELECT * FROM Locations WHERE LocationName = $locationName", { $locationName: locationName }, function (error, row) {
        console.log("AddLocation Error", error);
        console.log("AddLocation Row", row);

        //If no row is found, add it to the DB
        if (!row) {

        }
        //If row is found, return error statement
        else {

        }
    });
}

function createTables() {
    db.run("CREATE TABLE TestTable (id INT, stuff TEXT)", null, function (error) {
        if (error.errno == 1) {
            console.log("SQL_ERROR");
        }
    });

    db.run("CREATE TABLE Locations (LocationId INTEGER PRIMARY KEY AUTOINCREMENT, LocationName TEXT, Latitude REAL, Longitude REAL)", function (error) {
        console.log(error);
    });

    //console.log(createTestTableStmnt);

    //db.run("CREATE TABLE LogTable " +
    //    "(LogTableId INTEGER PRIMARY KEY AUTOINCREMENT," +
    //    " )")
}