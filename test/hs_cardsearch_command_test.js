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

		it('should return an array of 3 search results', async () => {
            message.content = `!cardsearch ysera`;
            message.testCallback = (result) => {
                expect(result).to.be.a("array");
                expect(result.length).to.equal(3);
            };
			command.do(message);
		});
	});

	describe('-with a search term that has no results', async () => {
		let message = TestHelper.getMockMessage();

		it('should return error message', async () => {
            message.content = `!cardsearch blahblahblah`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, no results for that card search :(`);
            };
			command.do(message);
		});
	});
});