const uptime = require("./uptime")
const yeet = require("./yeet")

function checkUser(command, params) {
    const [{ message }] = params
    const devUserId = process.env["DEV_USER_ID"] || ""

    if (message.author.id !== devUserId) {
        message.channel.send("Unauthorised request")
        return
    }

    command(...params)
}

const privateCommands = Object.entries({ uptime, yeet }).reduce(
    (commands, [name, command]) => ({
        ...commands,
        [name]: (...params) => checkUser(command, params)
    }),
    {}
)

module.exports = privateCommands
