let AbstractBaseCommand = require('../abstract_base_command');

class RollCommand extends AbstractBaseCommand {
	/**
	 * {string} name The Name of this Command
	 * {boolean} adminOnly (optional).  if it can only be run by administrators.
	 */
	constructor() {
		super("roll", false, "roll a number between 1 and X");
	}

	/**
	 * @param {Object} message A discordjs Message object.  
	 * info:  https://discord.js.org/#/docs/main/stable/class/Message
	 */
	do(message) {
		let max = super.getParams(message.content, this.name);
		let value = Math.floor((Math.random() * Number(max)));
		message.channel.sendMessage(`_${message.author} rolled a ${value}_`);
	}
}

module.exports = RollCommand;