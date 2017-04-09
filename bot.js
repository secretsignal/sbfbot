require('dotenv').config();

var http = require("http"), port = process.env.PORT || 8888; // used for a very simple webserver (keeps heroku from shutting down the bot)
http.createServer(function (request, response) { response.statusCode = 200; response.end(); }).listen(port);

var request = require('request');

// import the discord.js module
const Discord = require('discord.js');

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = process.env.bot_token;
const sbfvgs_id = "216034888372060162";
const hscard_url = "https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/";
const hscard_headers = { "X-Mashape-Key": process.env.mashape_hscard_token, "Accept": "application/json" };

let emojis = {};
let botName = "";







// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    emojis = bot.guilds.get(sbfvgs_id).emojis;
    bot.user.setGame("beep beep boop");
    botName = bot.user.username;
});

// create an event listener for messages
bot.on('message', message => {
    if (message.isMentioned(bot.user)) {
        // // if the message is "ping",
        if (message.content.search("marco") != -1) {
            // send "pong" to the same channel.
            message.channel.sendMessage('polo');
        }

        // if (message.content === "emote") {
        //     var emoji = bot.guilds.get(sbfvgs_id).emojis.first();
        //     console.log("custom emoji is:  " + emoji.name + "  code:  " + emoji.toString());
        //     message.channel.sendMessage(message.guild.emojis.random().toString());
        // }


        // if (message.content.startsWith("cardjson")) {
        //     var card = message.content.substr(10);
        //     var opts = { url: encodeURI(hscard_url + card), headers: hscard_headers };
        //     console.log("hscard: requesting:  " + opts.url);
        //     request(opts, function (error, response, body) {
        //         if (!error && response.statusCode == 200) {
        //             var info = JSON.parse(body);
        //             console.log("found card: " + info[0].name);
        //             console.log(JSON.stringify(info));
        //             message.channel.sendMessage("```" + JSON.stringify(info) + "```");
        //         }
        //     });

        // }

        if (message.content.search("card") != -1) {
            let index = message.content.search("card");
            var card = message.content.substr(index + 6);
            var opts = { url: encodeURI(hscard_url + card), headers: hscard_headers };
            console.log("hscard: requesting:  " + opts.url);
            request(opts, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    message.channel.sendMessage(info[0].imgGold);
                }
            });
        }

        if (message.content.search("xkcd") != -1) {
            let index = message.content.search("xkcd");
            let item = message.content.substr(index + 6);
            let url = "https://xkcd.com/";
            request({ url: "https://xkcd.com/info.0.json" }, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    var info = JSON.parse(body);
                    message.channel.sendMessage(info.title + "\n" + info.img + "\n" + info.alt);
                }
            });
        }
    }

    //message.react(message.guild.emojis.random());
});

// log our bot in
bot.login(token);