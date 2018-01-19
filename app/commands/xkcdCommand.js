let AbstractBaseCommand = require('../abstract_base_command');
const request = require('request-promise');

let _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

let _getRandomComic = (message, latestComicNumber) => {
    let randomNum = _getRandomIntInclusive(1, latestComicNumber);
    _getComicByNumber(message, randomNum);
};

let _getComicByNumber = async (message, number) => {
    let returnMessage;
    try {
        let response = await request({
            url: `https://xkcd.com/${number}/info.0.json`
        });
        let info = JSON.parse(response);
        returnMessage = `#${info.num} \n${info.title}\n${info.img}\n${info.alt}`;
        message.channel.sendMessage(returnMessage);
        if (message.testCallback) message.testCallback(returnMessage);
    } catch (error) {
        console.log(`Error in XKCD command: ${error}`);
    }
};

class XKCDCommand extends AbstractBaseCommand {
    constructor() {
        super("xkcd", false, "fetches a xkcd comic");
    }

    async do(message) {
        let params = super.getParams(message.content, this.name);
        try {
            let response = await request({
                url: 'https://xkcd.com/info.0.json'
            });
            let info = JSON.parse(response);
            if (params === 'latest') _getComicByNumber(message, info.num)
            else if (parseInt(params)) _getComicByNumber(message, parseInt(params));
            else _getRandomComic(message, info.num);
        } catch (error) {
            console.log('An error occurred in the joke command');
        }
    }
}

module.exports = XKCDCommand;