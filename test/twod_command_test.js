const {expect} = require('chai');
const TimeWastedOnDestiny = require('../app/commands/twod_command');

let message = {
	channel: {
		sendMessage: () => {}
	}
}; 
let command = new TimeWastedOnDestiny();

describe('#command: twod', () => {

    describe('-using argument: "ultimakillz"', () => {
        let result;

        before("should call command with arguments", (done) => {
            message.content = `!twod ultimakillz`;
            message.testCallback = (response) => {
                result = response;
                done();
            };
            command.do(message);
        });
        
        it('should return a message', () => {
            expect(result).to.be.a('string');
            expect(result.indexOf('ultimakillz has wasted over')).not.to.equal(-1);
            expect(result.indexOf('days playing destiny 2!')).not.to.equal(-1);
        });
        
        it('should return a value >= 8', () => {
            var twod = parseInt(result.substring(result.indexOf("over ")+5, result.indexOf('days')-1));
            expect(twod >= 8).to.equal(true);
		});
    });
    
    describe('-using agruments: "ultimakillz xbox"', () => {

		it('should return a error message', (done) => {
            message.content = `!twod ultimakillz xbox`;
            message.testCallback = (result) => {
                expect(result).to.be.a('string');
                expect(result).to.equal('UserCannotResolveCentralAccount');
                expect(result.indexOf('ultimakillz has wasted over')).to.equal(-1);
                done();
            };
			command.do(message);
		});
	});
});