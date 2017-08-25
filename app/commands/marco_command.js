let AbstractBaseCommand = require('../abstract_base_command');

class MarcoCommand extends AbstractBaseCommand {
    constructor() {
        super("!marco", false, "simple game of marco polo");
    }
    do(message) {
        message.channel.sendMessage("polo!");
    }
}

module.exports = MarcoCommand;