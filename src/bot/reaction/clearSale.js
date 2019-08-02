function clearSale({ message }, user, db) {
    if (
        message.channel.name !== "sales-queue" ||
        !message.mentions.users.has(user.id)
    ) {
        return
    }

    console.log("clear\n", message)
    // .del(message.id)
    // .then(message.delete())
    // db.get(message.id, data => {
    //     console.log(message.id, data)
    // }).catch(error => {
    //     console.error(error)
    // })
}

module.exports = clearSale
