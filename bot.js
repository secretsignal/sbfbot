require('dotenv').config();

const botenv = process.env.ENV || "debug" // the bot's current running environment.
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

const sbfGuild = {};

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

let setBotStatusCommand = (message) => {
  let status = getParams(message.content, 'status');
  bot.user.setGame(status);
  console.log("setting bot status to: " + message.content);
}

let commands = [
  { name: 'marco', do: message => message.channel.sendMessage('polo') },
  { name: 'card', do: getCardCommand },
  { name: 'cardsearch', do: cardSearchCommand },
  { name: 'xkcd', do: xkcdSearchCommand },
  { name: 'status', do: setBotStatusCommand, restricted: true }
];

// create an event listener for messages
bot.on('message', message => {
  if (message.isMentioned(bot.user)) {
    commands.map((command) => {
      if (message.content.includes(command.name)) {
        if (command.restricted) {
          if (bot.guilds.get(SBFVGS_ID).member(message.author.id).hasPermission("ADMINISTRATOR")) command.do(message)
          else message.channel.sendMessage("https://media0.giphy.com/media/lAEuCCvZUofAI/giphy.gif");
        }
        else {
          command.do(message);
        }
        console.log(message.author + " " + message.author);
      }
    });
  }
});

let emojis = {};
let botName = '';

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  bot.user.setGame('Latest SBFVGS Podcast');
  botName = bot.user.username;
});

// log our bot in
bot.login(TOKEN);
