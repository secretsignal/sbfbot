const {expect} = require('chai');
const ReactionHelper = require('../app/helpers/reaction_helper');

let reaction = {
  message: {
    content: '',
    author: {
      id: 1234
    }
  }
};

const user = {
  id: 5678
};

const emoji = '<:test_emoji:>';

describe('#reaction: upvote', () => {

    it('should return a message about which message was upvoted', () => {
      reaction.message.content = 'test message';
      let result = ReactionHelper.handleUpvoteReaction(reaction, user);
      expect(result).to.equal(`<@1234>++ received an upvote from <@5678> for "_test message_"`); 
    });

    it('should return a message about which link was upvoted', () => {
      reaction.message.content = 'https://message.test';
      let result = ReactionHelper.handleUpvoteReaction(reaction, user);
      expect(result).to.equal(`<@1234>++ received an upvote from <@5678> for https://message.test`); 
    });
});

describe('#reaction: twss', () => {

  it('should return a message about which message was twss-d', () => {
    reaction.message.content = 'test is too short';
    let result = ReactionHelper.handleTwssReaction(reaction, user, emoji);
    expect(result).to.equal(`<@5678> said ${emoji} to "_test is too short_"`); 
  });

  it('should return a message about which link was twss-d', () => {
    reaction.message.content = 'https://too.short.test';
    let result = ReactionHelper.handleTwssReaction(reaction, user, emoji);
    expect(result).to.equal(`<@5678> said ${emoji} to https://too.short.test`); 
  });
});