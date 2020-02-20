const { logger } = require("./helpers")

function handleRename({ prev, curr }, client) {
    if (prev.displayName === curr.displayName) {
        return
    }

    if (curr.roles.size === 1) {
        return
    }

    const staffChat = client.channels.find(
        channel => channel.name === "staff-chat"
    )

    const staffRole = curr.guild.roles.find(role => role.name === "Staff")

    const nameChange = `${staffRole} \`${prev.displayName}\` changed their nickname to \`${curr.displayName}\``

    if (!staffChat || !staffRole) {
        logger.info(nameChange)
    } else {
        staffChat.send(nameChange)
    }
}

module.exports = handleRename
