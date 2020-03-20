const { logger } = require("./helpers")

module.exports = (member, client) => {
    const {
        user: { username, discriminator, id },
        displayName,
        roles
    } = member

    const roleArray = [...roles].map(([_id, role]) => role.name).join(", ")

    const departures = client.channels.find(
        channel => channel.name === "departures"
    )

    const aka = () =>
        username.toLowerCase() !== displayName.toLowerCase()
            ? ` AKA \`${displayName}\``
            : ""

    const name = `${username}#${discriminator}`
    const userid = `ID: \`${id}\``
    const userroles = `Roles: \`${roleArray}\``

    const leaver = `\`${name}\`${aka()} has left Discord\n${userid}\n${userroles}`

    if (!departures) {
        logger.info(leaver)
    } else {
        departures.send(leaver)
    }
}
