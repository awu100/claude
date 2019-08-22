module.exports = ({ message, params }) => {
    if (message.channel.name !== "sessions-chat") {
        return
    }

    if (params) {
        message.channel.send(
            `@here **Please kick \`${params}\`!\n\nDo __not__ split kicks.**`
        )
    } else {
        message.channel.send("@here **Please kick the random!**")
    }
}
