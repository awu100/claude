const Discord = require("discord.js")

const validTypes = {
    MESSAGE_REACTION_ADD: "messageReactionAdd",
    MESSAGE_REACTION_REMOVE: "messageReactionRemove"
}

module.exports = async ({ type, data }, client) => {
    const eventType = validTypes[type]
    if (!eventType) {
        return
    }

    const channel = client.channels.get(data.channel_id)

    if (
        eventType === validTypes["MESSAGE_REACTION_ADD"] &&
        (!channel || channel.messages.has(data.message_id))
    ) {
        // message is cached and already has event
        return
    }

    const user = client.users.get(data.user_id)
    const message = await channel.fetchMessage(data.message_id)

    const emojiKey = data.emoji.id
        ? `${data.emoji.name}:${data.emoji.id}`
        : data.emoji.name
    let reaction = message.reactions.get(emojiKey)

    if (!reaction) {
        // Create an object that can be passed through the event like normal
        const emoji = new Discord.Emoji(
            client.guilds.get(data.guild_id),
            data.emoji
        )
        reaction = new Discord.MessageReaction(
            message,
            emoji,
            1,
            data.user_id === client.user.id
        )
    }

    client.emit(eventType, reaction, user)
}
