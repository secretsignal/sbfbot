let AbstractBaseCommand = require('../abstract_base_command');
const request = require('request-promise');
var fs = require("fs");
let sbfvgsJsonPath = process.env.botenv === "debug" ? './ubot/sbfvgs.json' : './sbfvgs.json';
var content = fs.readFileSync(sbfvgsJsonPath);
var jsonContent = JSON.parse(content);

let _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

class SBFVGSCommand extends AbstractBaseCommand {
    constructor() {
        super("sbfvgs", false, "fetches an sbfvgs episode");
    }

    async do(message) {
        let returnMessage;
        let params = super.getParams(message.content, this.name);
        try {
            var episodeNumber = jsonContent.episodes[0].number;
            if (params === 'random') episodeNumber = _getRandomIntInclusive(1, episodeNumber); // Get random episode
            else if (parseInt(params)) episodeNumber = parseInt(params); // Get specific episode

            let episodeInfo = jsonContent.episodes.find((e) => e.number === episodeNumber);
            if (episodeInfo) { 
                returnMessage = `${episodeInfo.link}`;
            } else {
                returnMessage = `Sorry, I can't find that SBFVGS episode :(`;
            }
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        } catch (error) {
            returnMessage = `Sorry, I can't find that SBFVGS episode :(`;
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        }
    }
}

module.exports = SBFVGSCommand;