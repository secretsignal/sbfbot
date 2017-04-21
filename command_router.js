/**
 * A simple command router to make bot dev easier.
 */

const dir = './commands/'; // the commands will be loaded from here.
const fs = require('fs');

class CommandRouter {

    constructor(client, guild_id) {
        this.client = client;
        this.guild_id = guild_id;
        this.commands = [];
        fs.readdir(dir, (err, files) => {
            files.forEach(file => {
                let command = require(dir + "/" + file);
                this.commands.push(new command());
            });
        });
    }

    add(command) { this.commands.push(command); }
    route(message) {
        this.commands.map((command) => {
            if (message.content.includes(command.name)) {
                command.do(message);
            }
        });
    }
}

module.exports = CommandRouter;