/**
 * A simple command router to make bot dev easier.
 */

const fs = require('fs');

class CommandRouter {

    constructor(client, guild_id) {
        this.client = client;
        this.guild_id = guild_id;
        this.commands = [];
        fs.readdir("app/commands", (err, files) => {
            if (err) console.log(err);

            files.forEach(file => {
                let command = require("./commands/" + file);
                this.commands.push(new command());
            });
        });
    }
    route(message) {
        this.commands.map((command) => {
            if (message.content.includes(command.name)) {
                command.do(message);
            }
        });
    }
}

module.exports = CommandRouter;