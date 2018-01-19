const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const SpotifyArtistCommand = require('../app/commands/spotify_artist_command');

const EXPECTED_RESULT = 'https://open.spotify.com/artist/3utxjLheHaVEd9bPjQRsy8';

let command = new SpotifyArtistCommand();

describe('#command: spotify:artist', () => {

	describe('-with the query "coheed and cambria"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', async () => {
            message.content = `!spotify-artist coheed and cambria`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXPECTED_RESULT);
            };
			command.do(message);
		});
	});

	describe('-with a query of "notsylvanas"', () => {
		let message = TestHelper.getMockMessage();

		it('should return error message', async () => {
            message.content = `!spotify-artist notsylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that artist :(`);
            };
			command.do(message);
		});
	});
});