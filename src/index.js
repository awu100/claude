const Discord = require("discord.js")
const client = new Discord.Client()
const handleRawEvent = require("./handleRawEvent")
const handleLeaver = require("./handleLeaver")
const handleRename = require("./handleRename")
const bot = require("./bot")
require("dotenv").config()

const { logger } = require("./helpers")

function messageDev(msg) {
    const devUserId = process.env["DEV_USER_ID"]

    if (!devUserId) {
        return
    }

    client
        .fetchUser(devUserId)
        .then(user => {
            user.send(msg)
        })
        .catch(error => logger.error(error.message))
}

client.once("ready", async () => {
    const loginMessage = `${new Date()
        .toString()
        .substr(0, 24)} Connected to discord`
    console.log(loginMessage)

    messageDev(loginMessage)

    client.on("messageReactionAdd", (message, user) => {
        bot.handleReaction.add(message, user, client)
    })

    client.on("message", message => {
        if (message.author.bot) {
            return
        }

        bot.handleMessage(message, client)
    })

    client.on("guildMemberRemove", member => handleLeaver(member, client))

    client.on("guildMemberUpdate", (prev, curr) =>
        handleRename({ prev, curr }, client)
    )

    client.on("disconnect", () => {
        logger.error("Got disconnected")
        messageDev("Got disconnected")
        process.exit(1)
    })

    client.on("error", error => {
        logger.error(error.message)
        messageDev("Got an error")

        process.exit(1)
    })

    client.on("raw", ({ t: type, d: data }) =>
        handleRawEvent({ data, type }, client)
    )
})

client.login(process.env.TOKEN)
