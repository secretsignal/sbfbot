class TestHelper {
    static getMockMessage() {
        let message = new Object();
        message.channel = {
            send: () => {},
            sendMessage: () => {} // Depreciated
        };
        message.author = {
                sendMessage: () => {}
        };
        message.reply = () => {};
        return message;
    };
}

module.exports = TestHelper;