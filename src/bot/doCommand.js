function doCommand({ command = "", params }, commands, message, client) {
    const selectedCommand = commands[command]

    if (!selectedCommand) {
        return
    }

    selectedCommand({ params, message, client })
}

module.exports = doCommand
