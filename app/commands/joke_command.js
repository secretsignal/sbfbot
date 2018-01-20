let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request-promise');
// import the discord.js module
const Discord = require('discord.js');

class JokeCommand extends AbstractBaseCommand {
	constructor() {
		super("joke", false, "dad jokes are awesome.");
	}
	async do(message) {
		try {
			let response = await request({
				url: "https://icanhazdadjoke.com/",
				headers: {
					Accept: "text/plain"
				}
			});
			message.reply(response);
			if (message.testCallback) message.testCallback(response);
		} catch (error) {
			console.log('An error occurred in the joke command');
		}
	}
}

module.exports = JokeCommand;