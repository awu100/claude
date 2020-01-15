function clearSale({ emoji, message }, user_id) {
    if (
        message.channel.name !== "sales-queue" ||
        emoji.name === "💪" ||
        !message.mentions.users.has(user_id)
    ) {
        return
    }

    message.delete()
}

module.exports = clearSale
