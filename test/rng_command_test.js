const {expect} = require('chai');
const RNGCommand = require('../app/commands/rng_command');

let message = {
	channel: {
		sendMessage: () => {}
	}
};
let command = new RNGCommand();

let _getNumberFromString = (str) => parseInt(str.substring(str.indexOf("r: ")+3, str.lastIndexOf('_')));

describe('#command: rng', () => {

    it('should return a random number string', (done) => {
        message.content = '!rng';
        message.testCallback = (result) => {
            expect(result).to.not.be.undefined;
            expect(result).to.be.an('string');
            expect(result.indexOf('_undefined random number:')).to.not.equal(-1);
            done();
        };
        command.do(message);
    });

    it('should return a random number between 1 and 10', (done) => {
        message.content = '!rng 10';
        message.testCallback = (result) => {
            let num = _getNumberFromString(result);
            expect(num >= 1 && num <= 10).to.equal(true);
            done();
        };
        command.do(message);
    });

    it('should return a random number between 1 and 100', (done) => {
        message.content = '!rng 100';
        message.testCallback = (result) => {
            let num = _getNumberFromString(result);
            expect(num >= 1 && num <= 100).to.equal(true);
            done();
        };
        command.do(message);
    });
});