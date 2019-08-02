function clearSale({ message }, user, salesdb) {
    if (message.channel.name !== "sales-queue") {
        return
    }

    if (!message.mentions.users.has(user.id)) {
        return
    }

    salesdb
        .del(message.id)
        .then(ok => {
            message.delete()
        })
        .catch(error => {
            console.error(error)
        })
}

module.exports = clearSale
