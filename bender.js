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
	Bender.super._call(this, this.settings);

	this.on('start', this._onStart);
	this.on('message', this._onMessage);
};

Bender.prototype._onStart = function() {
	this._loadBot();
	this._welcomeMessage();
};

Bender.prototype._onMessage = function() {
	if (this._isChatMessage(message) &&
		this._isChannelConversation(message) &&
		!this._isFromBender(message) &&
		this._isMentioningBender(message)) {
		this._replyToHuman(message);
	}
};

Bender.prototype._replyToHuman = function( originalMessage ) {
	var channel = self._getChannelByID( originalMessage.channel );
	self.postMessageToChannel(channel.name, 'Hey ' + originalMessage.user + ', Bite my shiny metal ass!', {as_user: true});
};

Bender.prototype._getChannelByID = function( channelID ) {
	return this.channels.filter(function( item ) {
		return item.id === channelID;
	})[0];
};

Bender.prototype._loadBot = function() {
	var self = this;
	this.user = this.users.filter(function( user ) {
		return user.name === self.name;
	})[0];
};

Bender.prototype._welcomeMessage = function() {
	this.postMessageToChannel( this.channels[0].name, 'Sup Humans.', {as_user: true});
};

Bender.prototype._isChatMessage = function( message ) {
	return message.type === 'message' && Boolean(message.text);
};

Bender.prototype._isChannelConversation = function( message ) {
	return typeof message.channel === 'string' && message.channel[0] === 'C';
};

Bender.prototype._isFromBender = function( message ) {
	return message.user === this.user.id;
};

Bender.prototype._isMentioningBender = function( message ) {
	return message.text.toLowerCase().indexOf('bender') > -1;
};

module.exports = Bender;
