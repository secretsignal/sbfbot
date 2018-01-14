const {expect} = require('chai');
const request = require('request');
const XKCDCommand = require('../app/commands/xkcdCommand');

let LATEST_COMIC = 1941;

let message = {
	channel: {
		sendMessage: () => {}
	}
}; 
let command = new XKCDCommand();

describe('#command: xkcd', () => {

    before("get number of latest XKCD comic", (done) => {
        request({
            url: 'https://xkcd.com/info.0.json'
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let info = JSON.parse(body);
                LATEST_COMIC = info.num;
                console.log(`(LATEST_COMIC=${LATEST_COMIC})`);
                done();
            }
        });
    });

    describe('-when getting a random comic', () => {
        let result;

        before("should return a valid comic", (done) => {
            message.content = `!xkcd`;
            message.testCallback = (response) => {
                result = response;
                done();
            };
            command.do(message);
        });

        it('should return a valid comic', () => {
            expect(result).to.not.be.undefined;
            expect(result.indexOf('#')).to.not.equal(-1);
        });

        it(`should return a comic between 1 and LATEST_COMIC (see comment above)`, () => {
            let comicNumber = result.substring(1, result.indexOf(' '));
            expect(comicNumber > 1 && comicNumber <= LATEST_COMIC).to.equal(true);

        });
    });

    describe('-when getting the latest comic', () => {
        let result;

        before("should return a valid comic", (done) => {
            message.content = `!xkcd latest`;
            message.testCallback = (response) => {
                result = response;
                done();
            };
            command.do(message);
        });

        it('should return a valid comic', () => {
            expect(result).to.not.be.undefined;
            expect(result.indexOf('#')).to.not.equal(-1);
        });

        it(`should return the latest comic (see comment above)`, () => {
            let comicNumber = parseInt(result.substring(1, result.indexOf(' ')));
            expect(comicNumber).to.equal(LATEST_COMIC);
        });
    });

    describe('-when getting comic #221', () => {
        let result;

        before("should return a comic", (done) => {
            message.content = `!xkcd 221`;
            message.testCallback = (response) => {
                result = response;
                done();
            };
            command.do(message);
        });

        it('should return a valid comic', () => {
            expect(result).to.not.be.undefined;
            expect(result.indexOf('#')).to.not.equal(-1);
        });

        it(`should return comic #221`, () => {
            let comicNumber = parseInt(result.substring(1, result.indexOf(' ')));
            expect(comicNumber).to.equal(221);
        });
    });
});