const { logger } = require("./helpers")

function handleRename({ prev, curr }, client) {
    if (prev.displayName.toLowerCase() === curr.displayName.toLowerCase()) {
        return
    }

    if (curr.roles.size === 1) {
        return
    }

    const admissions = client.channels.find(
        channel => channel.name === "admissions"
    )

    const nameChange = `\`${prev.displayName}\` changed their nickname to \`${curr.displayName}\``

    if (!admissions) {
        logger.info(nameChange)
    } else {
        admissions.send(nameChange)
    }
}

module.exports = handleRename
