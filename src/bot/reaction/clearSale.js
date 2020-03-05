async function clearSale({ message }, user) {
    if (message.channel.name !== "sales-queue") {
        return
    }

    if (message.mentions.users.has(user.id)) {
        message.delete()
    }

    // early return check for total reactions?

    const reactionUsers = await Promise.all(
        message.reactions.map(reaction => reaction.fetchUsers())
    )

    const vetRole = message.guild.roles.find(
        role => role.name === "Veteran Crew"
    )

    const totalVeteranCrewReactions = reactionUsers
        .reduce((total, reaction) => {
            const veteranCrewReactions = reaction.filter(reactionUser => {
                const guildMember = message.guild.members.find(
                    member => member.user.id === reactionUser.id
                )

                return guildMember.roles.has(vetRole.id)
            })

            return [...total, ...veteranCrewReactions.values()]
        }, [])
        .filter((v, i, a) => a.indexOf(v) == i)

    if (totalVeteranCrewReactions.length === 2) {
        const veteranCrewChat = message.guild.channels.find(
            channel => channel.name === "veteran-crew-chat"
        )

        const usernames = totalVeteranCrewReactions.join(" + ")

        veteranCrewChat.send(
            `${usernames} deleted a sale:\n> ${message.content}`
        )
        message.delete()
    }
}

module.exports = clearSale
