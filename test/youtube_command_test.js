const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});
const TestHelper = require('./helpers/test_helper');

const YoutubeCommand = require('../app/commands/youtube_command');
 
let command = new YoutubeCommand();

xdescribe('#command: youtube', () => {

	describe('-with the query "sir duke stevie wonder"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', TestHelper.mochaAsyncWrapper(async () => {
            let result;
            message.content = `!youtube sir duke stevie wonder`;
            await command.do(message);
            expect(message.result).to.equal(`https://www.youtube.com/watch?v=s6fPN5aQVDI`);
		}));
    });
    
    describe('-with the query "sbfvgs episode 80"', () => {
		let message = TestHelper.getMockMessage();

		it('should return a URL that matches the expected URL', TestHelper.mochaAsyncWrapper(async () => {
            let result;
            message.content = `!youtube sbfvgs episode 80`;            
            await command.do(message);
            expect(message.result).to.equal(`https://www.youtube.com/watch?v=4mWGRwYaADg`);
		}));
    });

	describe('-with a query of "asdfasdfasdasdfasdf123123123"', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return error message', TestHelper.mochaAsyncWrapper(async () => {
            let result;
            message.content = `!youtube asdfasdfasdasdfasdf123123123`;
            await command.do(message);
            expect(message.result).to.equal(`Sorry, an error occured searching Youtube :(`);
		}));
	});
});