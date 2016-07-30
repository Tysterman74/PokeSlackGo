module.exports = {
    test: function () {
        console.log("testing");
    },
    initializeDatabase() {
        init();
    },
    addLocation(locationName, latitude, longitude, callback) {
        addLocation(locationName, latitude, longitude, callback);
    },
    getAllLocations(toRun) {
        getAllLocations(toRun);
    },
    queryLocation(locationName, callback) {
        queryLocation(locationName, callback);
    }
}

var sqlite = require('sqlite3').verbose();
var db;

function init() {
    db = new sqlite.Database('myDb');

    db.serialize(function () {
        createTables();

        //db.each("SELECT * FROM TestTable", function (err, row) {
        //    console.log(row.id + ' ' + row.stuff);
        //});
    });
}

function addLocation(locationName, latitude, longitude, callback) {
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
                            callback("There has been an error with adding this location. Please try again.");
                        }
                    });
                }
                    //If row is found, return error statement
                else {
                    callback("LocationName already exists!");
                }
            });
            callback(locationName + " has been added!");
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
                toRun(error, rows);
            });
        });
    }
    catch (err) {

    }
}

function queryLocation(locationName, callback) {
    try {
        db.serialize(function () {
            db.get("SELECT * FROM Locations WHERE LocationName = $LocationName", { $LocationName: locationName }, function (error, row) {
                callback(error, row);
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
