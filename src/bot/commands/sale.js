module.exports = ({ params, message, client }, db) => {
    if (message.channel.name !== "sessions-chat" || !params) {
        return
    }

    const salesQueue = client.channels.find(
        channel =>
            channel.name === "sales-queue" &&
            channel.parent == message.channel.parent
    )

    if (!salesQueue) {
        return
    }

    db.put(message.id, JSON.stringify({ user: message.author.id, params }))
        .then(function() {
            return db.get(message.id)
        })
        .then(function(value) {
            console.log(value)
        })
        .catch(function(err) {
            console.error(err)
        })

    salesQueue.send(`${message.author}: ${params}`)
}
