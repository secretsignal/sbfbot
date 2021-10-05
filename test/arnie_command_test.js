const {expect} = require('chai');
const ArnieCommand = require('../app/commands/arnie_command');
const TestHelper = require('./helpers/test_helper');

let message = TestHelper.getMockMessage();
let command = new ArnieCommand();
const arnoldEmojiId = "894993017784643624";
const arnoldEmoji = `<:sbfvgsArnie:${arnoldEmojiId}>`;

describe('#command: arnie', () => {

    it('should respond to a mention of "arnie"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something arnie';
        await command.do(message);
        expect(message.result).to.not.be.undefined;
        expect(message.result.includes(arnoldEmoji)).to.be.true;
    }));

    it('should respond to a mention of "Arnie"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something Arnie';
        await command.do(message);
        expect(message.result).to.not.be.undefined;
        expect(message.result.includes(arnoldEmoji)).to.be.true;
    }));

    it('should respond to a mention of "arnold"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something arnold';
        await command.do(message);
        expect(message.result).to.not.be.undefined;
        expect(message.result.includes(arnoldEmoji)).to.be.true;
    }));

    it('should respond to a mention of "Arnold"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something Arnold';
        await command.do(message);
        expect(message.result).to.not.be.undefined;
        expect(message.result.includes(arnoldEmoji)).to.be.true;
    }));

    it('should not respond to a mention of "arney"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something arney';
        await command.do(message);
        expect(message.result).to.be.null;
    }));

    it('should not respond to a use of arnie emoji', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = `something something ${arnoldEmoji}`;
        await command.do(message);
        expect(message.result).to.be.null;
    }));
});