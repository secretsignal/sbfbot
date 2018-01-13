let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request');
const search_url = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
const hscard_headers = {
    'X-Mashape-Key': process.env.mashape_hscard_token,
    'Accept': 'application/json'
};


class HSCardCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("card", false, "get a hearthstone card by name");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    do(message) {
        if (!message.content.includes('cardsearch')) {
            let card = super.getParams(message.content, this.name);
            let opts = {
                url: encodeURI(search_url + card),
                headers: hscard_headers
            };
            let returnMessage;
            request(opts, function (error, response, body) {
                if (!error && response.statusCode === 200) {
                    let info = JSON.parse(body);
                    returnMessage = info[0].imgGold;
                } else {
                    returnMessage = `Sorry, I can't find that card :(`;
                }

                message.channel.send(returnMessage);
                if (message.testCallback) message.testCallback(returnMessage);
            });
        }
    }
}

module.exports = HSCardCommand;