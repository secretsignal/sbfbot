let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request-promise');
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
		}).then(response => {
			message.reply(response);
			if (message.testCallback) message.testCallback(response);
		});
	}
}

module.exports = JokeCommand;