const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const HSCardCommand = require('../app/commands/hscard_command');

const EXAMPLE_RESULT_SYLVANAS = 'http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/EX1_016_premium.gif';

let message = {
	channel: {
		send: () => {}
	}
}; 
let command = new HSCardCommand();

describe('#command: hscard', () => {

	describe('-with a valid card', () => {

		it('should return a path to card image', (done) => {
            message.content = `!card sylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXAMPLE_RESULT_SYLVANAS);
				done();
            };
			command.do(message);
		});
	});

	describe('-with an invalid card', () => {

		it('should return error message', (done) => {
            message.content = `!card notsylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that card :(`);
				done();
            };
			command.do(message);
		});
	});
});