import "pokemon.js";

var Slack = require('node-slack');
var express = require('express');
var bodyParser = require('body-parser');

var slack = new Slack('https://hooks.slack.com/services/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', null);
var app = express();

//app.configure(function () {
//    app.use(bodyParser.json());    
//})
//var jsonParser = bodyParser.json();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.listen(process.env.PORT || 3000, function () {
    console.log("listening.");
});

app.post('/test', function (req, res) {
    var reply = slack.respond(req.body, function (hook) {
    
        console.log(hook);
        pkmn();
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
    
        //console.log(hook);
    });
    sendSlackMessage("Pokedex");
    
    //res.json(reply);
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
