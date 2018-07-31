class ReactionHelper {
  static handleUpvoteReaction(reaction, user) {
    const content = _formatContent(reaction.message.content);
    return `<@${reaction.message.author.id}>++ received an upvote from <@${user.id}> for ${content}`;
  }

  static handleTwssReaction(reaction, user, emoji) {
    const content = _formatContent(reaction.message.content)
    return `<@${user.id}> said ${emoji} to ${content}`;
  }
}

const _formatContent = (content) => {
  return content.indexOf('http') > -1 ? content : `"_${content}_"`;
};

module.exports = ReactionHelper;