module.exports = {
    test: function () {
        console.log("testing");
    },
    initializeDatabase() {
        init();
    },
    addLocation(locationName, latitude, longitude) {
        return addLocation(locationName, latitude, longitude);
    },
    getAllLocations(toRun) {
        console.log("module export", getAllLocations());
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
    try {
        db.serialize(function () {
            db.get("SELECT * FROM Locations WHERE LocationName = $locationName", { $locationName: locationName }, function (e1, row) {
                console.log("AddLocation Error", e1);
                console.log("AddLocation Row", row);

                //If no row is found, add it to the DB
                if (!row) {
                    return db.run("INSERT INTO Locations (LocationName, Latitude, Longitude) VALUES ($locationName, $latitude, $longitude)", { $locationName: locationName, $latitude: latitude, $longitude: longitude }, function (e2) {
                        console.log("e2", e2);
                        if (e2) {
                            throw new Error("There has been an error with adding this location. Please try again.");
                        }
                    });
                }
                    //If row is found, return error statement
                else {
                    throw new Error("LocationName already exists!");
                }
            });
            return locationName + " has been added!";
        });
    }
    catch (err) {
        return err;
    }
}

function getAllLocations(toRun) {
    try {
        db.serialize(function () {
            db.all("SELECT * FROM Locations", function (error, rows) {
                //toRun(error, rows);
                console.log("database AllLocations", rows);
                return rows;
            });
        });
    }
    catch (err) {

    }
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
