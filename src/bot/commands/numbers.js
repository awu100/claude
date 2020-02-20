module.exports = ({ message }) => {
    if (
        !message.channel.name.toLowerCase().startsWith("staff") ||
        message.channel.parent.name.toLowerCase() !== "staff"
    ) {
        return
    }

    const memberCount = message.guild.members.size
    message.channel.send(`We have ${memberCount} members in Discord`)
}
