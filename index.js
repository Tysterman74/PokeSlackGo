var Slack = require('node-slack');
var express = require('express');
var bodyParser = require('body-parser');
var database = require("./database");
//var serveStatic = require('serve-static');

var slack = new Slack('https://hooks.slack.com/services/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', null);
var app = express();

var pokedex = require('./pokemon');
//app.configure(function () {
//    app.use(bodyParser.json());    
//})
//var jsonParser = bodyParser.json();

//app.use(serveStatic(__dirname + '/js'));
//app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("listening.");
    //var db = new database();
});

//var db = new database();
database.test();
database.initializeDatabase();
database.addLocation('test', -22.235, 41.235);

app.post('/test', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
        
        //sendSlackMessage(JSON.stringify(hook));
        //console.log(hook.text);
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
        var pkTest = pokedex.pokeParse(hook.text);
        console.log("you are " + pkTest[1]);
        var pokeChoice = pkTest[1].toString();
        var pokeJudge = pokedex.pokeHammer(pokeChoice,pkTest);
        sendSlackMessage(pokeJudge);
    });
    
    //pokedex.test();
    
    res.json(reply);
    //sendSlackMessage("Hallo");
    //console.log("the req is:",req);
    //console.log("req", req);
    //console.log("headers", req.headers);
    //console.log(req.body);
});


function sendSlackMessage(message) {
    slack.send({
        text: message,
        channel: '#general',
        username: 'TestBotTyler'
    });
}
