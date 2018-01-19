const {expect} = require('chai');
const JokeCommand = require('../app/commands/joke_command');
const TestHelper = require('./helpers/test_helper');

let message = TestHelper.getMockMessage();
let command = new JokeCommand();

describe('#command: joke', () => {

    it('should return a joke', async () => {
        message.content = '!joke';
        message.testCallback = (result) => {
            expect(result).to.not.be.undefined;
        };
        command.do(message);
    });
});