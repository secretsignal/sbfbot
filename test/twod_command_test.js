const {expect} = require('chai');
const TimeWastedOnDestiny = require('../app/commands/twod_command');

let command = new TimeWastedOnDestiny();

describe('#command: twod', () => {

    describe('-using argument: "ultimakillz"', () => {
        let message = {
            channel: {
                sendMessage: () => {}
            }
        }; 
        let result;

        // TODO: Revisit this to get before hook working with async/await
        // before("should call command with arguments", async () => {
        //     message.content = `!twod ultimakillz`;
        //     message.testCallback = (response) => {
        //         result = response;
        //     };
        //     command.do(message);
        // });
        
        // it('should return a message', () => {
        //     expect(result).to.be.a('string');
        //     expect(result.indexOf('ultimakillz has wasted over')).not.to.equal(-1);
        //     expect(result.indexOf('days playing destiny 2!')).not.to.equal(-1);
        // });
        
        // it('should return a value >= 8', () => {
        //     var twod = parseInt(result.substring(result.indexOf("over ")+5, result.indexOf('days')-1));
        //     expect(twod >= 8).to.equal(true);
        // });
        
        it("should call return a message and have value >= 8", async () => {
            message.content = `!twod ultimakillz`;
            message.testCallback = (response) => {
                result = response;
                expect(result).to.be.a('string');
                expect(result.indexOf('ultimakillz has wasted over')).not.to.equal(-1);
                expect(result.indexOf('days playing destiny 2!')).not.to.equal(-1);     
                
                var twod = parseInt(result.substring(result.indexOf("over ")+5, result.indexOf('days')-1));
                expect(twod >= 8).to.equal(true);
            };
            command.do(message);
        });
    });
    
    describe('-using agruments: "ultimakillz xbox"', () => {
        let message = {
            channel: {
                sendMessage: () => {}
            }
        }; 

		it('should return a error message', async () => {
            message.content = `!twod ultimakillz xbox`;
            message.testCallback = (result) => {
                expect(result).to.be.a('string');
                expect(result).to.equal('UserCannotResolveCentralAccount');
                expect(result.indexOf('ultimakillz has wasted over')).to.equal(-1);
            };
			command.do(message);
		});
	});
});