let AbstractBaseCommand = require('../abstract_base_command');
const {
    decode
} = require("deckstrings");
const request = require('request-promise');
const url = 'https://api.hearthstonejson.com/v1/latest/enUS/cards.json';
const hscard_headers = {
    'Accept': 'application/json'
};
let cardsjson = null;

const _decodeDeckString = (deckString) => {
    deckString = _checkForLongDeckStringFormat(deckString);
    return decode(deckString);
};

const _checkForLongDeckStringFormat = (deckString) => {
    if (deckString.indexOf('###') !== -1) {
        throw 'No point in decoding a long form deck string';
    }
    return deckString;
};

const _buildFormattedString = (decodedDeckString, deckString) => {
    let cardList = _buildCardList(decodedDeckString.cards);
    let className = _buildClassName(decodedDeckString.heroes[0]);
    let setFormat = decodedDeckString.format === 1 ? 'Wild' : 'Standard';

    let formattedString = ``;
    formattedString += `====================\n`;
    formattedString += `Class: ${className}\n`;
    formattedString += `Format: ${setFormat}\n\n`;
    cardList.forEach((card) => {
        //Ex. 2x Shadow Ascendant (2 Mana, Common)
        formattedString += `${card.amount} ${card.name.replace(/\//g, '')} (${card.cost} Mana, ${card.rarity})\n`;
    });

    formattedString += `\nDecoded From:\n${deckString}\n`;
    formattedString += `====================`;
    return formattedString;
};

const _buildCardList = (cardCodes) => {
    let cardList = [];
    cardCodes.forEach((cardCode) => {
        let cardId = cardCode[0];
        let cardJson = cardsjson.find((e) => e.dbfId === cardId);
        let cardObject = {};
        cardObject.amount = `${cardCode[1]}x`; //Ex. 1x or 2x
        cardObject.cost = cardJson.cost;
        cardObject.name = cardJson.name;
        cardObject.rarity = cardJson.rarity[0].toUpperCase() + cardJson.rarity.substring(1).toLowerCase();

        cardList.push(cardObject);
    });

    // Sort card list by cost
    cardList.sort((a, b) => a.cost - b.cost);

    return cardList;
};

const _buildClassName = (heroId) => {
    let heroJson = cardsjson.find((element) => element.dbfId === heroId && element.type === "HERO");
    return heroJson.cardClass[0].toUpperCase() + heroJson.cardClass.substring(1).toLowerCase();
}

const _fetchHearthstoneJson = () => {
    let opts = {
        url: url
    };
    return request(opts);
};

class HSDecodeCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super('decode', false, 'decode a deck string');
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    do(message) {
        let deckString = super.getParams(message.content, this.name); 
        let returnMessage;
        
        _fetchHearthstoneJson()
         .then(response => {
                cardsjson = JSON.parse(response);
                try {
                    let decodedDeckString = _decodeDeckString(deckString);
                    let formattedString = _buildFormattedString(decodedDeckString, deckString);
                    returnMessage = formattedString;
                } catch (e) {
                    returnMessage = `Sorry, I can't decode that deck string :(`;
                } finally {
                    message.channel.send(returnMessage);
                    if (message.testCallback) message.testCallback(returnMessage);
                }
        })
        .catch(error => {
            console.log(`An error occurred in the decode command: ${error}`);
            message.channel.send(`Sorry, an error occurred executing that command :(`);
        });
    }
}

module.exports = HSDecodeCommand;