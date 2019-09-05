module.exports = ({ params: saleDetail, message, client }, db) => {
    if (message.channel.name !== "sessions-chat" || !saleDetail) {
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

    return salesQueue
        .send(`${message.author}: \`${saleDetail}\``)
        .then(saleMessage => {
            saleMessage.react("💰")

            db.put(
                saleMessage.id,
                JSON.stringify({
                    ts: Date.now().valueOf(),
                    user_id: message.author.id,
                    channel_id: saleMessage.channel.id,
                    saleDetail
                })
            )
        })
        .catch(e => console.error("sale", { e }))
}
