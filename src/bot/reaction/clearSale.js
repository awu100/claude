function clearSale({ message }, user, db) {
    if (
        message.channel.name !== "sales-queue" ||
        !message.mentions.users.has(user.id)
    ) {
        return
    }

    const messageParts = message.content.match(/^(.*):/)
    if (!messageParts || messageParts.length < 2) {
        return
    }

    const id = messageParts[1]

    db.del(id)
        .then(message.delete())
        .catch(error => {
            console.error(error)
        })
}

module.exports = clearSale
