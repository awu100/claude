const { logger } = require("./helpers")

module.exports = (member, client) => {
    const {
        user: { username, discriminator },
        displayName,
        roles
    } = member

    const roleArray = [...roles].map(([_id, role]) => role.name).join(", ")

    const departures = client.channels.find(
        channel => channel.name === "departures"
    )

    const aka = () =>
        username.toLowerCase() !== displayName.toLowerCase()
            ? ` AKA ${displayName}`
            : ""

    const name = `${username}#${discriminator}`

    const leaver = `${name}${aka()} has left Discord. Roles: \`${roleArray}\``

    if (!departures) {
        logger.info(leaver)
    } else {
        departures.send(leaver)
    }
}
