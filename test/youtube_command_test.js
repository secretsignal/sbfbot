const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const YoutubeCommand = require('../app/commands/youtube_command');
 
let command = new YoutubeCommand();

describe('#command: youtube', () => {

	xdescribe('-with the query "sir duke stevie wonder"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', async () => {
            message.content = `!youtube sir duke stevie wonder`;
            message.testCallback = (result) => {
                expect(result).to.equal(`https://www.youtube.com/watch?v=s6fPN5aQVDI`);
            };
			command.do(message);
		});
    });
    
    describe('-with the query "sbfvgs episode 80"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', async () => {
            message.content = `!youtube sbfvgs episode 80`;
            message.testCallback = (result) => {
                expect(result).to.equal(`https://www.youtube.com/watch?v=4mWGRwYaADg`);
            };
			command.do(message);
		});
    });

	xdescribe('-with a query of "asdfasdfasdasdfasdf123123123"', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return error message', async () => {
            message.content = `!youtube asdfasdfasdasdfasdf123123123`;
            message.testCallback = (result) => {
                expect(result).to.equal(`Sorry I didn't find anything :(`);
            };
			command.do(message);
		});
	});
});