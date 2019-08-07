const Discord = require("discord.js")
const client = new Discord.Client()
const handleRawEvent = require("./handleRawEvent")
const bot = require("./bot")
require("dotenv").config()

client.once("ready", () => {
    console.log("Connected to discord")

    // setInterval(bot.handleChase, 10 * 60 * 1000)

    client.on("messageReactionAdd", (message, user) => {
        bot.handleReaction(message, user, client)
    })

    client.on("message", message => {
        if (message.author.bot) {
            return
        }

        bot.handleMessage(message, client)
    })

    client.on("raw", ({ t: type, d: data }) =>
        handleRawEvent({ data, type }, client, Discord)
    )
})

client.login(process.env.TOKEN)
