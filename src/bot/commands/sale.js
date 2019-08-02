module.exports = ({ params, message, client }, db, shortid) => {
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

    const id = shortid()
    const saleDetail = params

    db.put(
        id,
        JSON.stringify({
            ts: Date.now().valueOf(),
            user: message.author.id,
            saleDetail
        })
    )
        .then(
            salesQueue.send(
                `${id}: ${message.author} \n\`\`\`${saleDetail}\`\`\``
            )
        )
        .catch(console.error)
}
