const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const SpotifyArtistCommand = require('../app/commands/spotify_artist_command');

const EXPECTED_RESULT = 'https://open.spotify.com/artist/3utxjLheHaVEd9bPjQRsy8';

let message = {
	channel: {
		send: () => {}
	}
}; 
let command = new SpotifyArtistCommand();

describe('#command: spotify:artist', () => {

	describe('-with the query "coheed and cambria"', () => {

		it('should return a URL that matches the expected URL', (done) => {
            message.content = `!spotify-artist coheed and cambria`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXPECTED_RESULT);
				done();
            };
			command.do(message);
		});
	});

	describe('-with a query of "notsylvanas"', () => {

		it('should return error message', (done) => {
            message.content = `!spotify-artist notsylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that artist :(`);
				done();
            };
			command.do(message);
		});
	});
});