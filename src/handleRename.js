const { logger } = require("./helpers")

function handleRename({ prev, curr }, client) {
    if (prev.displayName === curr.displayName) {
        return
    }

    if (curr.roles.size === 1) {
        return
    }

    const admissions = client.channels.find(
        channel => channel.name === "admissions"
    )

    const staffRole = curr.guild.roles.find(role => role.name === "Staff")

    const nameChange = `${staffRole} \`${prev.displayName}\` changed their nickname to \`${curr.displayName}\``

    if (!admissions || !staffRole) {
        logger.info(nameChange)
    } else {
        admissions.send(nameChange)
    }
}

module.exports = handleRename
