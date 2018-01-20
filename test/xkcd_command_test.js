const {expect} = require('chai');
const request = require('request-promise');
const XKCDCommand = require('../app/commands/xkcdCommand');
const TestHelper = require('./helpers/test_helper');

let LATEST_COMIC = 1941;
let command = new XKCDCommand();

describe('#command: xkcd', () => {
    
    before("get number of latest XKCD comic", async () => {
        let response = await request({
            url: 'https://xkcd.com/info.0.json'
        });
        let info = JSON.parse(response);
        LATEST_COMIC = info.num;
        console.log(`(LATEST_COMIC=${LATEST_COMIC})`);
    });

    describe('-when getting a random comic', () => {
        let message = TestHelper.getMockMessage(); 

        // https://staxmanade.com/2015/11/testing-asyncronous-code-with-mochajs-and-es7-async-await/
        // TODO: Revisit this to get before hook working with async/await
        // before("should return a valid comic", async () => {
        //     console.log('----- IN BEFORE HOOK -----')
        //     message.content = `!xkcd`;
        //     message.testCallback = (response) => {
        //         result = response;
        //     };
        //     command.do(message);
        // });

        // it('should return a valid comic', () => {
        //     console.log('----- in valid comic test -----')
        //     expect(result).to.not.be.undefined;
        //     expect(result.indexOf('#')).to.not.equal(-1);
        // });

        // it(`should return a comic between 1 and LATEST_COMIC (see comment above)`, () => {
        //     console.log('----- in comic range test -----')
        //     let comicNumber = result.substring(1, result.indexOf(' '));
        //     expect(comicNumber > 1 && comicNumber <= LATEST_COMIC).to.equal(true);
        // });

        it('should return a valid comic', TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!xkcd`;
            await command.do(message);
            expect(message.result).to.not.be.undefined;
            expect(message.result.indexOf('#')).to.not.equal(-1);

            let comicNumber = message.result.substring(1, message.result.indexOf(' '));
            expect(comicNumber > 1 && comicNumber <= LATEST_COMIC).to.equal(true);
        }));
    });

    describe('-when getting the latest comic', () => {
        let message = TestHelper.getMockMessage();

        // TODO: Revisit this to get before hook working with async/await
        // before("should return a valid comic", async () => {
        //     message.content = `!xkcd latest`;
        //     message.testCallback = (response) => {
        //         result = response;
        //         done();
        //     };
        //     command.do(message);
        // });

        // it('should return a valid comic', () => {
        //     expect(result).to.not.be.undefined;
        //     expect(result.indexOf('#')).to.not.equal(-1);
        // });

        // it(`should return the latest comic (see comment above)`, () => {
        //     let comicNumber = parseInt(result.substring(1, result.indexOf(' ')));
        //     expect(comicNumber).to.equal(LATEST_COMIC);
        // });

        it("should return a valid comic", TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!xkcd latest`;
            await command.do(message);
            expect(message.result).to.not.be.undefined;
            expect(message.result.indexOf('#')).to.not.equal(-1);

            let comicNumber = parseInt(message.result.substring(1, message.result.indexOf(' ')));
            expect(comicNumber).to.equal(LATEST_COMIC);
        }));
    });

    describe('-when getting comic #221', () => {
        let message = TestHelper.getMockMessage();

        // TODO: Revisit this to get before hook working with async/await
        // before("should return a comic", async () => {
        //     message.content = `!xkcd 221`;
        //     message.testCallback = (response) => {
        //         result = response;
        //         done();
        //     };
        //     command.do(message);
        // });

        // it('should return a valid comic', () => {
        //     expect(result).to.not.be.undefined;
        //     expect(result.indexOf('#')).to.not.equal(-1);
        // });

        // it(`should return comic #221`, () => {
        //     let comicNumber = parseInt(result.substring(1, result.indexOf(' ')));
        //     expect(comicNumber).to.equal(221);
        // });

        it("should return a valid comic", TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!xkcd 221`;
            await command.do(message);

            expect(message.result).to.not.be.undefined;
            expect(message.result.indexOf('#')).to.not.equal(-1);

            let comicNumber = parseInt(message.result.substring(1, message.result.indexOf(' ')));
            expect(comicNumber).to.equal(221);
        }));
    });
});