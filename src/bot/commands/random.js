module.exports = ({ message, params }, RichEmbed) => {
    if (message.channel.name !== "sessions-chat") {
        return
    }

    const messageBody = params
        ? `@here **Please kick \`${params}\`!\n\nDo __not__ split kicks.**`
        : `@here **Please kick the random!**`

    message.channel.send(`:rotating_light: ${messageBody} :rotating_light:`)
}
