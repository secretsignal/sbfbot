const {expect} = require('chai');
const request = require('request-promise');
const SBFVGSCommand = require('../app/commands/sbfvgs_command');
const TestHelper = require('./helpers/test_helper');
var fs = require("fs");
var content = fs.readFileSync('./sbfvgs.json');
var jsonContent = JSON.parse(content);
const LATEST_EPISODE_NUM = jsonContent.episodes[0].number;
let command = new SBFVGSCommand();

describe('#command: sbfvgs', () => {
    
    describe('-when getting a random episode', () => {
        let message = TestHelper.getMockMessage(); 

        it('should return a valid episode', TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!sbfvgs random`;
            await command.do(message);
            expect(message.result).to.not.be.undefined;
        }));
    });

    describe('-when getting the latest episode', () => {
        let message = TestHelper.getMockMessage();

        it("should return a valid episode", TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!sbfvgs`;
            await command.do(message);
            expect(message.result).to.not.be.undefined;
            expect(message.result.indexOf(LATEST_EPISODE_NUM)).to.not.equal(-1);
        }));
    });

    describe('-when getting episode #56', () => {
        let message = TestHelper.getMockMessage();

        it("should return a valid episode", TestHelper.mochaAsyncWrapper(async () => {
            message.content = `!sbfvgs 56`;
            await command.do(message);
            expect(message.result).to.not.be.undefined;
            expect(message.result.indexOf(56)).to.not.equal(-1);
        }));
    });
});