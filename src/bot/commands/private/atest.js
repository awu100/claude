const atest = ({ message, client }) => {
    const user = client.users.get(message.author.id)

    console.log(`sent test dm to <${user.username}> `)

    user.send(`This is a test DM. Please react`).then(dm => {
        dm.react("👌")

        const reactionListener = dm.createReactionCollector(
            (_reaction, user) => user.id === message.author.id,
            {
                max: 1,
                time: 4 * 60 * 1000 // 4 minutes
            }
        )

        reactionListener.on("collect", reaction => {
            console.log(
                `reaction recieved: ${reaction.emoji.name} from <${user.username}>`
            )
            reactionListener.stop()
        })
        reactionListener.on("end", reactions => {
            if ([...reactions].length === 0) {
                console.log(`no reaction recieved from <${user.username}>`)
            }
        })
    })
}

module.exports = atest
