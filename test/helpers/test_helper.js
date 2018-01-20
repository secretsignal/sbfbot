class TestHelper {
    static getMockMessage() {
        let message = new Object();
        message.result;
        message.channel = {
            send: () => {},
            sendMessage: () => {} // Depreciated
        };
        message.author = {
                sendMessage: () => {}
        };
        message.reply = () => {};
        message.testCallback = (r) => { 
            message.result = r;
        };
        return message;
    };

    // https://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/
    static mochaAsyncWrapper(fn) {
        return (done) => {
          fn.call().then(done, (err)=>{done(err)});
        };
    };
}

module.exports = TestHelper;