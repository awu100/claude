function doCommand({ command, params }, commands, message, client) {
    if (String(command) === "") {
        return
    }

    const selectedCommand = commands[String(command).toLowerCase()]

    if (!selectedCommand) {
        return
    }

    selectedCommand({ params, message, client })
}

module.exports = doCommand
