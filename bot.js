require('dotenv').config();

const commandRouter = require('./app/command_router');
const AbstractBaseCommand = require('./app/abstract_base_command');

const botenv = process.env.ENV || "debug" // the bot's current running environment.
const http = require('http');
const port = process.env.PORT || 8888; // used for a very simple webserver (keeps heroku from shutting down the bot)
http.createServer(function (request, response) {
  response.statusCode = 200;
  response.end();
}).listen(port);

//const Sequelize = require('sequelize')
//var sequelize = new Sequelize(process.env.DATABASE_URL);


// import the discord.js module
const Discord = require('discord.js');
// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();
// the token of your bot - https://discordapp.com/developers/applications/me
const TOKEN = process.env.bot_token;
const SBFVGS_ID = '216034888372060162';

// create an event listener for messages
bot.on('message', message => {

  //if (message.isMentioned(bot.user)) {
  //  this.commandRouter.route(message);
  //}
  if (process.env.botenv === "production") {
    if (message.content.startsWith("!")) {
      this.commandRouter.route(message);
    }
  } else {
    if (message.content.startsWith("?")) {
      this.commandRouter.route(message);
    }
  }
});

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
  bot.user.setGame('Latest SBFVGS Podcast');
  this.commandRouter = new commandRouter(bot, SBFVGS_ID);
  console.log('this bot is now ready.');
});

bot.on('guildMemberAdd', member => {
  member.guild.defaultChannel.send(`Welcome to the server, ${member}!`);
});

bot.on('messageReactionAdd', (reaction, user) => {
  if(reaction.emoji.name === "upvote") {
      reaction.message.channel.send(`<@${reaction.message.author.id}>++ received an upvote for "_${reaction.message.content}_"`);
  }
});

// log our bot in
bot.login(TOKEN);