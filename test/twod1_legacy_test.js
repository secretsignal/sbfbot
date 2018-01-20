const {expect} = require('chai');
const TimeWastedOnDestiny = require('../app/commands/twod1_legacy');
const TestHelper = require('./helpers/test_helper');

let command = new TimeWastedOnDestiny();

describe('#command: twod1', () => {

    describe('-using argument: "ultimakillz"', () => {
        let message = TestHelper.getMockMessage();
        let result;

        // TODO: Revisit this to get before hook working with async/await
        // before("should call command with arguments", async () => {
        //     message.content = `!twod1 ultimakillz`;
        //     message.testCallback = (response) => {
        //         result = response;
        //     };
        //     command.do(message);
        // });
        
        // it('should return a message', () => {
        //     expect(result).to.be.a('string');
        //     expect(result.indexOf('ultimakillz has wasted over')).not.to.equal(-1);
        //     expect(result.indexOf('days playing destiny 1!')).not.to.equal(-1);
        // });
        
        // it('should return a value >= 72', () => {
        //     var twod = parseInt(result.substring(result.indexOf("over ")+5, result.indexOf('days')-1));
        //     expect(twod >= 72).to.equal(true);
        // });
        
        it("should call command with arguments", TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!twod1 ultimakillz`;
            await command.do(message);

            expect(message.result).to.be.a('string');
            expect(message.result.indexOf('ultimakillz has wasted over')).not.to.equal(-1);
            expect(message.result.indexOf('days playing destiny 1!')).not.to.equal(-1);

            var twod = parseInt(message.result.substring(message.result.indexOf("over ")+5, message.result.indexOf('days')-1));
            expect(twod >= 72).to.equal(true);
        }));
    });
    
    describe('-using agruments: "ultimakillz xbox"', () => {
        let message = TestHelper.getMockMessage();
        
		it('should return a error message', TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!twod1 ultimakillz xbox`;
            await command.do(message);
            expect(message.result).to.be.a('string');
            expect(message.result).to.equal('UserCannotResolveCentralAccount');
            expect(message.result.indexOf('ultimakillz has wasted over')).to.equal(-1);
		}));
	});
});