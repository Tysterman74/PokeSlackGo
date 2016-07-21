var Slack = require('node-slack');
var express = require('express');

var slack = new Slack('https://hooks.slack.com/services/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', null);
var app = express();

app.post('/test', function (req, res) {
    sendSlackMessage("Hallo");
    //console.log("the req is:",req);
    console.log("the res is:", res);
});

app.listen(process.env.PORT || 3000, function () {
    console.log("listening.");
});

function sendSlackMessage(message) {
    //var slack = new Slack('https://hooks.slack.com/services/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', null);
    slack.send({
        text: message,
        channel: '#general',
        username: 'TestBotTyler'
    });
}
