/**
 * A simple command router to make bot dev easier.
 */

const fs = require('fs');

class CommandRouter {

    constructor(client, guild_id) {
        this.client = client;
        this.guild_id = guild_id;
        this.guild = client.guilds.get(guild_id); // a static reference to the managed guild object.
        this.commands = [];

        let commandsPath = process.env.botenv === "debug" ? "./ubot/app/commands" : "app/commands";
        fs.readdir(commandsPath, (err, files) => {
                if (err) console.log(err);

            files.forEach(file => {
                let command = require("./commands/" + file);
                // TODO: This is ghetto, but not sure of a better way to do this right now.
                let thisCommand = new command(); // instanciate the command from the binary file on the hard drive
                thisCommand.initialize(this.client, this.guild_id); // initialize this new command.
                this.commands.push(thisCommand); // add to the list.
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