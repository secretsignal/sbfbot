let AbstractBaseCommand = require('../abstract_base_command');
let SpotifyAuthHelper = require('../helpers/spotify_auth_helper');

const request = require('request-promise');
const search_url = 'https://api.spotify.com/v1/search?q';

const _searchForAlbum = async (accessToken, message, album) => {
    let opts = {
        url: encodeURI(`${search_url}=${album}&type=album`),
        headers: {
            'Accept': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        }
    };

    let returnMessage;

    try {
        let response = await request(opts);
        let res = JSON.parse(response);
        if (res.albums.items.length < 1) {
            returnMessage = `Sorry, I can't find that album :(`;
            message.channel.send(returnMessage);
            if (message.testCallback) message.testCallback(returnMessage);
            return;
        }

        // Return only the top result
        returnMessage = res.albums.items[0].external_urls.spotify

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

class SpotifyAlbumCommand extends AbstractBaseCommand {
    /**
     * {string} name The Name of this Command
     * {boolean} adminOnly (optional).  if it can only be run by administrators.
     */
    constructor() {
        super("spotify-album", false, "search for an album on spotify");
    }

    /**
     * @param {Object} message A discordjs Message object.  
     * info:  https://discord.js.org/#/docs/main/stable/class/Message
     */
    async do(message) {
        try {
            let token = await SpotifyAuthHelper.getAccessToken();
            let album = super.getParams(message.content, this.name);
            _searchForAlbum(token, message, album);
        } catch (e) {
            console.log(`Error getting access token: ${e}`);
        }
    }
}

module.exports = SpotifyAlbumCommand;