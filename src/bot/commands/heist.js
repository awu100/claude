const { logger } = require("../../helpers")

module.exports = ({ params: saleDetail, message, client }) => {
    if (!message.channel.name.includes("general-bullshit-chat") || !saleDetail) {
        return
    }

    const salesQueue = client.channels.find(
        channel =>
            channel.name === "heist-queue" &&
            channel.parent == message.channel.parent
    )

    if (!salesQueue) {
        return
    }

    salesQueue
        .send(`${message.author}: \`${saleDetail}\``)
        .then(saleMessage => {
            saleMessage.react("💰")
        })
        .catch(error => logger.error(`sale: ${error.message}`))
}
