module.exports = ({ message, params }, RichEmbed) => {
    if (message.channel.name !== "sessions-chat") {
        return
    }

    let messageBody

    if (params) {
        messageBody = `@here **Please kick \`${params}\`!\n\nDo __not__ split kicks.**`
    } else {
        messageBody = `@here **Please kick the random!**`
    }

    const embed = new RichEmbed()
    embed.setDescription(messageBody)
    embed.setColor(0xff69b4)
    message.channel.send(embed)
}
