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
    addCharacter(name, color, type, hpObj, atkObj, spdObj, defObj, resObj, callback) {
        addCharacter(name, color, type, hpObj, atkObj, spdObj, defObj, resObj, callback);
    },
    queryCharacter(name, callback) {
        queryCharacter(name, callback);
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

//Adds a FE character into the FE database.
//Takes in the following:
//  Name (String) - Name of the Character
//  Color (String) - Color Weapon Character wields (Red, Blue, Green, Colorless)
//  Type (String) - Type of Character (Infantry, Flying, Mounted, Armor, Dragon)
//  hpObj (Object { Base: int, Low: int, High: int }) - Base State of HP as well as variance
//  atkObj (Object { Base: int, Low: int, High: int}) - Base State of ATK as well as variance
//  spdObj (Object { Base: int, Low: int, High: int}) - Base State of SPD as well as variance
//  defObj (Object { Base: int, Low: int, High: int}) - Base State of DEF as well as variance
//  resObj (Object { Base: int, Low: int, High: int}) - Base State of RES as well as variance
// callback (Function) - Function to be called once this function finishes
// Returns - Status of EXISTS, OK, or ERROR.
function addCharacter(name, color, type, hpObj, atkObj, spdObj, defObj, resObj, callback) {
    db.query("SELECT * FROM Character WHERE Name = ($1)", [name], function (error, result) {
        if (result.rows.length >= 1) {
            callback("EXISTS");
        }
        else {
                db.query("INSERT INTO Character"+ 
                    "(Name, Color, Type, HPBase, HPLow, HPHigh, AtkBase, AtkLow, AtkHigh,"+
                    " SpdBase, SpdLow, SpdHigh, DefBase, DefLow, DefHigh, ResBase, ResLow, ResHigh)"+
                    "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, "+
                            "$10, $11, $12, $13, $14, $15, $16, $17, $18)", 
                    [name, color, type, hpObj.Base, hpObj.Low, hpObj.High, atkObj.Base, atkObj.Low, atkObj.High,
                     spdObj.Base, spdObj.Low, spdObj.High, defObj.Base, defObj.Low, defObj.High, resObj.Base, resObj.Low, resObj.High], 
                    function (error, result) {
                    if (error) {
                        callback("ERROR")
                    }
                    else {
                        callback("OK");
                        
                    }
                });
        }
    })
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
                        //callback("Successfully added " + locationName + "!");
                        callback(locationName);
                        
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
        db.query("SELECT * FROM Locations", function (error, result) {
            if (error) {
                callback("There was an error retrieving current locations saved. Please try again.");
            }
            else {
                var locations = result.rows;

                if (locations) {
                    var toReturn = "Current Locations are ";

                    for (var i = 0; i < locations.length; i++) {
                        var _l = locations[i];
                        toReturn += "*"+_l.locationname + "*, ";
                    }
                    toReturn += ". To get more details on a current location, use the command to query locations.";
                    callback(toReturn);
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

//Finds a character in the FE Database based on Name.
//Inputs: 
//  Name (String) - Name of character
//  Callback (Function) - Function to be called when this function is done
//  Returns - Either a String of "ERROR" (if error has occured), "DNE" (Does not exist),
//  Or the Character data in this form:
//      { 
//          name: "String", 
//          color: "String", 
//          type: "String", 
//          hpbase: int, 
//          hplow: int, 
//          hphigh: int,
//          atkbase: int, 
//          atklow: int, 
//          atkhigh: int, 
//          spdbase: int, 
//          spdlow: int, 
//          spdhigh: int,
//          defbase: int, 
//          deflow: int, 
//          defhigh: int, 
//          resbase: int, 
//          reslow: int, 
//          reshigh: int
//      }
function queryCharacter(name, callback) {
    db.query("SELECT * FROM Character Where Name = ($1)", [name], function (error, result) {
        if (error) {
            callback("ERROR");
        }
        else {
            var foundCharacter = result.rows[0];
            if (foundCharacter) {
                callback(foundCharacter);
            }
            else {
                callback("DNE");
            }
        }
    });
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

    db.query("CREATE TABLE IF NOT EXISTS Character " +
        "(CharacterId SERIAL PRIMARY KEY NOT NULL, " + 
        " Name VARCHAR(25) NOT NULL, " +
        " Color VARCHAR(15) NOT NULL, " +
        " Type VARCHAR(20) NOT NULL, " +
        " HPBase INTEGER NOT NULL, " +
        " HPLow INTEGER NOT NULL, " + 
        " HPHigh INTEGER NOT NULL, " +
        " AtkBase INTEGER NOT NULL, " +
        " AtkLow INTEGER NOT NULL, " +
        " AtkHigh INTEGER NOT NULL, " +
        " SpdBase INTEGER NOT NULL, " + 
        " SpdLow INTEGER NOT NULL," + 
        " SpdHigh INTEGER NOT NULL," +
        " DefBase INTEGER NOT NULL," +
        " DefLow INTEGER NOT NULL, " + 
        " DefHigh INTEGER NOT NULL," +
        " ResBase INTEGER NOT NULL, " +
        " ResLow INTEGER NOT NULL," +
        " ResHigh INTEGER NOT NULL)",
        function (error, result) {
            if (error) {
                console.log("Error creating Character table", error);
            }
            else {
                console.log("Success in creating Character Table");
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
