const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const SpotifyAlbumCommand = require('../app/commands/spotify_album_command');

const EXPECTED_RESULT = 'https://open.spotify.com/album/0puQN87m8wxSu8lcDkwV2k';

let message = {
	channel: {
		send: () => {}
	}
}; 
let command = new SpotifyAlbumCommand();

describe('#command: spotify:album', () => {

	describe('-with the query "second stage turbine blade"', () => {

		it('should return a URL that matches the expected URL', (done) => {
            message.content = `!spotify-album second stage turbine blade`;
            message.testCallback = (result) => {
                expect(result).to.equal(EXPECTED_RESULT);
				done();
            };
			command.do(message);
		});
	});

	describe('-with a query of "notsylvanas"', () => {

		it('should return error message', (done) => {
            message.content = `!spotify-album notsylvanas`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry, I can't find that album :(`);
				done();
            };
			command.do(message);
		});
	});
});