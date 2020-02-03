module.exports = ({ message, params, client }) => {
    if (
        !message.channel.name.toLowerCase().startsWith("staff") ||
        message.channel.parent.name.toLowerCase() !== "staff"
    ) {
        return
    }

    if (!params) {
        message.channel.send(message.author.avatarURL)
        return
    }

    let userToFind = params.toLowerCase()

    if (message.mentions.users.size > 0) {
        userToFind = message.mentions.users
            .values()
            .next()
            .value.username.toLowerCase()
    }

    if (message.mentions.users.size > 1) {
        message.channel.send(":warning: I can only find one user at a time")
    }

    const user = client.users.find(user =>
        user.username.toLowerCase().includes(userToFind)
    )

    if (!user) {
        message.channel.send(`:x: User matching \`${userToFind}\` not found`)
        return
    }

    message.channel.send(user.avatarURL)
}
