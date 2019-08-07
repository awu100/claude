const commands = require("./commands")
const doCommand = require("./doCommand")
const commandSplitter = require("./commandSplitter")
const handleReaction = require("./reaction")
const handleChase = require("./commands/private/chase")

function handleMessage(message, client) {
    const command = commandSplitter(message.content)
    if (!command) {
        return
    }

    setTimeout(() => {
        doCommand(command, commands, message, client)
    }, 500)
}

module.exports = { handleMessage, handleReaction, handleChase }
