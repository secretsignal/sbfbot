let AbstractBaseCommand = require('../abstract_base_command');

class MarcoCommand extends AbstractBaseCommand {
    constructor() { super("marco", false); }
    do(message) { message.channel.sendMessage("polo!"); }
}

module.exports = MarcoCommand;