let AbstractBaseCommand = require('../abstract_base_command');
let SpotifyAuthHelper = require('../helpers/spotify_auth_helper');

const request = require('request-promise');
const search_url = 'https://api.spotify.com/v1/search?q=';
//https://api.spotify.com/v1/search?q=track:ten speed artist:coheed and cambria&type=track


const _searchForTrack = async (accessToken, message, query) => {
    let opts = {
        url: encodeURI(`${search_url}=${query}&type=track`),
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };

    let returnMessage;
    let response = await request(opts);
    try {
        let res = JSON.parse(response);
        if (res.tracks.items.length < 1) throw 'No results from search';

        // Return only the top result
        returnMessage = res.tracks.items[0].album.external_urls.spotify

        message.channel.send(returnMessage);
        if (message.testCallback) message.testCallback(returnMessage);
    } catch (error) {
        console.log(`Error in album search: ${error}`);
        if (error && error.message && error.message.includes('access token expired')) {
            returnMessage = `Sorry, I was unable to contact Spotify. Please try again :(`;
        } else {
            returnMessage = `Sorry, I can't find that album :(`;
        }
        
        message.channel.send(returnMessage);
        if (message.testCallback) message.testCallback(returnMessage);
    }
};

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
        try {
            let token = await SpotifyAuthHelper.getAccessToken();
            let queryString = super.getParams(message.content, this.name);
            let query = `track:${queryString.substring(0, queryString.indexOf('--'))} artist:${queryString.substring(queryString.indexOf('--')+2, queryString.length)}`;

            _searchForTrack(token, message, query);
        } catch (error) {
            console.log(`Error getting access token: ${error}`);
        }
    }
}

module.exports = SpotifyTrackCommand;