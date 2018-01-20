const {expect} = require('chai');
const JokeCommand = require('../app/commands/joke_command');
const TestHelper = require('./helpers/test_helper');

let message = TestHelper.getMockMessage();
let command = new JokeCommand();

describe('#command: joke', () => {

    it('should return a joke', TestHelper.mochaAsyncWrapper(async () => {
        let result;
        message.content = '!joke';
        await command.do(message);
        expect(message.result).to.not.be.undefined;
    }));
});