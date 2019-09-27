const commands = require("./commands")
const doCommand = require("./doCommand")
const commandSplitter = require("./commandSplitter")
const handleReaction = require("./reaction")
const { logger } = require("./helpers")
const { chase } = require("./commands/private/chase")

function handleMessage(message, client) {
    const command = commandSplitter(message.content)
    if (!command) {
        if (message.channel.type === "dm") {
            logger.info(`${message.author.username}: ${message.content}`)
        }

        return
    }

    setTimeout(() => {
        doCommand(command, commands, message, client)
    }, 500)
}

module.exports = { handleMessage, handleReaction, handleChase: chase }
