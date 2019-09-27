const Discord = require("discord.js")
const client = new Discord.Client()
const handleRawEvent = require("./handleRawEvent")
const bot = require("./bot")
require("dotenv").config()

const { logger } = require("./bot/helpers")

client.once("ready", () => {
    console.log(`${new Date().toString().substr(0, 24)} Connected to discord`)

    // setInterval(() => bot.handleChase({ client }), 5 * 60 * 1000) // 5 minutes

    client.on("messageReactionAdd", (message, user) => {
        bot.handleReaction(message, user, client)
    })

    client.on("message", message => {
        if (message.author.bot) {
            return
        }

        bot.handleMessage(message, client)
    })

    client.on("guildMemberRemove", member => {
        const {
            user: { username, discriminator },
            displayName,
            roles
        } = member

        const roleArray = [...roles].map(([_id, role]) => role.name).join(", ")

        const departures = client.channels.find(
            channel => channel.name === "departures"
        )

        const name = `${username}#${discriminator} AKA ${displayName}`

        const leaver = `${name} has left Discord. Roles: \`(${roleArray.length}) ${roleArray}\``

        if (!departures) {
            logger.info(leaver)
        } else {
            departures.send(leaver)
        }
    })

    client.on("raw", ({ t: type, d: data }) =>
        handleRawEvent({ data, type }, client)
    )
})

client.login(process.env.TOKEN)
