let AbstractBaseCommand = require('../abstract_base_command');

class BotStatusCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("!botstatus", true, "change the bot status - this command is admins only");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    do(message) {
        let status = super.getParams(message.content, this.name);
        bot.user.setGame(status);
    }
}

module.exports = BotStatusCommand;