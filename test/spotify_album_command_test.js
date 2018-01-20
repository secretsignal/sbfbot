const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const SpotifyAlbumCommand = require('../app/commands/spotify_album_command');

const EXPECTED_RESULT = 'https://open.spotify.com/album/0puQN87m8wxSu8lcDkwV2k';
 
let command = new SpotifyAlbumCommand();

describe('#command: spotify:album', () => {

	describe('-with the query "second stage turbine blade"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!spotify-album second stage turbine blade`;
			await command.do(message);
			expect(message.result).to.equal(EXPECTED_RESULT);
		}));
	});

	describe('-with a query of "notsylvanas"', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return error message', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!spotify-album notsylvanas`;
			await command.do(message);
			expect(message.result).to.equal(`Sorry, I can't find that album :(`);
		}));
	});
});