let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request-promise');
const search_url = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
const hscard_headers = {
    'X-Mashape-Key': process.env.mashape_hscard_token,
    'Accept': 'application/json'
};


class HSCardSearchCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("cardsearch", false, "searches for hearthstone cards by name");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    async do(message) {
        let card = super.getParams(message.content, this.name);
        let opts = {
            url: encodeURI(search_url + card),
            headers: hscard_headers
        };
        let returnMessage;
        try {
            let response = await request(opts);
            let info = JSON.parse(response);
            let results = [];
            info.map((result) => {
                results.push(result.imgGold);
            });
            returnMessage = results;

            message.author.sendMessage(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        } catch (error) 
        {
            returnMessage = `Sorry, no results for that card search :(`;
            message.author.sendMessage(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        }
    }
}

module.exports = HSCardSearchCommand;