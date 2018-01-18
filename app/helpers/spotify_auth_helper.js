const request = require('request-promise');
const search_url = 'https://api.spotify.com/v1/search?q';
const basicAuthToken = new Buffer(`${process.env.spotify_client_id}:${process.env.spotify_client_secret}`).toString('base64');
let accessToken;

const _getAccessToken = () => {
    let opts = {
        headers: {
            'Authorization': `Basic ${basicAuthToken}`,
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: 'grant_type=client_credentials',
        uri: 'https://accounts.spotify.com/api/token',
        method: 'POST'
    };
    return request(opts); 
};

class SpotifyAuthHelper {
    static async getAccessToken() {
        return new Promise((resolve, reject) => {
            if (!accessToken) {
                _getAccessToken()
                .then(response => {;
                    let res = JSON.parse(response);
                    accessToken = res.access_token;
                    resolve(accessToken);
                }).catch(err => {
                    reject(err);
                });

            } else {
                resolve(accessToken);
            }
        });
    }
}

module.exports = SpotifyAuthHelper;