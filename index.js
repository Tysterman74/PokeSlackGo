var Slack = require('node-slack');
var express = require('express');
var bodyParser = require('body-parser');
var database = require("./database");
var pokedex = require('./pokemon');
var BenderBot = require('./bender');
var logger = require('./logger');
var pg = require('pg');
var readline = require('readline');
var parser = require('./parser');
var fs = require('fs');
var feCalc = require('./fecalc');
var cLookUp = require('./characterlookup');
var vLookUp = require('./weaponlookup');
var fe = require('./fe');

var slack = new Slack('https://hooks.slack.com/services/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', null);
var app = express();

//Bot Creation
var token = process.env.BOT_KEY_API;
//var LOCAL = true;
var RUNNING_PRODUCTION = process.env.RUNNING_PRODUCTION;
console.log(RUNNING_PRODUCTION);

var bender = new BenderBot({
	token: token,
	name: 'bender'
});

pg.defaults.ssl = true;
pg.connect(RUNNING_PRODUCTION ? process.env.DATABASE_URL : "postgres://ubxahnokhymbcy:OgCT_vW_TRGNAuWokK7uwwP-J2@ec2-54-243-204-129.compute-1.amazonaws.com:5432/ddkickb54hq93j", function (err, client) {
    if (err) {
        sendSlackMessage("Was not able to connect to database.");
    }
    else {
        //sendSlackMessage("Successfully connect to Postgres database!");
        database.initializeDatabase(client);

    }

});
//bender.run();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("listening.");
});

//database.initializeDatabase();
pokedex.init(database);
logger.init(database);
parser.init();
cLookUp.init(database);
vLookUp.init(database);
fe.init(cLookUp);

/*database.getLogs(function (result) {
    console.log(result);
});

database.logDebugMessage('Testing debug', 'tyler_test');
database.logErrorMessage('Testing error', 'tyler_test', 'here is the error');*/

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

/*bender.on('start',function() {
	bender.postMessageToChannel('general', 'Bite my shiny metal ass!');
});*/

app.post('/logger', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
        logger.getLogs(hook.text, function (result) {
            res.json({ text: result, username: 'LoggerBotButthole' });
        });
        //console.log(hook);
        //return {
        //   text: 'AND HIS NAME IS, ' + hook.user_name,
        //   username: 'JohnCenaNotABot'
        //};
    });
    
    //res.json(reply);
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
             res.json({ text: result, username: 'poke-slack-go-bot' });
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

//Req.Body:
/*
{ token: 'x6cqHVsDVkLYv6mcZLx9Bcqs',
 team_id: 'T1AC468DD',
 team_domain: 'dreams-are-not-dreams',
 service_id: '150531051971',
 channel_id: 'C4EL6M0MB',
 channel_name: 'testing',
 timestamp: '1488857906.000011',
 user_id: 'U1AAPF6GK',
 user_name: 'tynutsathitya',
 text: 'fe-heroes test',
 trigger_word: 'fe-heroes' }
*/
app.post('/fe-heroes', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
        console.log(req.body);
        //res.json({ text: "Test" });
        //res.json(hook);
        var parsedLine = parser.fullParse(hook.text);
        fe.execute(parsedLine, function (result) {
            res.json(result);
        });
    });
});

const r1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: "Start Typing>"
})

//This snippet here is used when running the server locally.
if (!RUNNING_PRODUCTION)
    debugFlow();

//We prompt on the command line the line that we would type in the Slack chat.
//It then takes the line object which is the string.
function debugFlow() {
    r1.prompt();
    r1.on('line', (line) => {
        if (line == 'EXIT') {
            console.log("exiting");
        } else {
            //INSERT HERE THE LOGIC TO TEST
		var pObject = parser.fullParse(line);
		//console.log(pObject);
		vLookUp.lookUp(pObject.data, function(result){
			sendSlackJson(result);
		});
        }
        r1.prompt(); 
    }).on('close', () => {
        console.log("Shutting down");
        process.exit(0);
    });
}

function respondBack(body, res, text) {
	var reply = slack.respond(body, function (hook) {
		return { text: text, username: 'poke-slack-go-bot' }
	});
	res.json(reply);
};

function sendSlackJson(toReturn) {
    toReturn.channel = '#testing';
    toReturn.username = 'TestBotTyler';
    slack.send(toReturn);
}

function sendSlackMessage(message) {
    slack.send({
        text: message,
        channel: '#testing',
        username: 'TestBotTyler'
    });
}
