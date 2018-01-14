let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request');

/*  this API key is one i created for sbfvgs, keep in mind that we all might be using it at the same time
    so just keep that in mind to avoid rate limit issues    */

const headers = {
	'Accept': 'application/json',
	'X-API-Key': '4526f02876ba4fbc92883d3eb732a955'
};


class TimeWastedOnDestiny extends AbstractBaseCommand {
	/**
	 * {string} name The Name of this Command
	 * {boolean} adminOnly (optional).  if it can only be run by administrators.
	 */
	constructor() {
		super("twod1", false, "how many days username has wasted on destiny. defaults to playstation");
	}

	/**
	 * @param {Object} message A discordjs Message object.  
	 * info:  https://discord.js.org/#/docs/main/stable/class/Message
	 */
	do(message) {
		let params = super.getParams(message.content, this.name);
		let username = params.match(/\b(?:\W|[0-9])*(\w+)\b/)[0];
		let device = 2;
		if (params.toLowerCase().search("xbox") !== -1) device = 1;

		let details = "/" + device + "&user=" + username;

		let lookup_resource = `https://www.bungie.net/Platform/Destiny/${device}/Stats/GetMembershipIdByDisplayName/${username}`;
		let opts = {
			url: encodeURI(lookup_resource),
			headers: headers
		};
		let returnMessage;

		request(opts, function (error, response, body) {
			if (!error && response.statusCode === 200) {
				let info = JSON.parse(body);
				let lookup_resource = `https://www.bungie.net/Platform/Destiny/${device}/Account/${info.Response}/Summary`;
				let opts = {
					url: encodeURI(lookup_resource),
					headers: headers
				};

				if (info.Response != "0") {
					request(opts, function (error, response, body) {
						if (!error && response.statusCode === 200) {
							let info = JSON.parse(body);
							let totalTime = 0;
							info.Response.data.characters.forEach(item => {
								totalTime += Number(item.characterBase.minutesPlayedTotal);
							});
							returnMessage = `${username} has wasted over ${Math.floor(totalTime * 0.000694444)} days playing destiny 1!`;
							message.channel.sendMessage(returnMessage);
							if (message.testCallback) message.testCallback(returnMessage);

						}
					});
				} else {
					message.channel.sendMessage(info.ErrorStatus);
					if (message.testCallback) message.testCallback(info.ErrorStatus);

				}
			}
		});
	}
}

module.exports = TimeWastedOnDestiny;