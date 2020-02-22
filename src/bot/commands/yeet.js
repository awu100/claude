const { DateTime } = require("luxon")

function daysAgo(ts) {
    const dateTime = DateTime.fromMillis(ts)
    const relative = dateTime.toRelative({
        unit: "days"
    })
    const daysString = relative.split(" ")[0]

    return Number(daysString)
}

module.exports = ({ message, params }) => {
    if (!message.channel.name.startsWith("staff")) {
        return
    }

    const paramNumbers = Number(params).toFixed(0)
    const dayThreshold = !params || isNaN(paramNumbers) ? 10 : paramNumbers

    const members = message.guild.members.filter(
        member =>
            member.joinedTimestamp &&
            !member.user.bot &&
            member.roles.size === 1 &&
            daysAgo(member.joinedTimestamp) > dayThreshold
    )

    if (members.size === 0) {
        message.channel.send(
            `No members in **welcome** longer than ${dayThreshold} days`
        )
        return
    }

    message.channel.send(
        `The following users have been in **welcome** for more than ${dayThreshold} days:\n\n` +
            members
                .map(
                    m => `\`${m.displayName}\` (${daysAgo(m.joinedTimestamp)})`
                )
                .join("\n")
    )
}
