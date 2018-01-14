let AbstractBaseCommand = require('../abstract_base_command');
const request = require('request');

let _getRandomIntInclusive = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
};

let _getRandomComic = (message, latestComicNumber) => {
    let randomNum = _getRandomIntInclusive(1, latestComicNumber);
    _getComicByNumber(message, randomNum);
};

let _getComicByNumber = (message, number) => {
    let returnMessage;
    request({
        url: `https://xkcd.com/${number}/info.0.json`
    }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let info = JSON.parse(body);
            returnMessage = `#${info.num} \n${info.title}\n${info.img}\n${info.alt}`;
            message.channel.sendMessage(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        }
    });
};

class XKCDCommand extends AbstractBaseCommand {
    constructor() {
        super("xkcd", false, "fetches a xkcd comic");
    }

    do(message) {
        let params = super.getParams(message.content, this.name);
        request({
            url: 'https://xkcd.com/info.0.json'
        }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let info = JSON.parse(body);
                if (params === 'latest') _getComicByNumber(message, info.num)
                else if (parseInt(params)) _getComicByNumber(message, parseInt(params));
                else _getRandomComic(message, info.num);
            }
        });
    }
}

module.exports = XKCDCommand;