'use-strict'

var util = require('util');
var Bot = require('slackbots');

var Bender = function Constructor(settings) {
	this.settings = settings;
	this.settings.name = this.settings.name || 'bender';

	this.user = null;
};

util.inherits(Bender, Bot);

Bender.prototype.run = function() {
	console.log("Bender run function");
	Bender.super_.call(this, this.settings);

	this.on('start', this._onStart);
	this.on('message', this._onMessage);
};

Bender.prototype._onStart = function() {
	console.log("_onStart Ran");
	this._loadBotObject();
	this._welcomeMessage();
};

Bender.prototype._onMessage = function( message ) {
	if (this._isChatMessage(message) && this._isChannelConversation(message) && !this._isFromBender(message) && this._isMentioningBender(message)) {
		this._replyToHuman(message);
	}
};

Bender.prototype._replyToHuman = function( originalMessage ) {
	console.log("Reply Function Working");
	var self = this;
	var channelObj = self._getChannelByID( originalMessage.channel );
	var nameObj = self._getNameByID ( originalMessage.user );
	if ( originalMessage.channel[0] === 'C' ) {
		self.postMessageToChannel( channelObj.name , 'Hey ' + nameObj.name + ', Bite my shiny metal ass!', {as_user: true});
	}
	else if ( originalMessage.channel[0] === 'D' {
		self.postMessageToUser( nameObj.name , 'Shut up, ' + nameObj.name + ', I know it!', {as_user: true});
	}
};

Bender.prototype._getChannelByID = function( channelID ) {
	console.log("getChannelByID running");
	return this.channels.filter(function( item ) {
		return item.id === channelID;
	})[0];
};

Bender.prototype._getNameByID = function( name ) {
	return this.users.filter(function( user ) {
		return user.id === name;
	})[0];
};

Bender.prototype._loadBotObject = function() {
	console.log("loadBotObject");
	var self = this;
	this.user = this.users.filter(function( user ) {
		return user.name === self.name;
	})[0];
};

Bender.prototype._welcomeMessage = function() {
	console.log("welcome message");
	console.log( this.channels[0].name );
	this.postMessageToChannel( this.channels[0].name, "I'm back baby!", {as_user: true});
};

Bender.prototype._isChatMessage = function( message ) {
	return message.type === 'message' && Boolean(message.text);
};

Bender.prototype._isChannelConversation = function( message ) {
	return typeof message.channel === 'string' && (message.channel[0] === 'C' || message.channel[0] === 'D');
};

Bender.prototype._isFromBender = function( message ) {
	return message.user === this.user.id;
};

Bender.prototype._isMentioningBender = function( message ) {
	return message.text.toLowerCase().indexOf('bender') > -1;
};

module.exports = Bender;
