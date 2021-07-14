const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const HSCardCommand = require('../app/commands/hscard_command');

const EXAMPLE_RESULT_SYLVANAS = 'http://media.services.zam.com/v1/media/byName/hs/cards/enus/animated/EX1_016_premium.gif';

let command = new HSCardCommand();

xdescribe('#command: hscard', () => {

	describe('-with a valid card', () => {
		let message = TestHelper.getMockMessage();

		it('should return a path to card image', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!card sylvanas`;
			await command.do(message);
			expect(message.result).to.equal(EXAMPLE_RESULT_SYLVANAS);
		}));
	});

	describe('-with an invalid card', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return error message', TestHelper.mochaAsyncWrapper(async () => {
			let result
			message.content = `!card notsylvanas`;
			await command.do(message);
			expect(message.result).to.equal(`Sorry, I can't find that card :(`);
		}));
	});
});