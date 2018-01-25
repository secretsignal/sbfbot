let AbstractBaseCommand = require('../abstract_base_command');
let SpotifyAuthHelper = require('../helpers/spotify_auth_helper');

const request = require('request-promise');
const search_url = 'https://api.spotify.com/v1/search?q=';

class SpotifyTrackCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("spotify-track", false, "search for a track on spotify");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    async do(message) {
        let returnMessage;
        try {
            let accessToken = await SpotifyAuthHelper.getAccessToken();
            let queryString = super.getParams(message.content, this.name);
            let query = `track:${queryString.substring(0, queryString.indexOf('--'))} artist:${queryString.substring(queryString.indexOf('--')+2, queryString.length)}`;

            let opts = {
                url: encodeURI(`${search_url}=${query}&type=track`),
                headers: {
                    'Accept': 'application/json',
                    'Authorization': `Bearer ${accessToken}`
                }
            };
        
            let returnMessage;
            let response = await request(opts);
            let res = JSON.parse(response);
            if (res.tracks.items.length < 1) {
                returnMessage = `Sorry, I can't find that track :(`;
                message.channel.send(returnMessage);
                if (message.testCallback) message.testCallback(returnMessage);
                return;
            }
        
            // Return only the top result
            returnMessage = res.tracks.items[0].external_urls.spotify;
        
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        } catch (error) {
            console.log(`Error in track search: ${error}`);
            if (error && error.message && error.message.includes('access token expired')) {
                returnMessage = `Sorry, I was unable to contact Spotify. Please try again :(`;
            }
            
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
        }
    }
}

module.exports = SpotifyTrackCommand;