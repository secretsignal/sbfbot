let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request');
// import the discord.js module
const Discord = require('discord.js');

class JokeCommand extends AbstractBaseCommand {
	constructor() {
		super("joke", false, "dad jokes are awesome.");
	}
	do(message) {
		request({
			url: "https://icanhazdadjoke.com/",
			headers: {
				Accept: "text/plain"
			}
		}, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				message.reply(body);
				if (message.testCallback) message.testCallback(body);
			}
		})
	}
}

module.exports = JokeCommand;