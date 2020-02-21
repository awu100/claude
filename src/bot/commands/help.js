module.exports = ({ message }) => {
    if (message.channel.name !== "staff-chat") {
        return
    }

    message.reply("hey buddy")
}
