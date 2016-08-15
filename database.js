module.exports = {
    test: function () {
        console.log("testing");
    },
    initializeDatabase(client) {
        init(client);
    },
    addLocation(locationName, latitude, longitude, callback) {
        addLocation(locationName, latitude, longitude, callback);
    },
    getAllLocations(toRun) {
        getAllLocations(toRun);
    },
    queryLocation(locationName, callback) {
        queryLocation(locationName, callback);
    },
    logDebugMessage(message, user) {
        logMessage("DEBUG", message, user);
    },
    logErrorMessage(message, user, stackTrace) {
        logMessage("ERROR", message, user, stackTrace)
    },
    getLogs(callback) {
        getLogs(callback);
    }
}

//var sqlite = require('sqlite3').verbose();
var db;

function init(client) {
    //db = new sqlite.Database('myDb');
    db = client;

    createTables();
    //db.serialize(function () {
    //    createTables();
    //
    //    //db.each("SELECT * FROM TestTable", function (err, row) {
    //    //    console.log(row.id + ' ' + row.stuff);
    //    //});
    //});
}

function addLocation(locationName, latitude, longitude, callback) {
    try {
        db.query("SELECT * FROM Locations WHERE LocationName = ($1)", [locationName], function (error, result) {
            if (result.rows.length >= 1) {
                callback(locationName + " already exists!");
            }
            else {
                db.query("INSERT INTO Locations (LocationName, Latitude, Longitude) VALUES ($1, $2, $3)", [locationName, latitude, longitude], function (error, result) {
                    if (error) {
                        callback("There was an error adding this location. Please try again.")
                    }
                    else {
                        callback("Successfully added " + locationName + "!");
                    }
                });
            }
        });
    }
    catch (err) {
        return err;
    }
}

function getAllLocations(callback) {
    try {
        //db.serialize(function () {
        //    db.all("SELECT * FROM Locations", function (error, rows) {
        //        toRun(error, rows);
        //    });
        //});
        db.query("SELECT * FROM Locations", function (error, result) {
            //callback(JSON.stringify(result));
            if (error) {
                callback("There was an error retrieving current locations saved. Please try again.");
            }
            else {
                var locations = result.rows;

                if (locations) {
                    var toReturn = "Current Locations are: \n";

                    for (var i = 0; i < locations.length; i++) {
                        var _l = locations[i];
                        toReturn += _l.locationname + "\n";
                    }
                    toReturn = "To get more details on a current location, use the command to query locations.";
                }
                else {
                    callback("No locations have been added. Use the command to add locations now!");
                }
            }
        });
    }
    catch (err) {

    }
}

function queryLocation(locationName, callback) {
    try {
        db.query("SELECT * FROM Locations WHERE LocationName = $1", [locationName], function (error, result) {
            if (error) {
                callback("There was an error retrieving " + locationName);
            } else {
                var foundLocation = result.rows[0];
                //callback(JSON.stringify(result));
                if (foundLocation) {
                    callback("Found location " + foundLocation.locationname + " at " + foundLocation.latitude + ", " + foundLocation.longitude);
                }
                else {
                    callback("Could not find " + locationName + ". Check your spelling?");
                }
            }
        });
    }
    catch (err) {

    }
}

function createTables() {
    db.query("CREATE TABLE IF NOT EXISTS Locations " +
        "(LocationId SERIAL PRIMARY KEY NOT NULL, " +
        " LocationName VARCHAR(255) NOT NULL, " +
        " Latitude FLOAT NOT NULL, " +
        " Longitude FLOAT NOT NULL)",
        function (error, result) {
            if (error) {
                console.log("Error creating Locations Table", error);
            }
            else {
                console.log("Success in creating Locations Table");
            }
        });

    db.query("CREATE TABLE IF NOT EXISTS Logs " +
        "(LogId SERIAL PRIMARY KEY NOT NULL, " +
        " LogType VARCHAR(25) NOT NULL, " +
        " LogMessage VARCHAR(255) NULL, " +
        " LogUser VARCHAR(255) NULL, " +
        " StackTrace VARCHAR(MAX) NULL, " +
        " LogDate DATETIME NULL)",
        function (error, result) {
            if (error, result) {
                console.log("Error creating Logs table", error);
            }
            else {
                console.log("success in creating logs table");
            }
        });
}

function logMessage(type, message, user, stackTrace) {
    //db.run("INSERT INTO Logs (LogType, LogMessage, LogUser, StackTrace, LogDate) VALUES ($LogType, $LogMessage, $LogUser, $StackTrace, datetime('now'))",
    //    {
    //        $LogType: type,
    //        $LogMessage: message,
    //        $LogUser: user,
    //        $StackTrace: stackTrace
    //    },
    //    function (error) {
    //        if (error) {
    //            console.log(error);
    //        }
    //        else {
    //            console.log("Message successfully logged.");
    //        }
    //    });
}

function getLogs(callback) {
    //db.all("SELECT * FROM Logs", function (error, rows) {
    //    if (error) {
    //        console.log("Error getting logs", error);
    //        callback(null);
    //    }
    //    else {
    //        console.log("rows", rows);
    //        callback(rows);
    //    }
    //});
}