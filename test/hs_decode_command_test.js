const {expect} = require('chai');
const HSDecodeCommand = require('../app/commands/hs_decode_command');
const TestHelper = require('./helpers/test_helper');

const EXAMPLE_DECKSTRING = 'AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=';
const EXAMPLE_INVALID_DECKSTRING = '###AAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=###';

const EXAMPLE_DECODED_DECKSTRING = '====================\nClass: Hunter\nFormat: Standard\n\n2x Hunter\'s Mark (1 Mana, Free)\n2x Leper Gnome (1 Mana, Common)\n2x Arcane Shot (1 Mana, Free)\n1x Snake Trap (2 Mana, Epic)\n2x Scavenging Hyena (2 Mana, Common)\n1x Dire Wolf Alpha (2 Mana, Common)\n2x Bloodfen Raptor (2 Mana, Free)\n1x Explosive Trap (2 Mana, Common)\n2x Freezing Trap (2 Mana, Common)\n2x Unleash the Hounds (3 Mana, Common)\n1x Jungle Panther (3 Mana, Common)\n2x Eaglehorn Bow (3 Mana, Rare)\n2x Kill Command (3 Mana, Free)\n2x Animal Companion (3 Mana, Free)\n2x Houndmaster (4 Mana, Free)\n1x Tundra Rhino (5 Mana, Free)\n2x Savannah Highmane (6 Mana, Rare)\n1x King Krush (9 Mana, Legendary)\n\nDecoded From:\nAAECAR8GxwPJBLsFmQfZB/gIDI0B2AGoArUDhwSSBe0G6wfbCe0JgQr+DAA=\n====================';

let command = new HSDecodeCommand();

describe('#command: hs_decode', () => {

	describe('-with a valid deckstring', () => {
		let message = TestHelper.getMockMessage();

		it('should decode with expected result', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!decode ${EXAMPLE_DECKSTRING}`;
			await command.do(message);
			expect(message.result).to.equal(EXAMPLE_DECODED_DECKSTRING);
		}));
	});

	describe('-with an invalid deckstring', () => {
		let message = TestHelper.getMockMessage();
		
		it('should return an error message', TestHelper.mochaAsyncWrapper(async () => {
			let result;
			message.content = `!decode ${EXAMPLE_INVALID_DECKSTRING}`;
			await command.do(message);
			expect(message.result).to.equal(`Sorry, I can't decode that deck string :(`);
		}));
	});
});