const uptime = require("./uptime")

function checkUser(command, params) {
    const [{ message }] = params
    const devUserId = process.env["DEV_USER_ID"] || ""

    if (message.author.id !== devUserId) {
        message.channel.send("Unauthorised request")
        return
    }

    command(...params)
}

const privateCommands = Object.entries({ uptime }).reduce(
    (commands, [name, command]) => ({
        ...commands,
        [name]: (...params) => checkUser(command, params)
    }),
    {}
)

module.exports = privateCommands
