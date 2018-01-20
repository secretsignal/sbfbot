let AbstractBaseCommand = require('../abstract_base_command');
const request = require('request-promise');

let _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

let _getComicByNumber = async (message, number) => {
    let returnMessage;
    try {
        
    } catch (error) {
        console.log(`Error in XKCD command: ${error}`);
    }
};

class XKCDCommand extends AbstractBaseCommand {
    constructor() {
        super("xkcd", false, "fetches a xkcd comic");
    }

    async do(message) {
        let returnMessage;
        let params = super.getParams(message.content, this.name);
        try {
            let response = await request({
                url: 'https://xkcd.com/info.0.json'
            });
            let info = JSON.parse(response);
            let comicNumber;
            if (params === 'latest') comicNumber = info.num; // Get latest comic
            else if (parseInt(params)) comicNumber = parseInt(params); // Get specific comic #
            else comicNumber = _getRandomIntInclusive(1, info.num); // Get a random comic

            let comicResponse = await request({
                url: `https://xkcd.com/${comicNumber}/info.0.json`
            });

            let comicInfo = JSON.parse(comicResponse);
            returnMessage = `#${comicInfo.num} \n${comicInfo.title}\n${comicInfo.img}\n${comicInfo.alt}`;
            message.channel.sendMessage(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        } catch (error) {
            console.log('An error occurred in the XKCD command');
        }
    }
}

module.exports = XKCDCommand;