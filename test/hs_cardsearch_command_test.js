const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const HSCardSearchCommand = require('../app/commands/hs_cardsearch_command');

let command = new HSCardSearchCommand();

describe('#command: hs_cardsearch', () => {

    describe('-with the search term "ysera"', () => {
		let message = TestHelper.getMockMessage();

		it('should return an array of 3 search results', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!cardsearch ysera`;
			await command.do(message);
			expect(message.result).to.be.a("array");
			expect(message.result.length).to.equal(3);
		}));
	});

	describe('-with a search term that has no results', () => {
		let message = TestHelper.getMockMessage();

		it('should return error message', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!cardsearch blahblahblah`;
			await command.do(message);
			expect(message.result).to.equal(`Sorry, no results for that card search :(`);
		}));
	});
});