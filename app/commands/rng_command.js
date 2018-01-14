let AbstractBaseCommand = require('../abstract_base_command');

class RNGCommand extends AbstractBaseCommand {
	/**
	 * {string} name The Name of this Command
	 * {boolean} adminOnly (optional).  if it can only be run by administrators.
	 */
	constructor() {
		super("rng", false, "roll a number between 0 and X");
	}

	/**
	 * @param {Object} message A discordjs Message object.  
	 * info:  https://discord.js.org/#/docs/main/stable/class/Message
	 */
	do(message) {
		let max = super.getParams(message.content, this.name);
		let value = Math.floor((Math.random() * Number(max)));
		let returnMessage = `_${message.author} random number: ${value}_`;
		message.channel.sendMessage(returnMessage);
		if (message.testCallback) message.testCallback(returnMessage);
	}
}

module.exports = RNGCommand;