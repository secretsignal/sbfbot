const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const SpotifyTrackCommand = require('../app/commands/spotify_track_command');

const EXPECTED_RESULT = 'https://open.spotify.com/album/2HVx2tiZnLX8xeaUthed1e';

let message = {
	channel: {
		send: () => {}
	}
}; 
let command = new SpotifyTrackCommand();

describe('#command: spotify:track', () => {

	describe('-with the query "sir duke--stevie wonder"', () => {

		it('should return a URL that matches the expected URL', async () => {
            message.content = `!spotify-track sir duke--stevie wonder`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXPECTED_RESULT);
            };
			command.do(message);
		});
	});

	describe('-with a query of "blahblahblah--blahblahblah"', () => {

		it('should return error message', async () => {
            message.content = `!spotify-track blahblahblah--blahblahblah`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that album :(`);
            };
			command.do(message);
		});
	});
});