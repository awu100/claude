const { DateTime } = require("luxon")

module.exports = ({ message }) => {
    if (message.channel.name.startsWith("staff")) {
        return
    }

    const users = Array.from(message.guild.members.values()).filter(
        member => member.roles.size === 1
    )

    const tenDaysAgo = DateTime.utc().minus({ days: 5 })

    Promise.all(
        users
            .map(async user => {
                const joinDate = DateTime.fromSeconds(user.joinedTimestamp)

                if (joinDate > tenDaysAgo) {
                    return null
                }

                // const dm = await user.createDM()
                // await dm.send("you will soon be yeeted")
                console.log(user, joinDate.toISO())
                return user.username
            })
            .filter(Boolean)
    )
        .then(dms => {
            message.channel.send(
                `yeet dry run yields ${dms.length} yeetable members`
            )
        })
        .catch(console.error)
}
