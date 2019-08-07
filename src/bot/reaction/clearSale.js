function clearSale({ message }, user, db) {
    if (
        message.channel.name !== "sales-queue" ||
        !message.mentions.users.has(user.id)
    ) {
        return
    }

    db.del(message.id)
        .then(message.delete())
        .catch(error => {
            console.error(error)
        })
}

module.exports = clearSale
