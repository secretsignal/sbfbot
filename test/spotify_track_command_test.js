const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const SpotifyTrackCommand = require('../app/commands/spotify_track_command');

const EXPECTED_RESULT = 'https://open.spotify.com/album/2HVx2tiZnLX8xeaUthed1e';

let command = new SpotifyTrackCommand();

describe('#command: spotify:track', () => {

	describe('-with the query "sir duke--stevie wonder"', () => {
		let message = TestHelper.getMockMessage(); 

		it('should return a URL that matches the expected URL', TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!spotify-track sir duke--stevie wonder`;
			await command.do(message);
			expect(message.result).to.equal(EXPECTED_RESULT);
		}));
	});

	describe('-with a query of "blahblahblah--blahblahblah"', () => {
		let message = TestHelper.getMockMessage(); 
		
		it('should return error message', TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!spotify-track blahblahblah--blahblahblah`;
			await command.do(message);
			expect(message.result).to.equal(`Sorry, I can't find that track :(`);
		}));
	});
});