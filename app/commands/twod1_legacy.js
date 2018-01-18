let AbstractBaseCommand = require('../abstract_base_command');

const request = require('request-promise');

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
	async do(message) {
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

		try {
			let membershipResponse = await request(opts);
			let membershipInfo = JSON.parse(membershipResponse);
			if (membershipInfo.Response == "0") throw membershipInfo;

			lookup_resource = `https://www.bungie.net/Platform/Destiny/${device}/Account/${membershipInfo.Response}/Summary`;
			opts.url = encodeURI(lookup_resource);

			let profileResponse = await request(opts);
			let profileInfo = JSON.parse(profileResponse);
			let totalTime = 0;
			profileInfo.Response.data.characters.forEach(item => {
				totalTime += Number(item.characterBase.minutesPlayedTotal);
			});
			returnMessage = `${username} has wasted over ${Math.floor(totalTime * 0.000694444)} days playing destiny 1!`;
			message.channel.sendMessage(returnMessage);
			if (message.testCallback) message.testCallback(returnMessage);
		} catch (error) {
			message.channel.sendMessage(error.ErrorStatus);
			if (message.testCallback) message.testCallback(error.ErrorStatus);
		}
	}
}

module.exports = TimeWastedOnDestiny;