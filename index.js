var Slack = require('node-slack');
var express = require('express');
var bodyParser = require('body-parser');
var database = require("./database");
var pokedex = require('./pokemon');

var slack = new Slack('https://hooks.slack.com/services/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', null);
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("listening.");
});

database.initializeDatabase();
pokedex.init(database);

//database.queryLocation('test');
/*
***Database Functions***
Small documentation of the database.js object and its' functions. Will update as changes are made.

InitialzeDatabase -
    Parameters: None
    Description: Initializes the database and creates the tables. Must call this before call other database functions.

Add Location -
    Parameters: LocationName (String), Latitude (Float), Longitude (Float), CallBack function (message)
    Description: Attempts to add the LocationName and map coordinates into the database. Calls the callback function has a message if add was successful or not.

    Ex.
        database.addLocation('test2', 12, 12, function (message) {
            console.log("AddLocation Message: ", message);
        });

Get All Locations
    Parameters: Callback function (error, result)
    Description: Returns the rows of all of the Locations stored in the database. Calls the callback function with the 1st parameter being an error object (if there is an error),
    and the result object which is an array of objects of all of the Locations in the database.

    Aside- This is the object of a Location row in the database:
    {
        LocationId: (int),
        LocationName: (string),
        Latitude: (float),
        Longitude: (float)
    }

    Ex.
        database.getAllLocations(function (error, rows) {
            console.log("Result", rows);
        });

Query Location
    Parameters: LocationName (string), Callback Function (error, result)
    Description: Returns the result of the LocationName passed then calls the callback function. Result will be undefined if there is nothing found.

    Ex.
        database.queryLocation("test2", function (errow, row) {
            console.log(row);
        });
*/

app.post('/test', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
    
        console.log(hook);
        return {
           text: 'AND HIS NAME IS, ' + hook.user_name,
           username: 'JohnCenaNotABot'
        };
    });
    
    res.json(reply);
    //sendSlackMessage("Hallo");
    //console.log("the req is:",req);
    //console.log("req", req);
    //console.log("headers", req.headers);
    //console.log(req.body);
});

app.post('/pokemon', function (req, res) {
		
    var reply = slack.respond(req.body, function (hook) {
    	var response = res;
        var pkTest = pokedex.pokeParse(hook.text);
         console.log("you are " + pkTest[1]);
         var pokeChoice = pkTest[1].toString();
         var pokeJudge = pokedex.pokeHammer(pokeChoice, pkTest, function (result) {
             res.json({ text: JSON.stringify(result), username: 'poke-slack-go-bot' });
         });
         //var pokeJudge = pokedex.pokeHammer(pokeChoice,pkTest, function (result) {
         //	//console.log(response);
         //    respondBack(req.body, response, result);
         //    //respondBack(req.body, response, result);
         //});
         //sendSlackMessage(pokeJudge);
    });
});

app.post('/down', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
    
        console.log(hook);
        return {
           username: 'SlackBots',
		   icon_emoji: ':slack:',
		   attachments: [
		   {
			   "fallback": 'Server is down!',
			   "color": 'danger',
			   "title": 'Click here to view server issues',
			   "title_link": 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
			   "text": 'This is an emergency!\nPlease advise!!\n'
		   }
		   ]
        };
    });
    
    res.json(reply);
    //sendSlackMessage("Hallo");
    //console.log("the req is:",req);
    //console.log("req", req);
    //console.log("headers", req.headers);
    //console.log(req.body);
});

function respondBack(body, res, text) {
	var reply = slack.respond(body, function (hook) {
		return { text: text, username: 'poke-slack-go-bot' }
	});
	res.json(reply);
};

function sendSlackMessage(message) {
    slack.send({
        text: message,
        channel: '#general',
        username: 'TestBotTyler'
    });
}
