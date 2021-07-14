const {expect} = require('chai');
const ArnieCommand = require('../app/commands/arnie_command');
const TestHelper = require('./helpers/test_helper');

let message = TestHelper.getMockMessage();
let command = new ArnieCommand();
const arnoldEmoji = '<:sbfvgsArnie:437350773744205844>';

describe('#command: arnie', () => {

    it('should respond to a mention of "arnie"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something arnie';
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

    it('should not respond to a mention of "arney"', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.result = null;
        message.content = 'something something arney';
        await command.do(message);
        expect(message.result).to.be.null;
    }));
});