let AbstractBaseCommand = require('../abstract_base_command');

class ExampleCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("example", false);
    }

    /**
    * @param {Object} message A discordjs Message object.  
    * info:  https://discord.js.org/#/docs/main/stable/class/Message
    */
    do(message) {
        message.channel.sendMessage("http://www.troll.me/images/futurama-fry/could-be-a-man-in-robotsuit-or-could-it-be-robot-in-mansuit-in-a-robotsuit-thumb.jpg");
    }
}

module.exports = ExampleCommand;