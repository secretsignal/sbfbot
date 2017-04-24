let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request');
const search_url = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
const hscard_headers = { 'X-Mashape-Key': process.env.mashape_hscard_token, 'Accept': 'application/json' };


class XKCDCommand extends AbstractBaseCommand {
    constructor() {
        super("xkcd", false, "fetches the latest xkcd comic");
    }

    do(message) {
        request({ url: 'https://xkcd.com/info.0.json' }, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let info = JSON.parse(body);
                message.channel.sendMessage(info.title + '\n' + info.img + '\n' + info.alt);
            }
        });
    }
}

module.exports = XKCDCommand;