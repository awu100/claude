const events = {
  MESSAGE_REACTION_ADD: "messageReactionAdd"
};

module.exports = async ({ type, data }, client, Discord) => {
  if (!events.hasOwnProperty(type)) {
    return;
  }

  const channel = client.channels.get(data.channel_id);
  if (channel.messages.has(data.message_id)) {
    // message is cached and already has event
    return;
  }

  const user = client.users.get(data.user_id);
  const message = await channel.fetchMessage(data.message_id);

  const emojiKey = data.emoji.id
    ? `${data.emoji.name}:${data.emoji.id}`
    : data.emoji.name;
  let reaction = message.reactions.get(emojiKey);

  if (!reaction) {
    // Create an object that can be passed through the event like normal
    const emoji = new Discord.Emoji(
      client.guilds.get(data.guild_id),
      data.emoji
    );
    reaction = new Discord.MessageReaction(
      message,
      emoji,
      1,
      data.user_id === client.user.id
    );
  }

  client.emit(events[type], reaction, user);
};
