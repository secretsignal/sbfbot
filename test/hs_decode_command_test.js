const {expect} = require('chai');
const HSDecodeCommand = require('../app/commands/hs_decode_command');

const EXAMPLE_DECKSTRING = 'AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=';
const EXAMPLE_INVALID_DECKSTRING = '###AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=###';

const EXAMPLE_DECODED_DECKSTRING = '====================\nClass: Hunter\nFormat: Standard\n\n2x Hunter\'s Mark (1 Mana, Free)\n2x Leper Gnome (1 Mana, Common)\n2x Arcane Shot (1 Mana, Free)\n1x Snake Trap (2 Mana, Epic)\n2x Scavenging Hyena (2 Mana, Common)\n1x Dire Wolf Alpha (2 Mana, Common)\n2x Bloodfen Raptor (2 Mana, Free)\n1x Explosive Trap (2 Mana, Common)\n2x Freezing Trap (2 Mana, Common)\n2x Unleash the Hounds (3 Mana, Common)\n1x Jungle Panther (3 Mana, Common)\n2x Eaglehorn Bow (3 Mana, Rare)\n2x Kill Command (3 Mana, Free)\n2x Animal Companion (3 Mana, Free)\n2x Houndmaster (4 Mana, Free)\n1x Tundra Rhino (5 Mana, Free)\n2x Savannah Highmane (6 Mana, Rare)\n1x King Krush (9 Mana, Legendary)\n\nDecoded From:\nAAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=\n====================';

let message = {
	channel: {
		send: () => {}
	}
}; 
let command = new HSDecodeCommand();

describe('#command: hs_decode', () => {

	describe('-with a valid deckstring', () => {

		it('should decode with expected result', (done) => {
			message.content = `!decode ${EXAMPLE_DECKSTRING}`;
			message.testCallback = (result) => {
				expect(result).to.equal(EXAMPLE_DECODED_DECKSTRING);
				done();
			};
			command.do(message);
		});
	});

	describe('-with an invalid deckstring', () => {

		it('should return an error message', (done) => {
			message.content = `!decode ${EXAMPLE_INVALID_DECKSTRING}`;
			message.testCallback = (result) => {
				expect(result).to.equal(`Sorry, I can't decode that deck string :(`);
				done();
			};
			command.do(message);
		});
	});
});