let AbstractBaseCommand = require('../abstract_base_command');

class MarcoCommand extends AbstractBaseCommand {
    constructor() {
        super("marco", false, "simple game of marco polo");
    }
    do(message) {
        let returnMessage = 'polo!';
        message.channel.sendMessage(returnMessage);
        if (message.testCallback) message.testCallback(returnMessage);
    }
}

module.exports = MarcoCommand;