module.exports = ({ message, params }) => {
    if (!message.channel.name.includes("random-bullshit-chat")) {
        return
    }

    const messageBody = params
        ? `@here **My \`${params}\`!\n\ heist is ready!**`

    message.channel.send(`:ban: ${messageBody} :ban:`)
    message.channel
        .send(
            "React with :delet: after you've finished the heist"
        ).then(kickMessage => {
            kickMessage.react(":delet:")
        })
}
