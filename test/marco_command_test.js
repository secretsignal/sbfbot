const {expect} = require('chai');
const MarcoCommand = require('../app/commands/marco_command');
const TestHelper = require('./helpers/test_helper');

let message = TestHelper.getMockMessage();
let command = new MarcoCommand();

describe('#command: marco', () => {

    it('should return "polo"', (done) => {
        message.content = '!marco';
        message.testCallback = (result) => {
            expect(result).to.not.be.undefined;
            expect(result).to.equal('polo!')
            done();
        };
        command.do(message);
    });
});