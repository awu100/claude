module.exports = ({ params, message, client }) => {
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

    salesQueue.send(`${message.author}: ${params}`)
}
