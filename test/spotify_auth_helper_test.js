const {expect} = require('chai');
var path = require('path');
var dotEnvPath = path.resolve('./.env');
require('dotenv').config({ path: dotEnvPath});

const SpotifyAuthHelper = require('../app/helpers/spotify_auth_helper');
 
describe('#helper: SpotifyAuthHelper', () => {
    let result;

    before("should fetch an access token", async () => {
        result = await SpotifyAuthHelper.getAccessToken();
    });

    it('should return an access token', () => {
        expect(result).to.be.a('string');
        expect(result.length > 80).to.be.true;
    });

    it('should not return an an error', () => {
        expect(result.includes('error')).to.be.false;
        expect(result.includes('StatusCodeError')).to.be.false;
    });
});