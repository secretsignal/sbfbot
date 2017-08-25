/**
 *  permissions overview:
 *  https://support.discordapp.com/hc/en-us/articles/206029707
 *  TLDR:  Right now just supporting "ADMINISTRATOR"
 */
class AbstractBaseCommand {
    get name() {
        return this._name;
    }
    get adminOnly() {
        return this._adminOnly;
    }
    get details() {
        return this._description;
    }
    /**
     * 
     * @param {Object} client reference to the bot's discord client object 
     * @param {string} guild_id reference to the specific discord guild ID that we manage.
     */
    static initialize(client, guild_id) {
        this.client = client;
        this.gid = guild_id;
        this.guild = client.guilds.get(guild_id); // a static reference to the managed guild object.
    }

    /** 
     * @param {string} name The Name the commad is recognized by. example:  "card" or "/card" 
     */
    constructor(name, adminOnly = false, description = "") {
        this._name = name;
        this._adminOnly = adminOnly;
        this._description = description;
    }



    call(message) {
        if (this._adminOnly && this.can(message)) this.do(message);
        else message.channel.sendMessage("you do not have permission to use this command.")
    }

    can(message) {
        if (this.guild.member(message.author.id).hasPermission("ADMINISTRATOR")) return true;
        else return false;
    }

    do(message) {
        console.log("AbstracBaseCommand.do was called.")
    }

    /**
     * 
     * @param {string} content 
     * @param {string} command the keyword this command uses
     */
    getParams(content, command) {
        let length = command.length;
        let index = content.search(command);
        return content.substr(index + length);
    }
}

module.exports = AbstractBaseCommand;