const request = require('request');
const search_url = 'https://omgvamp-hearthstone-v1.p.mashape.com/cards/search/';
const hscard_headers = { 'X-Mashape-Key': process.env.mashape_hscard_token, 'Accept': 'application/json' };

class hs {
    card (card, callback) {
        let opts = { url: encodeURI(search_url + card), headers: hscard_headers };
        console.log('hscard: requesting:  ' + opts.url);
        request(opts, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let info = JSON.parse(body);
                callback(info[0].imgGold);
            }
        });
    }

    cardSearch (card, callback) {
        let opts = { url: encodeURI(search_url + card), headers: hscard_headers };
        console.log('hscard: requesting:  ' + opts.url);
        request(opts, function (error, response, body) {
            if (!error && response.statusCode === 200) {
                let info = JSON.parse(body);
                let results = [];
                info.map((result) => {
                    results.push(result.imgGold);
                });
                callback(results);
            }
        });
    }
}

module.exports = hs;
