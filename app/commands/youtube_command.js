//GET https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5&q=sir+duke+stevie+wonder&key={YOUR_API_KEY}
let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request-promise');
const search_url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=5';

class YoutubeCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("youtube", false, "search for a youtube video");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    async do(message) {
        let query = super.getParams(message.content, this.name);
        let opts = {
            url: encodeURI(`${search_url}&q=${query}&key=${process.env.youtube_key}`)
        };
        let returnMessage;
        try {
            let res = await request(opts);
            let json = JSON.parse(res);
            if (json && json.items && json.items.length > 0 && json.items[0].id.videoId) {
                let videoId = json.items[0].id.videoId;                
                returnMessage = `https://www.youtube.com/watch?v=${videoId}`;
                message.channel.send(returnMessage);
                if (message.testCallback) message.testCallback(returnMessage);
            } else {
                returnMessage = `Sorry I didn't find anything :(`;
                message.channel.send(returnMessage);
                if (message.testCallback) message.testCallback(returnMessage);
            }
            
        } catch (error) {
            console.log(error)
            returnMessage = `Sorry, an error occured searching Youtube :(`;
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        }
    }
}

module.exports = YoutubeCommand;