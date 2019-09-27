const { logger } = require("../helpers")

function clearSale({ message, emoji }, user_id, db, client) {
    if (
        message.channel.name !== "sales-queue" ||
        !message.mentions.users.has(user_id)
    ) {
        return
    }

    const user = client.users.get(user_id)

    logger.info(
        `<${user.username}> cleared sale from sales-queue with ${emoji.name}`
    )

    db.del(message.id)
        .then(message.delete())
        .catch(console.error)
}

module.exports = clearSale
