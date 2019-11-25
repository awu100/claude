function clearSale({ message }, user_id) {
    if (
        message.channel.name !== "sales-queue" ||
        !message.mentions.users.has(user_id)
    ) {
        return
    }

    message.delete()
}

module.exports = clearSale
