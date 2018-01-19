const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const HSCardCommand = require('../app/commands/hscard_command');

const EXAMPLE_RESULT_SYLVANAS = 'http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/EX1_016_premium.gif';

let command = new HSCardCommand();

describe('#command: hscard', () => {

	describe('-with a valid card', () => {
		let message = TestHelper.getMockMessage();

		it('should return a path to card image', async () => {
            message.content = `!card sylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXAMPLE_RESULT_SYLVANAS);
            };
			command.do(message);
		});
	});

	describe('-with an invalid card', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return error message', async () => {
            message.content = `!card notsylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that card :(`);
            };
			command.do(message);
		});
	});
});