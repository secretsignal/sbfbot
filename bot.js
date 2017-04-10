require('dotenv').config();

const http = require('http');
const port = process.env.PORT || 8888; // used for a very simple webserver (keeps heroku from shutting down the bot)
http.createServer(function (request, response) { response.statusCode = 200; response.end(); }).listen(port);

const request = require('request');

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

const Hearthstone = require('./hs.js');
const hs = new Hearthstone();

// the token of your bot - https://discordapp.com/developers/applications/me
const TOKEN = process.env.bot_token;
const SBFVGS_ID = '216034888372060162';

let getParams = (content, command) => {
    let length = command.length + 1;
    let index = content.search(command);
    return content.substr(index + length);
}

let getCardCommand = (message) => {
    let card = getParams(message.content, 'card');
    hs.card(card, (result) => message.channel.sendMessage(result));
}

let cardSearchCommand = (message) => {
    let card = getParams(message.content, 'cardsearch');
    hs.cardSearch(card, (results) => {
        results.map((result) => {
            message.channel.sendMessage(result);
        });
    });
}

let xkcdSearchCommand = (message) => {
    request({ url: 'https://xkcd.com/info.0.json' }, function (error, response, body) {
        if (!error && response.statusCode === 200) {
            let info = JSON.parse(body);
            message.channel.sendMessage(info.title + '\n' + info.img + '\n' + info.alt);
        }
    });
}

let commands = [
    { name: 'marco', do: message => message.channel.sendMessage('polo') },
    { name: 'card', do: getCardCommand },
    { name: 'cardsearch', do: cardSearchCommand },
    { name: 'xkcd', do: xkcdSearchCommand }
];

// create an event listener for messages
bot.on('message', message => {
    if (message.isMentioned(bot.user)) {
        commands.map((command) => {
            if (message.content.includes(command.name)) {
                command.do(message);
            }
        });
    }
});

let emojis = {};
let botName = '';

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    emojis = bot.guilds.get(SBFVGS_ID).emojis;
    bot.user.setGame('your mom');
    botName = bot.user.username;
});

// log our bot in
bot.login(TOKEN);
